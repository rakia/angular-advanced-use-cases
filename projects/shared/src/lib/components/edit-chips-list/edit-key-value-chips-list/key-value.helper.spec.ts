import { convertKeyValuesIntoJson, convertKeyValueIntoJson } from './key-value.helper';

describe('convertKeyValuesIntoJson', () => {
  it('should convert an array of key-value strings into an array of JSON objects', () => {
    const input = ['key1:value1', 'key2:value2'];
    const expected = [{ key1: 'value1' }, { key2: 'value2' }];
    expect(convertKeyValuesIntoJson(input)).toEqual(expected);
  });

  it('should handle an empty array', () => {
    const input: string[] = [];
    const expected: { [key: string]: string }[] = [];
    expect(convertKeyValuesIntoJson(input)).toEqual(expected);
  });

  it('should handle a key-value string with spaces', () => {
    const input = ['key1 : value1'];
    const expected = [{ 'key1 ': ' value1' }];
    expect(convertKeyValuesIntoJson(input)).toEqual(expected);
  });

  it('should return an error when a key-value string does not contain a colon', () => {
    const input = ['invalidKeyValue'];
    expect(convertKeyValuesIntoJson(input)).toEqual([{ invalidKeyValue: undefined }]);
  });
});

describe('convertKeyValueIntoJson', () => {
  it('should convert a key-value string into a JSON object', () => {
    const input = 'key1:value1';
    const expected = { key1: 'value1' };
    expect(convertKeyValueIntoJson(input)).toEqual(expected);
  });

  it('should handle a key-value string with spaces', () => {
    const input = 'key1 : value1';
    const expected = { 'key1 ': ' value1' };
    expect(convertKeyValueIntoJson(input)).toEqual(expected);
  });

  it('should return an error when the key-value string does not contain a colon', () => {
    const input = 'invalidKeyValue';
    expect(typeof convertKeyValueIntoJson(input)).toEqual('object');
    expect(typeof convertKeyValueIntoJson(input)).not.toEqual('invalidKeyValue');
  });
});
