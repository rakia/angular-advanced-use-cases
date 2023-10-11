import { AbstractControl, ValidatorFn } from '@angular/forms';

export function keyValueValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (typeof control.value === 'string' && control.value.includes(':')) {
      const [itemKey, itemValue] = control.value.split(':');
      return itemKey && itemValue ? null : { keyValueError: true };
    }
    return { keyValueError: true }; // Invalid
  };
}
