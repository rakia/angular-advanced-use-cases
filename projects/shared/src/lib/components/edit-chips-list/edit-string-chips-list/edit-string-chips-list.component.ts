import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { TranslocoCoreModule } from '../../../transloco/transloco.module';
import { keyValueValidator } from '../../../form-field-validator/key-value-validator';
import { NameIdEntity } from '../../../models/name-id-entity.interface';
import { FormService } from '../../../services/form-service/form.service';

/**
 * This chips-list component supports an autocomplete when autocompleteOptions is not empty.
 * It also supports an input values which is a list of strings.
 *
 * prefix is needed in the case of "reuses" in ecs-fieldset component & it's added to the label that is displayed.
 */
@Component({
  selector: 'lib-edit-string-chips-list',
  templateUrl: './edit-string-chips-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslocoCoreModule,
  ],
})
export class EditStringChipsListComponent implements OnInit, OnChanges {
  destroyRef = inject(DestroyRef);
  private formService = inject(FormService);

  /**
   * form is the formGroup in the hosting component that contains the formArray (with the name nameFormArray)
   */
  @Input() form!: FormGroup;
  @Input() nameFormArray!: string; // { required: true }
  @Input() required?: boolean = false;
  /**
   * values is the list of values to display as chips (when the hosting component uses strings)
   */
  @Input() values: string[] = [];
  /**
   * autocompleteOptions is the list of options that should be used to fill the options on the autocomplete
   */
  @Input() autocompleteOptions: NameIdEntity[] = [];
  @Input() prefix!: string;
  @Input() title?: string;
  @Input() hoverDescription = '';
  @Input() useKeyValueValidator = false;
  @Output() chipAdded = new EventEmitter<string>();
  @Output() chipDeleted = new EventEmitter<number>();

  @ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;
  optionInputCtrl = new FormControl('');
  addOnBlur = true;
  validator: ValidatorFn = keyValueValidator();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  filteredOptions: Observable<NameIdEntity[]> | undefined;
  selectedOptions: string[] = [];

  /**
   * Logic for the autocomplete
   */
  ngOnInit(): void {
    this.filteredOptions = this.optionInputCtrl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
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
      return this.autocompleteOptions.filter((option) => option.name.toLowerCase().includes(filterValue));
    }
    return this.autocompleteOptions.slice() || [];
  }

  selectOption(event: MatAutocompleteSelectedEvent): void {
    const result = this.autocompleteOptions.filter(
      (o) => o.name.toLowerCase() === event.option.viewValue.toLowerCase()
    );
    if (result?.length) {
      const prefix = this.prefix || '';
      this.updateSelectedOptionsAndForm(prefix + event.option.viewValue);
    }
  }
  // ---- End Logic for the autocomplete

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) {
      if (this.required) {
        this.optionInputCtrl.setValidators([Validators.required]);
      } else {
        this.optionInputCtrl.clearValidators();
      }
      this.optionInputCtrl.updateValueAndValidity();
    }
    if (changes['useKeyValueValidator']?.currentValue) {
      this.optionInputCtrl.setValidators(this.validator);
    }
    if (changes['values']?.currentValue?.length) {
      this.selectedOptions = this.values;
      this.formService.initFormArrayWithStrings(this.form, this.nameFormArray, this.values);
    }
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeFormSelectedOptions(index: number) {
    const formArray = this.form.get(this.nameFormArray) as FormArray;
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
      formArray.removeAt(index);
      formArray.markAsDirty(); // to notify the parent FormGroup there a change
      this.chipDeleted.emit(index);
      this.resetInputs();
    }
  }

  /**
   * This method is useful when the user manually types an option and wants to add it.
   * When mat-autocomplete is used (autocompleteOptionList is not empty), adding an option is possible only with selectOption() method.
   * If validation is used, and the user types an option that is invalid, the method won't do anything.
   * @param event
   */
  addOption(event: MatChipInputEvent): void {
    if (this.autocompleteOptions?.length || this.optionInputCtrl.errors) {
      return;
    }
    const value = (event.value || '').trim();
    const prefix = this.prefix || '';
    this.updateSelectedOptionsAndForm(prefix + value);
  }

  updateSelectedOptionsAndForm(value: string): void {
    if (value) {
      this.selectedOptions.push(value);
      this.updateFormArray(this.form, this.nameFormArray, value);
      this.chipAdded.emit(value);
    }
    this.resetInputs();
  }

  private updateFormArray(form: FormGroup, formArrayName: string, formItem: string): void {
    (form.get(formArrayName) as FormArray).push(new FormControl(formItem));
    (form.get(formArrayName) as FormArray).markAsDirty(); // notify parent FormGroup
  }

  /**
   * clear input element
   * @private
   */
  private resetInputs(): void {
    this.optionInput.nativeElement.value = '';
    this.optionInputCtrl.setValue(null);
  }
}
