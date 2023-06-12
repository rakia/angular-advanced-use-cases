import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  DialogData,
  ECS_VERSION_PATTERN,
} from 'projects/shared/src/public-api';
import { EcsFileToUpload } from '../../models/data-to-upload.interface';

@Component({
  selector: 'app-upload-ecs-fieldsets',
  templateUrl: './upload-ecs-fieldsets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadEcsFieldsetsComponent implements OnInit, OnChanges {
  @Input() uploadStatus: EcsFileToUpload | null = null;
  @Output() uploadEcsFields = new EventEmitter<EcsFileToUpload>();
  @Output() cancelUploadMode = new EventEmitter<void>();

  public form!: FormGroup;
  ecsVersionPattern = ECS_VERSION_PATTERN;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['uploadStatus'] &&
      !changes['uploadStatus'].firstChange &&
      changes['uploadStatus'].currentValue?.ecsVersion === this.form!.value?.ecsVersion &&
      // eslint-disable-next-line no-underscore-dangle
      changes['uploadStatus'].currentValue?.uploadFileName === this.form!.value?.uploadFile[0]?.name
    ) {
      this.cancelUploadMode.emit();
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      ecsVersion: ['', Validators.required],
      uploadFile: [undefined, Validators.required],
    });
  }

  onUploadEcsFields(): void {
    const uploadData: EcsFileToUpload = {
      ecsVersion: this.form!.value.ecsVersion,
      uploadFile: this.form!.controls['uploadFile'].value[0],
    };
    this.uploadEcsFields.emit(uploadData);
    this.form.disable();
  }

  onClickCancel(): void {
    if (this.form.touched && this.form.dirty) {
      const dialogData: DialogData = {
        hasActions: true,
        mode: 'delete',
        text: '',
        title: 'shared.MESSAGES.CONFIRM_CANCEL.TITLE',
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: dialogData,
      });
      dialogRef.afterClosed().subscribe((data: boolean) => {
        if (data) {
          this.cancelUploadMode.emit();
        }
      });
    } else {
      this.cancelUploadMode.emit();
    }
  }
}
