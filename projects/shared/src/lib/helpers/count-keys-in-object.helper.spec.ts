import { countKeysInObject } from './count-keys-in-object.helper';

describe('countKeysInObject', () => {
  test('should return 0 for undefined object', () => {
    expect(countKeysInObject(undefined)).toBe(0);
  });

  test('should return 0 for an empty object', () => {
    expect(countKeysInObject({})).toBe(0);
  });

  test('should return the correct count of keys in a non-empty JSON object', () => {
    const testObj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    expect(countKeysInObject(testObj)).toBe(3);
  });

  test('should return the correct count of keys in a non-empty JSON object with nested JSON objects/children', () => {
    const testObj = {
      key1: 'value1',
      key2: 'value2',
      key3: { name: 'value3', age: 13, address: { plz: 12345, city: 'Hamburg', street: 'Hamburger dummy street' } },
    };
    expect(countKeysInObject(testObj)).toBe(3);
    expect(countKeysInObject(testObj.key3)).toBe(3);
    expect(countKeysInObject(testObj.key3.address)).toBe(3);
    expect(countKeysInObject(testObj.key3['tel'])).toBe(0);
  });
});
