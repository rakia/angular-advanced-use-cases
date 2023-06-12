import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getArray',
})
export class GetArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return Array.isArray(value) ? value : [value];
  }
}
