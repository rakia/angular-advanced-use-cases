import { AbstractControl, FormControl } from '@angular/forms';
import { isValidJSON } from './is-valid-json.validator';

describe('isValidJSON', () => {
  let control: AbstractControl;

  beforeEach(() => {
    control = new FormControl();
  });

  it('should return null if the control value is empty', () => {
    expect(isValidJSON()(control)).toBeNull();
  });

  it('should return null if the control value is a valid JSON object', () => {
    control.setValue('{"name": "John", "age": 30}');
    expect(isValidJSON()(control)).toBeNull();
  });

  it('should return validation error when control value is not valid JSON', () => {
    control.setValue('{foo: "bar"}');

    const result = isValidJSON()(control);

    expect(result).not.toBe(null);
    // @ts-ignore
    expect(result.isNotJson).toBe(control.value);
  });
});
