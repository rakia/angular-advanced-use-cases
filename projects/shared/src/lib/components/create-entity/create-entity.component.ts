import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BaseEntity } from '../../models/base-entity.interface';
import { DialogData } from '../confirm-dialog/dialog-data.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'lib-create-entity',
  template: ``,
})
export class CreateEntityComponent<T extends BaseEntity> {
  @Input() entity!: T;
  @Input() isCreateMode = false;
  @Output() save = new EventEmitter<Partial<T> | T>();
  @Output() removeCreateForm = new EventEmitter<void>();

  editableFields: string[] = [];
  form!: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog,
    protected cdRef: ChangeDetectorRef,
    protected datePipe: DatePipe
  ) {}

  updateForm(): void {}

  onClickSave(): void {
    // this.entity = this.form.getRawValue(); // depending on the specific case, this line might or might not work
    this.entity.createdBy = 'Rakia Ben Sassi';
    this.entity.created = this.form?.controls['created'].value;
    this.save.emit(this.entity);
  }

  onClickCancel(): void {
    if (this.form.touched && this.form.dirty) {
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
          this.removeCreateForm.emit();
          this.cdRef.markForCheck();
        }
      });
    } else {
      this.removeCreateForm.emit();
    }
  }
}
