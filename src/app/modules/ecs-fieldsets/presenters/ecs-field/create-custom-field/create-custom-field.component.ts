import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEntityComponent, RequestResponse } from 'projects/shared/src/public-api';
import { EcsField, EcsFieldLevel, EcsFieldType } from '../../../models/ecs-field.interface';

@Component({
  selector: 'app-create-custom-field',
  templateUrl: './create-custom-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomFieldComponent extends CreateEntityComponent<EcsField> implements OnInit, OnChanges {
  @Input() ecsFieldset!: string;
  @Input() requestResponse: RequestResponse<EcsField> | null | undefined;
  @Input() ecsFieldTypes: EcsFieldType[] = [];
  @Input() ecsFieldLevels: EcsFieldLevel[] = [];
  @Input() parameterDescriptions: Map<string, string> = new Map<string, string>();

  constructor(
    protected override formBuilder: FormBuilder,
    protected override dialog: MatDialog,
    protected override cdRef: ChangeDetectorRef,
    protected override datePipe: DatePipe
  ) {
    super(formBuilder, dialog, cdRef, datePipe);
  }

  ngOnInit(): void {
    this.updateForm();
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
  }

  override updateForm(): void {
    const creator = 'Rakia Ben Sassi';
    const currentDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      isEcs: [{ value: false, disabled: true }, Validators.required],
      level: ['', Validators.required],
      type: ['', Validators.required],
      short: [''],
      example: [''],
      description: ['', Validators.required],
      ignoreAbove: [''], // number
      scalingFactor: [''], // number
      createdBy: [{ value: creator, disabled: true }, Validators.required],
      created: [{ value: currentDate, disabled: true }, Validators.required],
      beta: [''],
      required: [''],
      index: [false], // boolean
      objectType: [''],
      format: [''],
      inputFormat: [''],
      outputFormat: [''],
      outputPrecision: [''], // number
      pattern: [''],
      docValues: [''],
      customDescription: [''],
      customExample: [''],
      customComment: [''],
      customHelp: [''],
      normalize: this.formBuilder.array([]),
      expectedValues: this.formBuilder.array([]),
    });
  }

  override onClickSave() {
    this.entity = {
      ecsFieldset: this.ecsFieldset,
      name: this.form?.controls['name'].value,
      isEcs: false,
      level: this.form?.controls['level'].value,
      type: this.form?.controls['type'].value,
      short: this.form?.controls['short'].value,
      example: this.form?.controls['example'].value,
      description: this.form?.controls['description'].value,
      beta: this.form?.controls['beta'].value,
      required: this.form?.controls['required'].value,
      index: this.form?.controls['index'].value,
      objectType: this.form?.controls['objectType'].value,
      format: this.form?.controls['format'].value,
      inputFormat: this.form?.controls['inputFormat'].value,
      outputFormat: this.form?.controls['outputFormat'].value,
      outputPrecision: this.form?.controls['outputPrecision'].value,
      pattern: this.form?.controls['pattern'].value,
      docValues: this.form?.controls['docValues'].value,
      customDescription: this.form?.controls['customDescription'].value,
      customExample: this.form?.controls['customExample'].value,
      customComment: this.form?.controls['customComment'].value,
      customHelp: this.form?.controls['customHelp'].value,
    };
    if (this.form?.controls['ignoreAbove'].value) {
      this.entity.ignoreAbove = this.form?.controls['ignoreAbove'].value;
    }
    if (this.form?.controls['scalingFactor'].value) {
      this.entity.scalingFactor = this.form?.controls['ignoreAbove'].value;
    }
    this.entity.normalize = (this.form.controls['normalize'] as FormArray).getRawValue();
    this.entity.expectedValues = (this.form.controls['expectedValues'] as FormArray).getRawValue();
    super.onClickSave();
  }
}
