import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { convertKeyValueIntoJson, convertKeyValuesIntoJson } from './key-value.helper';
import { keyValueValidator, validateKeyValueString } from '../../../form-field-validator/key-value-validator';
import { TranslocoCoreModule } from '../../../transloco/transloco.module';
import { NameIdEntity } from '../../../models/name-id-entity.interface';

/**
 * This chips-list component supports an autocomplete when autocompleteOptions is not empty.
 * It also supports an input values which is a list of { key: value } objects.
 *
 * prefix is needed in the case of "reuses" in ecs-fieldset component & it's added to the label that is displayed.
 */
@Component({
  selector: 'lib-edit-key-value-chips-list',
  templateUrl: './edit-key-value-chips-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditKeyValueChipsListComponent),
      multi: true,
    },
  ],
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
export class EditKeyValueChipsListComponent implements OnInit, OnChanges, ControlValueAccessor {
  destroyRef = inject(DestroyRef);
  @Input() required?: boolean = false;
  /**
   * values is the list of values to display as chips (when the hosting component uses strings)
   */
  @Input() values: { [key: string]: string }[] = [];
  /**
   * autocompleteOptions is the list of options that should be used to fill the options on the autocomplete
   */
  @Input() autocompleteOptions: NameIdEntity[] = [];
  @Input() prefix!: string;
  @Input() title?: string;
  @Input() hoverDescription = '';
  @Output() chipAdded = new EventEmitter<string>();
  @Output() chipDeleted = new EventEmitter<number>();

  @ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;
  optionInputCtrl = new FormControl('');
  addOnBlur = true;
  validator: ValidatorFn = keyValueValidator();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  filteredOptions: Observable<NameIdEntity[]> | undefined;
  selectedOptions: string[] = [];
  selectedJsonOptions: { [key: string]: string }[] = [];
  chipsFormControl = new FormControl(this.selectedOptions);

  /**
   * Logic for the autocomplete
   */
  ngOnInit(): void {
    this.filteredOptions = this.optionInputCtrl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      startWith(null),
      map((optionName: string | null) => this.filterOnSelectOption(optionName))
    );
    this.updateErrorState();
  }

  updateErrorState(): void {
    this.optionInputCtrl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.chipsFormControl.setErrors(validateKeyValueString(value));
    });
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
      this.optionInputCtrl.setValidators(this.validator);
      this.optionInputCtrl.updateValueAndValidity();
    }
    if (changes['values']?.currentValue?.length) {
      this.selectedOptions = this.values.map((value) => `${Object.keys(value)[0]}:${Object.values(value)[0]}`);
      this.selectedJsonOptions = this.values;
      this.onChange(this.selectedJsonOptions);
    }
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeFormSelectedOptions(index: number) {
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
      this.chipDeleted.emit(index);
      this.selectedJsonOptions.splice(index, 1);
      this.onChange(this.selectedJsonOptions);
      this.onTouched();
      this.resetInputs();
    }
  }

  /**
   * This method is used when the user manually types an option and wants to add it by entering ENTER or COMMA.
   * When mat-autocomplete is used (autocompleteOptions is not empty), adding an option is possible only with selectOption() method.
   * If validation is used, and the user types an option that is invalid, the method won't do anything.
   * @param event
   */
  addOption(event: MatChipInputEvent): void {
    if (this.autocompleteOptions?.length || this.optionInputCtrl.errors) {
      return;
    }
    const prefix = this.prefix || '';
    const value = prefix + (event.value || '').trim();
    this.updateSelectedOptionsAndForm(value);
  }

  updateSelectedOptionsAndForm(value: string): void {
    if (value) {
      this.selectedOptions.push(value);
      this.chipAdded.emit(value);
      if (value.includes(':')) {
        // @ts-ignore
        this.selectedJsonOptions.push(convertKeyValueIntoJson(value));
        this.onChange(this.selectedJsonOptions);
        this.onTouched();
      }
    }
    this.resetInputs();
  }

  /**
   * clear input element
   * @private
   */
  private resetInputs(): void {
    this.optionInput.nativeElement.value = '';
    this.optionInputCtrl.setValue(null);
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      // debugger
      this.selectedOptions = value.map((val: any) => `${Object.keys(val)[0]}:${Object.values(val)[0]}`);
      this.onChange(convertKeyValuesIntoJson(this.selectedOptions));
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.chipsFormControl.disable();
    } else {
      this.chipsFormControl.enable();
    }
  }
}
