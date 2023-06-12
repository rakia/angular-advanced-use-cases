import { GetKeysPipe } from './get-keys.pipe';

describe('GetKeysPipe', () => {
  let pipe: GetKeysPipe;

  beforeEach(() => {
    pipe = new GetKeysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the keys of an object', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    expect(pipe.transform(obj)).toEqual(['key1', 'key2', 'key3']);
  });

  it('should return an empty array for an empty object', () => {
    expect(pipe.transform({})).toEqual([]);
  });
});
