import { Injectable } from '@angular/core';
import { TextboxProperty } from './textbox-property';
import { SelectProperty } from './select-property';
import { SearchboxProperty } from './searchbox-property';
import { TextAreaProperty } from './textarea-property';
import { PropertyModel } from './property-model';

@Injectable()
export class PropertyFactory {
  constructor() {}

  createProperty(type: string, options: {}): PropertyModel<any> {
    if (type.toLowerCase() === 'textbox') return new TextboxProperty(options);
    else if (type.toLowerCase() === 'select')
      return new SelectProperty(options);
    else if (type.toLowerCase() === 'searchbox')
      return new SearchboxProperty(options);
    else if (type.toLowerCase() === 'textarea')
      return new TextAreaProperty(options);
    else console.log('No such property exists');
  }
}
