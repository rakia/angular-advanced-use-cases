import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  ActionButton,
  ActionType,
  DeleteEvent,
  EditableEntityComponent,
  FormService,
  NameIdEntity,
  ObjectType,
  RequestResponse,
  UpdatedEntity,
} from 'projects/shared/src/public-api';
import { EcsField, EcsFieldLevel, EcsFieldType, UpdatableEcsFieldAttributes } from '../../models/ecs-field.interface';
import { EcsFieldset, UpdatableEcsFieldsetAttributes } from '../../models/ecs-fieldset.interface';
import { FieldType } from '../../models/field-type.types';
import { ParameterDescription } from '../../models/parameter-description.interface';
import { Reuse } from '../../models/reuse.interface';
import { lazyArray } from '../../helpers/lazy-array.helper';

@Component({
  selector: 'app-ecs-fieldset',
  templateUrl: './ecs-fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldsetComponent extends EditableEntityComponent<EcsFieldset> implements OnInit, OnChanges {
  override formBuilder = inject(FormBuilder);
  override cdRef = inject(ChangeDetectorRef);
  override datePipe = inject(DatePipe);
  formService = inject(FormService);
  @Input() fields!: EcsField[];
  @Input() ecsFieldsetsLightList!: NameIdEntity[];
  @Input() selectedFieldTypes: FieldType[] = [];
  @Input() searchQuery: string = '';
  @Input() requestResponseEcsField: RequestResponse<EcsField> | null | undefined;
  @Input() ecsFieldTypes: EcsFieldType[] = [];
  @Input() ecsFieldLevels: EcsFieldLevel[] = [];
  @Input() parameterDescriptions: ParameterDescription[] | null | undefined;
  @Output() updateEcsFieldset = new EventEmitter<UpdatedEntity<UpdatableEcsFieldsetAttributes>>();
  @Output() updateEcsField = new EventEmitter<UpdatedEntity<UpdatableEcsFieldAttributes>>();
  @Output() deleteEcsField = new EventEmitter<DeleteEvent>();
  @Output() createCustomField = new EventEmitter<EcsField | Partial<EcsField>>();

  fieldsetParameterDescriptions: Map<string, string> = new Map<string, string>();
  fieldParameterDescriptions: Map<string, string> = new Map<string, string>();
  lazyFields$: Observable<EcsField[]> = of([]);

  /**
   * - When the Fieldset's type is ECS, then only 'customDescription' & 'customComment' are editable.
   * - When the Fieldset's type is Custom, then all the fields, which are not readOnly, are editable.
   */
  override editableFields: string[] = ['customDescription', 'customComment'];
  override readOnlyFields: string[] = ['isEcs', 'ecsVersion', 'created', 'createdBy', 'updated', 'updatedBy'];

  customActionsButtons: ActionButton[] = [{ name: 'delete', label: 'shared.BUTTONS.DELETE', icon: 'delete' }];
  ecsFields: EcsField[] = [];
  customFields: EcsField[] = [];

  openAllFields: boolean = false;
  selectedEcsField: EcsField | undefined;
  selectedId: string | undefined;

  isCreateMode: boolean = false;
  updatedReuses: Reuse[] = [];
  get reusesFormArray(): FormArray {
    return this.form?.get('reuses') as FormArray;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['fields']?.currentValue) {
      this.ecsFields = this.fields.filter((field) => field.isEcs);
      this.customFields = this.fields.filter((field) => !field.isEcs);

      if (this.fields?.length) {
        this.setSelectedEcsField(this.fields[0]);
      }
    }
    if (changes['ecsFieldsetsLightList']?.currentValue) {
      this.ecsFieldsetsLightList = this.ecsFieldsetsLightList.filter(
        (ecsFieldset) => ecsFieldset.id !== this.entity.id
      );
    }
    if (changes['entity']?.currentValue) {
      this.updatedReuses = this.entity.reuses?.slice() || [];
    }
    if (changes['parameterDescriptions']?.currentValue) {
      this.fieldsetParameterDescriptions = new Map<string, string>();
      this.fieldParameterDescriptions = new Map<string, string>();
      const fieldsetParameters: ParameterDescription[] | null  | undefined = this.parameterDescriptions?.filter(
        (p) => p.type === 'fieldset'
      );
      fieldsetParameters?.forEach((p) => {
        this.fieldsetParameterDescriptions.set(p.parameterName, p.description);
      });
      const fieldParameters: ParameterDescription[] | null  | undefined = this.parameterDescriptions?.filter((p) => p.type === 'field');
      fieldParameters?.forEach((p) => {
        this.fieldParameterDescriptions.set(p.parameterName, p.description);
      });
    }
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
      title: [{ value: this.entity?.title, disabled: true }],
      ecsVersion: [{ value: this.entity?.ecsVersion, disabled: true }],
      isEcs: [{ value: this.entity?.isEcs, disabled: true }],
      root: [{ value: this.entity?.root, disabled: true }],
      description: [{ value: this.entity?.description, disabled: true }],
      comment: [{ value: this.entity?.comment, disabled: true }],
      short: [{ value: this.entity?.short, disabled: true }],
      shortOverride: [{ value: this.entity?.shortOverride, disabled: true }],
      beta: [{ value: this.entity?.beta, disabled: true }],
      footnote: [{ value: this.entity?.footnote, disabled: true }],
      created: [{ value: this.datePipe.transform(this.entity.created, 'dd.MM.yyyy'), disabled: true }],
      createdBy: [{ value: this.entity?.createdBy, disabled: true }],
      updated: [{ value: this.datePipe.transform(this.entity.updated, 'dd.MM.yyyy'), disabled: true }],
      updatedBy: [{ value: this.entity?.updatedBy, disabled: true }],
      customDescription: [{ value: this.entity?.customDescription, disabled: true }],
      customComment: [{ value: this.entity?.customComment, disabled: true }],
      reuses: this.formBuilder.array([]),
    });
    this.formService.initFormArrayWithItems(this.form, 'reuses', this.entity?.reuses);
  }

  onClickActionButton(actionName: ActionType) {
    if (actionName === 'delete') {
      this.onClickDelete(this.entity.id!, this.entity.name);
    }
  }

  override onClickSave(): void {
    let updatedEcsFieldset: EcsFieldset | UpdatableEcsFieldsetAttributes;
    if (this.entity.isEcs) {
      // only custom attributes are updatable
      updatedEcsFieldset = {
        customDescription: this.form?.controls['customDescription'].value,
        customComment: this.form?.controls['customComment'].value,
      };
    } else {
      // CUSTOM ecsFieldset
      this.updateReusesNames(this.entity.name, this.form?.controls['name'].value);

      this.entity.name = this.form?.controls['name'].value;
      this.entity.title = this.form?.controls['title'].value;
      this.entity.root = this.form?.controls['root'].value;
      this.entity.description = this.form?.controls['description'].value;
      this.entity.comment = this.form?.controls['comment'].value;
      this.entity.short = this.form?.controls['short'].value;
      this.entity.shortOverride = this.form?.controls['shortOverride'].value;
      this.entity.beta = this.form?.controls['beta'].value;
      this.entity.footnote = this.form?.controls['footnote'].value;
      this.entity.customDescription = this.form?.controls['customDescription'].value;
      this.entity.customComment = this.form?.controls['customComment'].value;
      this.entity.reuses = this.updatedReuses;
      updatedEcsFieldset = this.entity;
    }
    const updatedEntity: UpdatedEntity<UpdatableEcsFieldAttributes> = {
      entityId: this.entity.id!,
      entityName: this.entity.name,
      updatedAttributes: updatedEcsFieldset,
    };
    this.updateEcsFieldset.emit(updatedEntity);
  }

  onAddReuse(formReuse: ObjectType): void {
    const reuse = {
      reusedAs: formReuse['name'],
      ecsFieldset: formReuse['id'],
      ecsReusedAtFieldset: this.entity.id,
      topLevel: true,
    };
    this.updatedReuses.push(reuse);
  }

  onDeleteReuse(index: number): void {
    if (this.updatedReuses[index] && this.updatedReuses[index].id) {
      this.updatedReuses.splice(index, 1);
    }
  }

  updateReusesNames(entityName: string, nameInForm: string): void {
    if (entityName !== nameInForm) {
      this.updatedReuses?.forEach((reuse) => {
        const reusesAsParts = reuse.reusedAs.split('.');
        const prefix = reusesAsParts ? reusesAsParts[0] : '';

        if (prefix !== nameInForm) {
          // eslint-disable-next-line no-param-reassign
          reuse.reusedAs = `${nameInForm}.${reusesAsParts[1]}`;
        }
      });
    }
  }

  setSelectedEcsField(ecsField: ObjectType): void {
    if (this.selectedEcsField?.id === (ecsField as EcsField).id) {
      this.selectedEcsField = undefined;
      this.selectedId = undefined;
    } else {
      this.selectedEcsField = ecsField as EcsField;
      this.selectedId = this.selectedEcsField.id;
    }
    this.openAllFields = false;
  }

  toggleOpenAllFields(): void {
    this.openAllFields = !this.openAllFields;
    this.selectedEcsField = undefined;
    this.selectedId = undefined;
    this.lazyFields$ = this.openAllFields ? of(this.fields).pipe(lazyArray()) : of([]);
  }

  override onClickCancel(): void {
    this.entity.reuses = this.updatedReuses;
    super.onClickCancel();
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
// this.lazyFields$ = this.openAllFields ? of(this.fields).pipe(lazyArray()) : of([]);
