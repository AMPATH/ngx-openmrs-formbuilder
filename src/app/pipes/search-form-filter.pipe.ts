import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formfilter'
})
export class SearchFormFilterPipe implements PipeTransform {

  transform(forms: any[], value:string): any {
    if (!forms||value=="") return forms;
    value = value.toLowerCase();
    return forms.filter(form => form.name.toLowerCase().indexOf(value) != -1);
  }
  
}

