import { FormControl } from '@angular/forms';
import { objectSelectedValidator } from './object-selected.validator';

describe('objectNotSelectedValidator', () => {
  const objectSelectedValidatorInstance = objectSelectedValidator();
  it('should set error for a string', () => {
    const control = new FormControl('this is a string');
    expect(objectSelectedValidatorInstance(control)).toEqual({ objectNotSelected: true });
  });

  it('should set error for undefined value', () => {
    const control = new FormControl();
    expect(objectSelectedValidatorInstance(control)).toEqual({ objectNotSelected: true });
  });

  it('should not set error if value is object', () => {
    const control = new FormControl({ id: '123456789' });
    expect(objectSelectedValidatorInstance(control)).toEqual(null);
  });
});
