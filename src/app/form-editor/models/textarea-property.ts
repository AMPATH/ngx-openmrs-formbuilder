import { PropertyModel } from './property-model';
export class TextAreaProperty extends PropertyModel<string> {
  controlType = 'textarea';
  type: string;
  placeholder: string;
  rows: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.placeholder = options['placeholder'] || '';
    this.rows = options['rows'] || 5;
  }
}
