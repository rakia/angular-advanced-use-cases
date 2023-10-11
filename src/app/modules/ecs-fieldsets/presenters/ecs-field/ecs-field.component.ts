import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {
  ActionButton,
  ActionType,
  EditableEntityComponent,
  FormService,
  UpdatedEntity,
} from 'projects/shared/src/public-api';
import { EcsField, EcsFieldLevel, EcsFieldType, UpdatableEcsFieldAttributes } from '../../models/ecs-field.interface';

@Component({
  selector: 'app-ecs-field',
  templateUrl: './ecs-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldComponent extends EditableEntityComponent<EcsField> implements OnInit, OnChanges {
  override formBuilder = inject(FormBuilder);
  override cdRef = inject(ChangeDetectorRef);
  override datePipe = inject(DatePipe);
  formService = inject(FormService);
  @Input() ecsFieldTypes: EcsFieldType[] = [];
  @Input() ecsFieldLevels: EcsFieldLevel[] = [];
  @Input() expanded: boolean = false;
  @Input() parameterDescriptions: Map<string, string> = new Map<string, string>();
  @Output() updateEcsField = new EventEmitter<UpdatedEntity<UpdatableEcsFieldAttributes>>();

  override editableFields: string[] = ['customDescription', 'customComment', 'customHelp', 'customExample'];
  override readOnlyFields: string[] = ['isEcs', 'created', 'createdBy', 'updated', 'updatedBy', 'flatName'];
  customActionsButtons: ActionButton[] = [{ name: 'delete', label: 'shared.BUTTONS.DELETE', icon: 'delete' }];

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  override enableEditMode(): void {
    if (this.entity.isEcs) {
      super.enableEditMode();
    } else {
      // ECS-Fields that are CUSTOM (isEcs=false) are editable
      this.isEditMode = true;
      this.form.enable();
      this.readOnlyFields.forEach((readOnlyField) => {
        this.form.controls[readOnlyField]?.disable({ onlySelf: true, emitEvent: true });
      });
      this.cdRef.markForCheck();
    }
  }

  override updateForm(): void {
    this.form = this.formBuilder.group({
      name: [{ value: this.entity?.name, disabled: true }],
      flatName: [{ value: this.entity?.flatName, disabled: true }],
      isEcs: [{ value: this.entity?.isEcs, disabled: true }],
      level: [{ value: this.entity?.level, disabled: true }],
      type: [{ value: this.entity?.type, disabled: true }],
      short: [{ value: this.entity?.short, disabled: true }],
      example: [{ value: this.entity?.example, disabled: true }],
      description: [{ value: this.entity?.description, disabled: true }],
      ignoreAbove: [{ value: this.entity?.ignoreAbove, disabled: true }],
      scalingFactor: [{ value: this.entity?.scalingFactor, disabled: true }],
      created: [{ value: this.datePipe.transform(this.entity.created, 'dd.MM.yyyy'), disabled: true }],
      createdBy: [{ value: this.entity?.createdBy, disabled: true }],
      updated: [{ value: this.datePipe.transform(this.entity.updated, 'dd.MM.yyyy'), disabled: true }],
      updatedBy: [{ value: this.entity?.updatedBy, disabled: true }],
      beta: [{ value: this.entity?.beta, disabled: true }],
      required: [{ value: this.entity?.required, disabled: true }],
      index: [{ value: this.entity?.index, disabled: true }],
      objectType: [{ value: this.entity?.objectType, disabled: true }],
      format: [{ value: this.entity?.format, disabled: true }],
      inputFormat: [{ value: this.entity?.inputFormat, disabled: true }],
      outputFormat: [{ value: this.entity?.outputFormat, disabled: true }],
      outputPrecision: [{ value: this.entity?.outputPrecision, disabled: true }],
      pattern: [{ value: this.entity?.pattern, disabled: true }],
      docValues: [{ value: this.entity?.docValues, disabled: true }],
      customDescription: [{ value: this.entity?.customDescription, disabled: true }],
      customExample: [{ value: this.entity?.customExample, disabled: true }],
      customComment: [{ value: this.entity?.customComment, disabled: true }],
      customHelp: [{ value: this.entity?.customHelp, disabled: true }],
      normalize: this.formBuilder.array([]), // this.entity?.normalize
      expectedValues: this.formBuilder.array([]), // this.entity?.expectedValues
      ecsMultifields: this.formBuilder.array([]), // this.entity?.ecsMultifields
      ecsFieldAllowedValues: this.formBuilder.array([]), // this.entity?.ecsFieldAllowedValues
    });
    this.formService.addItemsToFormArray('normalize', this.entity?.normalize, this.form);
    this.formService.addItemsToFormArray('expectedValues', this.entity?.expectedValues, this.form);
  }

  onClickActionButton(actionName: ActionType) {
    if (actionName === 'delete') {
      this.onClickDelete(this.entity.id!, this.entity.name);
    }
  }

  override onClickSave(): void {
    let updatedEcsField: EcsField | UpdatableEcsFieldAttributes;
    if (this.entity.isEcs) {
      // only custom attributes are updatable
      updatedEcsField = {
        customDescription: this.form?.controls['customDescription'].value,
        customExample: this.form?.controls['customExample'].value,
        customComment: this.form?.controls['customComment'].value,
        customHelp: this.form?.controls['customHelp'].value,
      };
    } else {
      this.entity.name = this.form?.controls['name'].value;
      this.entity.level = this.form?.controls['level'].value;
      this.entity.type = this.form?.controls['type'].value;
      this.entity.short = this.form?.controls['short'].value;
      this.entity.example = this.form?.controls['example'].value;
      this.entity.description = this.form?.controls['description'].value;
      this.entity.ignoreAbove = this.form?.controls['ignoreAbove'].value;
      this.entity.scalingFactor = this.form?.controls['scalingFactor'].value;
      this.entity.beta = this.form?.controls['beta'].value;
      this.entity.required = this.form?.controls['required'].value;
      this.entity.index = this.form?.controls['index'].value;
      this.entity.objectType = this.form?.controls['objectType'].value;
      this.entity.format = this.form?.controls['format'].value;
      this.entity.inputFormat = this.form?.controls['inputFormat'].value;
      this.entity.outputFormat = this.form?.controls['outputFormat'].value;
      this.entity.outputPrecision = this.form?.controls['outputPrecision'].value;
      this.entity.pattern = this.form?.controls['pattern'].value;
      this.entity.docValues = this.form?.controls['docValues'].value;
      this.entity.customDescription = this.form?.controls['customDescription'].value;
      this.entity.customExample = this.form?.controls['customExample'].value;
      this.entity.customComment = this.form?.controls['customComment'].value;
      this.entity.customHelp = this.form?.controls['customHelp'].value;

      this.entity.normalize = (this.form.controls['normalize'] as FormArray).getRawValue();
      this.entity.expectedValues = (this.form.controls['expectedValues'] as FormArray).getRawValue();
      updatedEcsField = this.entity;
    }
    const updatedEntity: UpdatedEntity<UpdatableEcsFieldAttributes> = {
      entityId: this.entity.id!,
      entityName: this.entity.name,
      updatedAttributes: updatedEcsField,
    };
    this.updateEcsField.emit(updatedEntity);
  }

  /**
   * Track by function for ngFor loops
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
