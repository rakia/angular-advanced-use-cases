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
import { CreateEntityComponent, NameIdEntity, RequestResponse } from 'projects/shared/src/public-api';
import { EcsFieldset } from '../../../models/ecs-fieldset.interface';
import { ParameterDescription } from '../../../models/parameter-description.interface';

@Component({
  selector: 'app-create-custom-fieldset',
  templateUrl: './create-custom-fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomFieldsetComponent extends CreateEntityComponent<EcsFieldset> implements OnInit, OnChanges {
  @Input() ecsVersion!: string;
  @Input() requestResponse: RequestResponse<EcsFieldset> | null | undefined;
  @Input() ecsFieldsetsLightList!: NameIdEntity[];
  @Input() parameterDescriptions: ParameterDescription[] = [];
  fieldsetParameterDescriptions: Map<string, string> = new Map<string, string>();

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
}
