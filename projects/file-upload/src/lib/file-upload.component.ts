import { ControlValueAccessor, NgControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Self
} from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

let nextId = 0;

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [{ provide: MatFormFieldControl, useExisting: FileUploadComponent }],
})
export class FileUploadComponent implements ControlValueAccessor, MatFormFieldControl<File>, OnDestroy {
  @Input() accept: string = 'text/yaml,.yaml,.yml';
  @Output() uploadFile = new EventEmitter<File>();
  fileControl = new UntypedFormControl(undefined, Validators.required);
  fileName = '';

  static nextId = 0;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'lib-file-upload';
  // eslint-disable-next-line no-plusplus
  id = `lib-file-upload-${nextId++}`;
  describedBy = '';

  @HostBinding('attr.aria-describedby') ariaDescribedby: string | undefined;
  // @ts-ignore
  _value: File | null;

  get empty() {
    return !this.fileControl.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._placeholder;
  }
  set placeholder(value: string) {
    // eslint-disable-next-line no-underscore-dangle
    this._placeholder = value;
    this.stateChanges.next();
  }
  // eslint-disable-next-line no-underscore-dangle
  private _placeholder: string = 'No file uploaded yet';
  @Input()
  get required(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._required;
  }
  set required(value: boolean) {
    // eslint-disable-next-line no-underscore-dangle
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  // eslint-disable-next-line no-underscore-dangle
  private _required = false;

  @Input()
  get disabled(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._disabled;
  }
  set disabled(value: boolean) {
    // eslint-disable-next-line no-underscore-dangle
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): File | null {
    return this.fileControl.value;
  }
  set value(file: File | null) {
    this.fileControl.setValue(file);
    this.stateChanges.next();
  }

  constructor(@Self() public ngControl: NgControl) {
    // eslint-disable-next-line no-param-reassign
    ngControl.valueAccessor = this;
    this.fileControl.statusChanges.subscribe((status) => {
      this.errorState = status === 'INVALID';
      this.stateChanges.next();
    });
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick() {} // event: MouseEvent

  writeValue(file: File): void {
    this.value = file;
  }

  registerOnChange(fn: any): void {
    this.fileControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTouched = () => {};

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileSelected(event: any) {
    // Event
    const file: File = event.target.files[0]; // (event.target as HTMLInputElement)?.files[0]
    if (file) {
      this.fileName = file.name;
      this.fileControl.setValue(file);
      this.onTouched();
      this.uploadFile.emit(file);
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
