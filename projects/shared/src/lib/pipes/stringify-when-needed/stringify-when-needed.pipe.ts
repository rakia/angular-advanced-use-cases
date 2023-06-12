import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyWhenNeeded',
})
export class StringifyWhenNeededPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  }
}
