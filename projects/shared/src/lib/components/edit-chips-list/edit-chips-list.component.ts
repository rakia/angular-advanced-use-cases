import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { NameIdEntity } from '../../models/name-id-entity.interface';
import { FormService } from '../../services/form-service/form.service';
import { ObjectType } from '../../models/object.types';

/**
 * This chips-list component supports an autocomplete when optionList is not empty.
 * It also supports an input stringValues which is a list of strings,
 * or values which is a list of objects.
 *
 * When a list of objects is used, then keyToDisplay (the name of the attribute to display) is required as input.
 *
 * prefix is needed in the case of "reuses" in ecs-fieldset & it's added to the label that is displayed.
 */
@Component({
  selector: 'lib-edit-chips-list',
  templateUrl: './edit-chips-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChipsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() form!: FormGroup;
  @Input() nameFormArray!: string;
  @Input() values: ObjectType[] = [];
  @Input() stringValues: string[] = [];
  @Input() optionList: NameIdEntity[] = [];
  @Input() returnWithoutId = false;
  @Input() keyToDisplay!: string;
  @Input() prefix!: string;
  @Input() id!: string;
  @Input() title?: string;
  @Input() hoverDescription: string = '';
  @Output() labelAdded = new EventEmitter<string>();
  @Output() itemAdded = new EventEmitter<ObjectType>();
  @Output() itemDeleted = new EventEmitter<number>();

  @ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;
  optionInputCtrl = new FormControl('');
  addOnBlur = true;

  filteredOptionList: Observable<NameIdEntity[]> | undefined;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chipSelectedOptionList: ObjectType[] = [];
  chipSelectedStringList: string[] = [];
  formArrayControls: any;
  destroy$ = new Subject<void>();

  constructor(private formService: FormService) {}

  // ---- Logic for the autocomplete
  ngOnInit(): void {
    this.filteredOptionList = this.optionInputCtrl.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(null),
      map((optionName: string | null) => this.filterOnSelectOption(optionName))
    );
  }

  /**
   * Compute a new autocomplete list each time control value changes
   * @private
   * @param value
   */
  private filterOnSelectOption(value: string | null): NameIdEntity[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.optionList.filter((option) => option.name.toLowerCase().includes(filterValue));
    }
    return this.optionList.slice() || [];
  }

  selectOption(event: MatAutocompleteSelectedEvent): void {
    const result = this.optionList.filter((o) => o.name.toLowerCase() === event.option.viewValue.toLowerCase());
    if (result?.length) {
      const prefix = this.prefix || '';
      this.updateSelectedOptionsAndForm(prefix + event.option.viewValue, result[0]?.id);
    }
  }
  // ---- End Logic for the autocomplete

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']?.currentValue) {
      this.formArrayControls = (this.form.get(this.nameFormArray) as FormArray)?.controls;
    }
    if (changes['stringValues']?.currentValue?.length) {
      this.chipSelectedOptionList = this.stringValues?.map((value, index) => ({ name: value, id: index }));
      this.formService.initFormArrayItems(this.form, this.nameFormArray, this.chipSelectedOptionList);
    }
    if (changes['values']?.currentValue?.length) {
      this.chipSelectedOptionList = this.values;
      // eslint-disable-next-line no-return-assign,no-param-reassign
      this.chipSelectedOptionList.forEach((option) => (option['name'] = option[this.keyToDisplay]));
      this.formService.initFormArrayItems(this.form, this.nameFormArray, this.chipSelectedOptionList);
    }
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeFormSelectedOptions(index: number) {
    const control = this.form.get(this.nameFormArray) as FormArray;
    if (index >= 0) {
      this.chipSelectedOptionList.splice(index, 1);
      control.removeAt(index);
      control.markAsDirty(); // to notify the parent FormGroup there a change
      this.itemDeleted.emit(index);
      this.resetInputs();
    }
  }

  addOption(event: MatChipInputEvent): void {
    if (this.optionList?.length) {
      // If mat-autocomplete is used addOption is possible only with selectOption() method
      return;
    }
    const value = (event.value || '').trim();
    this.updateSelectedOptionsAndForm(value, this.chipSelectedOptionList.length);
    this.labelAdded.emit(value);
  }

  updateSelectedOptionsAndForm(value: string, id: number | string): void {
    if (value) {
      this.chipSelectedOptionList.push({ name: value, id });
      if (this.returnWithoutId) {
        this.chipSelectedStringList = this.chipSelectedOptionList.map((o) => o['name']);
        this.updateFormArray(this.form, this.nameFormArray, this.chipSelectedStringList);
        this.labelAdded.emit(value);
      } else {
        this.updateFormArray(this.form, this.nameFormArray, this.chipSelectedOptionList);
        this.itemAdded.emit({ name: value, id });
      }
    }
    this.resetInputs();
  }

  private updateFormArray(form: FormGroup, formArrayName: string, formItems: ObjectType[] | string[]): void {
    const responsesControls = form.controls[formArrayName!] as FormArray;
    formItems.forEach((formItem, index) => {
      if (!responsesControls.controls[index]) {
        if (typeof formItem === 'string') {
          // @ts-ignore
          this.formService.addEmptyFormGrouptoFormArrayStrings(this.form, this.nameFormArray, formItem);
        } else {
          // @ts-ignore
          this.formService.addEmptyFormGrouptoFormArray(this.form, this.nameFormArray, formItem);
        }
      }
      this.formArrayControls = (this.form.get(this.nameFormArray) as FormArray)?.controls;
      this.formArrayControls.at(index).patchValue(formItem);
      (this.form.get(this.nameFormArray) as FormArray).markAsDirty(); // notify parent FormGroup
      this.formArrayControls = (this.form.get(this.nameFormArray) as FormArray).controls;
    });
  }

  /**
   * clear input element
   * @private
   */
  private resetInputs(): void {
    this.optionInput.nativeElement.value = '';
    this.optionInputCtrl.setValue(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
