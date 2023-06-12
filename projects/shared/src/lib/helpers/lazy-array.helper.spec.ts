import { of } from 'rxjs';
import { lazyArray } from './lazy-array.helper';

describe('lazyArray', () => {
  it('should emit items in batches, with delay between each batch', () => {
    const source$ = of([1, 2, 3, 4, 5]);
    const spy = jest.fn();
    const delayMs = 100;
    const concurrency = 2;

    source$.pipe(lazyArray(delayMs, concurrency)).subscribe(spy);

    setTimeout(() => {
      // the first batch should contain the first 2 items
      expect(spy).toHaveBeenCalledWith([1, 2]);
    }, delayMs * 1);

    setTimeout(() => {
      // the second batch should contain the next 2 items
      expect(spy).toHaveBeenCalledWith([3, 4]);
    }, delayMs * 2);

    setTimeout(() => {
      // the third and final batch should contain the last item
      expect(spy).toHaveBeenCalledWith([5]);
    }, delayMs * 3);

    setTimeout(() => {
      // the spy should have been called 3 times in total
      expect(spy).toHaveBeenCalledTimes(3);
    }, delayMs * 4);
  });
});
