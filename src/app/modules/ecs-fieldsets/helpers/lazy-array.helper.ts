import { bufferCount, concatMap, delay, from, Observable, of, scan, tap } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * The original solution is from Giancarlo Buomprisco: https://dev.to/angular/angular-async-rendering-with-a-single-rx-operator-4d6d
 *
 * This function lazyArray() uses RxJS to gradually emit items from an array over time, in a "lazy" manner.
 *
 * It takes 2 parameters: delayMs (delay in milliseconds between emissions - default is 100ms) & concurrency (number of items to emit in each batch - default is 2).
 * This function returns another function which expects a source Observable of arrays (source$).
 *
 * The returned function uses the mergeMap operator to transform the source Observable.
 * mergeMap maps each source value (an array in this case) to an Observable, then merges the emissions from those inner Observables into the outer Observable.
 *
 * In the mergeMap function, we first check if this is the first emission with the isFirstEmission variable.
 * If it's not, we just return the array as is with the of operator which creates an Observable of the items.
 *
 * If it is the first emission, we transform the array into an Observable sequence with the from operator, creating items$.
 *
 * We then pipe this Observable through several other operators:
 *
 * bufferCount(concurrency) groups emissions into sub-arrays, each of size concurrency.
 * concatMap((value, index) => of(value).pipe(delay(index * delayMs))) maps each of these sub-arrays to a delayed Observable, creating a gradual, "lazy" emission of the sub-arrays.
 * scan((acc: T[], steps: T[]) => [...acc, ...steps], []) accumulates the emitted sub-arrays into a single array.
 * tap is used to check if we've emitted all items from the initial array. If we have, it sets isFirstEmission to false.
 *
 * This code provides a mechanism for lazily emitting the items from an array in a controlled manner.
 * This can be useful in scenarios where you need to control the rate of emissions, like for animations, data processing, or API requests.
 */
/**
 * layzyArray() takes 2 parameters
 * @param delayMs     delay in milliseconds between emissions — default is 100ms
 * @param concurrency number of items to emit in each batch — default is 2
 */
export function lazyArray<T>(delayMs = 100, concurrency = 2) {
  let isFirstEmission = true;

  // return another function that expects a source Observable of arrays: source$
  return (source$: Observable<T[]>) =>
    source$.pipe(
      // map source value (array) to an Observable, then merges the emissions from inner Observables into outer Observable
      mergeMap((items: T[]) => {
        if (!isFirstEmission) { // check if this is the first emission
          return of(items); // return the array as observable
        }

        const items$ = from(items); // transform the array to Observable & create items$

        // pipe items$ through several other operators
        return items$.pipe(
          bufferCount(concurrency), // group emissions into sub-arrays, each of size concurrency (processing n requests in batch, n=2 in this case)

          // map each of these sub-arrays to a delayed Observable, creating a gradual, "lazy" emission of the sub-arrays
          concatMap((value, index) => of(value).pipe(delay(index * delayMs))),

          // accumulate the emitted sub-arrays into a single array
          scan((acc: T[], steps: T[]) => [...acc, ...steps], []),

          // check if all items from the initial array are emitted. If so, set isFirstEmission to false
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
