import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validateKeyValueString(value: string | null): { keyValueError: boolean } | null {
  let validationResult: { keyValueError: boolean } | null = null; // valid

  if (value && typeof value === 'string' && value.includes(':')) {
    const [itemKey, itemValue] = value.split(':');
    const isKeyValueSyntax = itemKey && itemValue;
    if (!isKeyValueSyntax) {
      validationResult = { keyValueError: true }; // invalid
    }
  } else if (value) {
    validationResult = { keyValueError: true }; // invalid
  }
  return validationResult;
}

export function keyValueValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return validateKeyValueString(control.value);
  };
}
