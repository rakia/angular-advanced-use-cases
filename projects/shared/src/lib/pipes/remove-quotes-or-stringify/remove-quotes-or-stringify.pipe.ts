import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeQuotesOrStringify',
})
export class RemoveQuotesOrStringifyPipe implements PipeTransform {
  transform(value: string | number | any[] | any | null | undefined): string | number | null | undefined {
    let newValue = value;
    if (newValue) {
      if (newValue === 'null') {
        newValue = '';
      } else if (
        typeof newValue === 'string' &&
        newValue?.startsWith('"') &&
        newValue?.endsWith('"') &&
        newValue?.length >= 3
      ) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        newValue = newValue?.substring(1, newValue?.length - 1);
      } else if (
        Array.isArray(newValue) ||
        typeof newValue === 'object' ||
        (typeof newValue !== 'string' && typeof newValue !== 'number')
      ) {
        newValue = JSON.stringify(newValue);
      }
      return newValue;
    }
    return typeof newValue === 'number' || Number(newValue) ? newValue : '';
  }
}
