export class PropertyModel<T>{



    value: T;
    key: string;
    label: string;
    required: boolean;
    controlType: string;
    parentPath: string;
    order: number;

    constructor(options: {
      controlType?: string,
      key?: string,
      label?: string,
      value?: T,
      required?: boolean
      parentPath?: string,
      order?: number
    } = {}) {

        this.value = options.value || null;
        this.key = options.key || '';
        this.label = options.label || '';
        this.controlType = options.controlType || '';
        this.required = options.required || false;
        this.parentPath = options.parentPath || '';
        this.order = options.order || 9;
    }
}
