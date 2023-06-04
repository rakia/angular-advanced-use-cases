import { ControlValueAccessor, NgControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Self,
  ViewChild,
} from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';

let nextId = 0;

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [{ provide: MatFormFieldControl, useExisting: FileUploadComponent }],
})
export class FileUploadComponent implements ControlValueAccessor, MatFormFieldControl<File[]>, OnDestroy {
  @Input() accept: string = 'text/yaml,.yaml,.yml';

  @ViewChild('input', { read: ElementRef }) inputFileUpload: ElementRef | undefined;
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
  // eslint-disable-next-line no-underscore-dangle
  private _multiple: boolean = false;

  @HostBinding('attr.aria-describedby') ariaDescribedby: string | undefined;
  // @ts-ignore
  _value: File[] | null;

  get empty() {
    return !this.fileControl.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get multiple(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._multiple;
  }
  set multiple(value: boolean | string) {
    // eslint-disable-next-line no-underscore-dangle
    this._multiple = coerceBooleanProperty(value);
    this.stateChanges.next();
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
    if (value) {
      this.fileControl.setValidators(Validators.required);
    }
    // eslint-disable-next-line no-underscore-dangle
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  // eslint-disable-next-line no-underscore-dangle
  private _required = false;
  private _disabled = false;
  private destroy$ = new Subject<void>();

  @Input()
  get disabled(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (value) {
      this.fileControl.disable();
    } else {
      this.fileControl.enable();
    }
    // eslint-disable-next-line no-underscore-dangle
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get value(): File[] | null {
    return this.fileControl.value;
  }
  set value(files: File[] | null) {
    this.fileControl.setValue(files);
    this.stateChanges.next();
  }

  constructor(@Self() public ngControl: NgControl) {
    // eslint-disable-next-line no-param-reassign
    ngControl.valueAccessor = this;
    this.fileControl.statusChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.fileControl.dirty || this.fileControl.touched)
      )
      .subscribe((status) => {
        this.errorState = status === 'INVALID';
        this.stateChanges.next();
      });
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if (!this.disabled && (event.target as Element).tagName.toLowerCase() !== 'input') {
      this.inputFileUpload?.nativeElement.focus();
      this.inputFileUpload?.nativeElement.click();
      this.focused = true;
      this.fileControl.markAsTouched();
      this.fileControl.updateValueAndValidity();
      this.stateChanges.next();
    }
  }

  writeValue(files: File[]): void {
    this.value = files;
    this.fileControl.setValue(files);
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
    // eslint-disable-next-line prefer-destructuring
    const files: File[] = event.target.files; // (event.target as HTMLInputElement)?.files
    if (files) {
      this.fileName = files.length > 1 ? `${files.length} files to upload` : files[0].name;
      this.fileControl.setValue(files);
      this.value = files;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
