import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'
@Pipe({
  name: 'formfilter'
})
export class SearchFormFilterPipe implements PipeTransform {

  transform(forms: any[], value: string, filter: string): any {
    if (!forms || value === '') { return forms; }

    value = value.toLowerCase();
    if (_.isUndefined(filter) || _.isEqual(filter, 'name')) {
      return _.filter(forms, (form) => _.includes(form['name'].toLowerCase(), value));
    } else if (_.isEqual(filter, 'published')) {
      return _.filter(forms, (form) => _.includes(form['name'].toLowerCase(), value) && form['published'] === true);
    } else if (_.isEqual(filter, 'version')) {
      return _.filter(forms, (form) => _.includes(form['name'].toLowerCase(), value));
    }
  }
}

