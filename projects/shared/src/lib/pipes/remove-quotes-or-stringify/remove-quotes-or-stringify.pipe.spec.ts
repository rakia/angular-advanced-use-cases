import { RemoveQuotesOrStringifyPipe } from './remove-quotes-or-stringify.pipe';

describe('removeQuotesOrStringify', () => {
  let pipe: RemoveQuotesOrStringifyPipe;

  beforeEach(() => {
    pipe = new RemoveQuotesOrStringifyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the string without quotes', () => {
    const stringValue = '"value1"';
    expect(pipe.transform(stringValue)).toEqual('value1');
  });

  it('should return the string as it is', () => {
    const stringValue = '"value1"';
    expect(pipe.transform(stringValue)).toEqual('value1');
  });

  it('should return the JSON as it is', () => {
    const stringValue = '{"key1": "value1"}';
    expect(pipe.transform(stringValue)).toEqual('{"key1": "value1"}');
  });

  it('should stringify a JSON object', () => {
    const stringValue = { key1: 'value1' };
    expect(pipe.transform(stringValue)).toEqual('{"key1":"value1"}');
  });

  it('should stringify an Array', () => {
    const stringValue = ['tag1', 'tag2', 'tag3'];
    expect(pipe.transform(stringValue)).toEqual('["tag1","tag2","tag3"]');
  });
});
