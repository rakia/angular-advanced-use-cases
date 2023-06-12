import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getJson',
})
export class GetJsonPipe implements PipeTransform {
  transform(value: string, key?: string): any {
    let jsonValue;
    try {
      jsonValue = JSON.parse(value);
    } catch (e) {
      return null;
    }
    if (key && jsonValue) {
      return jsonValue[key];
    }
    return jsonValue;
  }
}
