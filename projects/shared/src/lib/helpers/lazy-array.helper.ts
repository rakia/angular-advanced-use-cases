import { bufferCount, concatMap, delay, from, Observable, of, scan, tap } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export function lazyArray<T>(delayMs = 100, concurrency = 2) {
  let isFirstEmission = true;

  return (source$: Observable<T[]>) =>
    source$.pipe(
      mergeMap((items: T[]) => {
        if (!isFirstEmission) {
          return of(items);
        }

        const items$ = from(items); // transform the array to a stream

        return items$.pipe(
          bufferCount(concurrency), // processing n requests in batch (n = concurrency = 2 in this case)
          // "scheduled(of(value), animationFrameScheduler)" didn't work so I just used "of(value)"
          concatMap((value, index) => of(value).pipe(delay(index * delayMs))),
          scan((acc: T[], steps: T[]) => [...acc, ...steps], []),
          tap((scannedItems: T[]) => {
            const scanDidComplete = scannedItems.length === items.length;
            if (scanDidComplete) {
              isFirstEmission = false;
            }
          })
        );
      })
    );
}
