import { AbstractControl, ValidatorFn } from '@angular/forms';

export function objectSelectedValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null =>
    control.value && typeof control.value === 'object' ? null : { objectNotSelected: true };
}
