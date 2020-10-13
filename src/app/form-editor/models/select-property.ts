import { PropertyModel } from './property-model';
export class SelectProperty extends PropertyModel<string> {
  controlType = 'select';
  options: { key: string; value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.key = options['key'] || '';
    this.options = options['options'] || [];
  }
}
