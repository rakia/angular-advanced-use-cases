import { bufferCount, concatMap, delay, from, Observable, of } from 'rxjs';

/**
 * This code provides a mechanism for lazily emitting the items from an array over time in a controlled manner.
 * @param items
 */
export function lazyArray<T>(items: T[]): Observable<T> {
  const source$ = of(...items);

  // Use concatMap to emit items one by one with a delay
  return source$.pipe(
    concatMap(item => of(item).pipe(delay(1000))) // the delay time = 1s
  );
}


























export function lazyArray2<T>(items: T[], delayMs = 100, concurrency = 2): Observable<T> {

  // Create an observable from the array
  const source$ = from(items);

  // Use bufferCount and concatMap to emit batches of 4 items with a delay
  return source$.pipe(
      bufferCount(concurrency), // Buffer 4 items at a time
      concatMap((batch) =>
        from(batch).pipe(concatMap((item) => of(item).pipe(delay(delayMs)))))
    );
}
