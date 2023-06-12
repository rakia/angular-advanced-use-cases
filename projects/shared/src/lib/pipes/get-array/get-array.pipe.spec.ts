import { GetArrayPipe } from './get-array.pipe';

describe('GetArrayPipe', () => {
  let pipe: GetArrayPipe;

  beforeEach(() => {
    pipe = new GetArrayPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an array', () => {
    const obj = ['value1', 'value2', 'value3'];
    expect(pipe.transform(obj)).toEqual(['value1', 'value2', 'value3']);
  });

  it('should return an array with just 1 item in it', () => {
    const obj = 'value1';
    expect(pipe.transform(obj)).toEqual([obj]);
  });
});
