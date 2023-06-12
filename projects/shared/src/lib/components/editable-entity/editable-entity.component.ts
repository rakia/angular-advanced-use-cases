import {
  ChangeDetectorRef,
  Component,
  EventEmitter, inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BaseEntity } from '../../models/base-entity.interface';
import { DeleteEvent } from '../../models/delete-event.interface';
import { RequestResponse } from '../../models/request-response.interface';
import { DialogData } from '../confirm-dialog/dialog-data.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'lib-editable-entity',
  template: ``,
})
export class EditableEntityComponent<T extends BaseEntity> implements OnInit, OnChanges {
  protected formBuilder = inject(FormBuilder);
  protected dialog = inject(MatDialog);
  protected cdRef = inject(ChangeDetectorRef);
  protected datePipe = inject(DatePipe);
  @Input() entity!: T;
  @Input() isEditMode = false;
  @Input() requestResponse: RequestResponse<T> | null | undefined;
  @Output() delete = new EventEmitter<DeleteEvent>();
  @Output() update = new EventEmitter<T>();

  editableFields: string[] = [];
  readOnlyFields: string[] = [];
  form!: FormGroup;

  ngOnInit(): void {
    this.updateForm();
    this.form?.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity']?.currentValue) {
      this.updateForm();
      this.form?.disable();
      if (changes['entity']?.currentValue?.id !== changes['entity']?.previousValue?.id) {
        this.disableEditMode();
      }
    }
    if (changes['isEditMode']?.currentValue) {
      this.enableEditMode();
    }
    if (changes['isEditMode'] && !changes['isEditMode'].currentValue) {
      this.disableEditMode();
    }
    if (
      'requestResponse' in changes &&
      changes['requestResponse']?.currentValue?.message === 'updatedSuccessfully' &&
      changes['requestResponse']?.currentValue?.entityId === this.entity.id
    ) {
      if (this.requestResponse?.entity) {
        this.entity = this.requestResponse?.entity;
        this.updateForm();
      }
      this.form.controls['updatedBy'].setValue(this.entity.updatedBy);
      this.form.controls['updated'].setValue(this.entity.updated);
      this.disableEditMode();
    }
  }

  updateFormControlsVisibility(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      // @ts-ignore
      const abstractControl: AbstractControl = group.controls[key] as AbstractControl;

      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.updateFormControlsVisibility(abstractControl);
      } else {
        this.updateFormControlVisibility(abstractControl, key);
      }
    });
  }

  updateFormControlVisibility(abstractControl: AbstractControl, controlName: string): void {
    const isNotReadOnlyField =
      !this.readOnlyFields || !this.readOnlyFields.length || !this.readOnlyFields.includes(controlName);

    if ((isNotReadOnlyField || this.editableFields?.includes(controlName)) && this.isEditMode) {
      abstractControl.enable();
    } else {
      abstractControl.disable();
    }
  }

  updateForm(): void {}

  disableEditMode(): void {
    this.isEditMode = false;
    this.form?.disable();
  }

  enableEditMode(): void {
    this.isEditMode = true;
    this.editableFields.forEach((editableField) => {
      this.form.controls[editableField]?.enable({ onlySelf: true, emitEvent: true });
    });
    this.cdRef.markForCheck();
  }

  onClickSave(entity?: T): void {
    // this.entity = this.form.getRawValue(); // depending on the specific case, this line might or might not work
    this.update.emit(entity ?? this.entity);
  }

  onClickCancel(): void {
    if (this.form?.touched && this.form?.dirty) {
      const dialogData: DialogData = {
        hasActions: true,
        mode: 'confirmAction',
        text: '', // 'MESSAGES.CONFIRM_CANCEL.TEXT',
        title: 'shared.MESSAGES.CONFIRM_CANCEL.TITLE',
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true, // is never applied by now
        data: dialogData,
      });
      dialogRef.afterClosed().subscribe((data: boolean) => {
        if (data) {
          this.updateForm();
          this.disableEditMode();
          this.cdRef.markForCheck();
        }
      });
    } else {
      this.disableEditMode();
    }
  }

  onClickDelete(id: string, name: string): void {
    const dialogData: DialogData = {
      hasActions: true,
      mode: 'delete',
      text: 'shared.MESSAGES.CONFIRM_DELETE.TEXT_WITH_ITEM_NAME',
      title: 'shared.MESSAGES.CONFIRM_DELETE.TITLE',
      itemIdentifier: name,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.delete.emit({ entityId: id, entityName: name });
      }
    });
  }
}
