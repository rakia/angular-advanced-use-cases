import { StringifyWhenNeededPipe } from './stringify-when-needed.pipe';

describe('StringifyWhenNeededPipe', () => {
  let pipe: StringifyWhenNeededPipe;

  beforeEach(() => {
    pipe = new StringifyWhenNeededPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
