import { Pipe, PipeTransform } from '@angular/core';
import { Params } from '@angular/router';

@Pipe({
  name: 'getKeys',
})
export class GetKeysPipe implements PipeTransform {
  transform(value: Params): string[] {
    return Object.keys(value);
  }
}
