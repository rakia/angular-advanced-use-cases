import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function isValidJSON(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    try {
      JSON.parse(control.value);
      return null;
    } catch (error) {
      return { isNotJson: control.value };
    }
  };
}
