import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'
@Pipe({
  name: 'formfilter'
})
export class SearchFormFilterPipe implements PipeTransform {

  transform(forms: any[], value:string): any {
    if (!forms||value=="") return forms;

    value = value.toLowerCase();
    
    return _.filter(forms,(form) => _.includes(form.name.toLowerCase(),value));
  }
  
}

