import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchValue: string, searchObject: string): any {
    if (!value || searchValue === '') {
      return value;
    }
    const results = [];
    searchValue = searchValue.toLowerCase();
    _.forEach(value, (val) => {
      if (_.includes(val[searchObject].toLowerCase(), searchValue)) {
        results.push(val);
      }
    });
    return results;
  }
}
