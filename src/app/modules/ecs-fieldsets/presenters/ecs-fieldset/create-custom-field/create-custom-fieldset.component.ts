import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef, EventEmitter, inject,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEntityComponent, NameIdEntity, RequestResponse } from 'projects/shared/src/public-api';
import { EcsFieldset } from '../../../models/ecs-fieldset.interface';
import { ParameterDescription } from '../../../models/parameter-description.interface';
import { FieldClass } from '../../../models/field-class.interface';
import { map, Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-custom-fieldset',
  templateUrl: './create-custom-fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomFieldsetComponent extends CreateEntityComponent<EcsFieldset> implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  @Input() ecsVersion!: string;
  @Input() requestResponse: RequestResponse<EcsFieldset> | null | undefined;
  @Input() ecsFieldsetsLightList!: NameIdEntity[];
  @Input() parameterDescriptions: ParameterDescription[] = [];
  @Input() fieldClasses!: FieldClass[];
  @Output() getOutputKeysForFieldClasses = new EventEmitter<FieldClass[]>();
  fieldsetParameterDescriptions: Map<string, string> = new Map<string, string>();

  constructor(
    protected override formBuilder: FormBuilder,
    protected override dialog: MatDialog,
    protected override cdRef: ChangeDetectorRef,
    protected override datePipe: DatePipe
  ) {
    super(formBuilder, dialog, cdRef, datePipe);
  }

  filteredFieldClasses: Array<Observable<FieldClass[]>> = [];

  get fieldClassItemsFormArray(): FormArray {
    return this.form?.get('fieldClasses') as FormArray;
  }

  ngOnInit(): void {
    this.updateForm();

    // get output keys for all selected fieldClasses
    this.fieldClassItemsFormArray.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((allSelectedFieldClasses: Array<string | FieldClass>) => {
          const selectedFieldClasses: FieldClass[] = <FieldClass[]>(
            allSelectedFieldClasses.filter((fieldClass) => typeof fieldClass !== 'string')
          );
          this.getOutputKeysForFieldClasses.emit(selectedFieldClasses);
        })
      )
      .subscribe();
  }

  /**
   * This method is called when the user selects a fieldClass from the autocomplete dropdown.
   * It emits an event to get output keys for all selected fieldClasses.
   */
  onSelectFieldClass(): void {
    const fieldClasses = this.fieldClassItemsFormArray.controls
      .filter((control) => control.value)
      .map((control) => {
        return { id: control.value.id } as FieldClass;
      });
    this.getOutputKeysForFieldClasses.emit(fieldClasses);
  }

  onClickAddFieldClassItem(): void {
    const controlToAdd = new FormControl('', [Validators.required]);
    this.filteredFieldClasses?.push(
      controlToAdd.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(''),
        map((value: FieldClass | string | null) => {
          const userInput = typeof value === 'string' ? value : this.fieldClassAutocompleteDisplayFn(value);
          return this.filterFieldClasses(
            this.fieldClasses,
            userInput || '',
            this.fieldClassItemsFormArray.controls.map((o) => <FieldClass>o.value)
          );
        })
      )
    );
    this.fieldClassItemsFormArray.push(controlToAdd);
  }

  onClickRemoveFieldClassItem(index: number): void {
    this.fieldClassItemsFormArray.removeAt(index);
    this.filteredFieldClasses.splice(index, 1);
  }

  fieldClassAutocompleteDisplayFn(fieldClass: FieldClass | null): string {
    return fieldClass && fieldClass.id ? `${fieldClass.name}` : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'requestResponse' in changes &&
      changes['requestResponse']?.currentValue?.message === 'createdSuccessfully' &&
      changes['requestResponse']?.currentValue?.entity?.name === this.entity?.name
    ) {
      this.removeCreateForm.emit();
      this.cdRef.markForCheck();
    }
    if (changes['parameterDescriptions']?.currentValue) {
      this.fieldsetParameterDescriptions = new Map<string, string>();
      // @ts-ignore
      const fieldsetParameters: ParameterDescription[] = this.parameterDescriptions?.filter(
        (p) => p.type === 'fieldset'
      );
      fieldsetParameters?.forEach((p) => {
        // @ts-ignore
        this.fieldsetParameterDescriptions[p.parameterName] = p.description;
      });
    }
  }

  override updateForm(): void {
    const creator = 'Rakia Ben Sassi';
    const currentDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      ecsVersion: [{ value: this.ecsVersion, disabled: true }],
      isEcs: [{ value: false, disabled: true }, Validators.required],
      root: [false, Validators.required],
      description: ['', Validators.required],
      comment: [''],
      short: [''],
      shortOverride: [''],
      beta: [''],
      footnote: [''],
      createdBy: [{ value: creator, disabled: true }, Validators.required],
      created: [{ value: currentDate, disabled: true }, Validators.required],
      customDescription: [''],
      customComment: [''],
      reuses: this.formBuilder.array([]),
      fieldClasses: this.formBuilder.array([]),
    });
  }

  override onClickSave() {
    this.entity = {
      ecsVersion: this.ecsVersion,
      name: this.form?.controls['name'].value,
      title: this.form?.controls['title'].value,
      isEcs: false,
      short: this.form?.controls['short'].value,
      shortOverride: this.form?.controls['shortOverride'].value,
      description: this.form?.controls['description'].value,
      comment: this.form?.controls['comment'].value,
      footnote: this.form?.controls['footnote'].value,
      root: this.form?.controls['root'].value,
      beta: this.form?.controls['beta'].value,
      customDescription: this.form?.controls['customDescription'].value,
      customComment: this.form?.controls['customComment'].value,
    };
    this.addReusesFromForm();
    super.onClickSave();
  }

  private addReusesFromForm(): void {
    const reuses = (this.form.controls['reuses'] as FormArray).getRawValue();
    this.entity.reuses = reuses.map((item) => ({
      reusedAs: item.name,
      ecsFieldset: item.id,
      topLevel: true,
    }));
  }

  /** This function returns all non-assigned fieldClasses that match the user input
   * @param allFieldClasses all fieldClasses
   * @param value user input
   * @param alreadyAssignedFieldClasses fieldClasses that are already assigned
   */
  filterFieldClasses(allFieldClasses: FieldClass[], value: string, alreadyAssignedFieldClasses: FieldClass[] = []): FieldClass[] {
    const userInput = value.toLowerCase();

    const resultingFieldClasses: FieldClass[] = allFieldClasses.filter((fieldClass) => {
      const matchingFieldClass = fieldClass.name.toLowerCase().includes(userInput);

      return matchingFieldClass && !alreadyAssignedFieldClasses.find((o) => o.name === fieldClass.name);
    });

    return resultingFieldClasses;
  }
}
