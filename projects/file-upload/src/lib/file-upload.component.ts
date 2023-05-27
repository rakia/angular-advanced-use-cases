import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTooltipModule, ReactiveFormsModule],
})
export class FileUploadComponent {
  @Input() requiredFileType: string = 'text/yaml,.yaml,.yml';
  @Output() uploadFile = new EventEmitter<File>();
  fileControl = new UntypedFormControl(undefined, Validators.required);

  fileName = '';

  onFileSelected(event: any) { // Event
    const file: File = event.target.files[0]; // (event.target as HTMLInputElement)?.files[0]
    if (file) {
      this.fileName = file.name;
      this.fileControl.setValue(file);
      this.uploadFile.emit(file);
    }
  }
}
