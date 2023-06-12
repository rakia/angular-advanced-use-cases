import { GetJsonPipe } from './get-json.pipe';

describe('GetJsonPipe', () => {
  let pipe: GetJsonPipe;

  beforeEach(() => {
    pipe = new GetJsonPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the parsed JSON', () => {
    const jsonString = '{"key1":"value1","key2":"value2","key3":"value3"}';
    const jsonValue = { key1: 'value1', key2: 'value2', key3: 'value3' };
    expect(pipe.transform(jsonString)).toEqual(jsonValue);
  });

  it('should return the value of the specified key', () => {
    const jsonString = '{"key1":"value1","key2":"value2","key3":"value3"}';
    expect(pipe.transform(jsonString, 'key2')).toEqual('value2');
  });

  it('should return null if the JSON is invalid (with a missing ") ', () => {
    const jsonString = '{"key1":"value1","key2":"value2","key3":"value3}';
    expect(pipe.transform(jsonString)).toBeNull();
  });
});
