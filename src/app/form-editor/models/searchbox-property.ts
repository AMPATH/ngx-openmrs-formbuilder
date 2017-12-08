import { PropertyModel } from './property-model';
export class SearchboxProperty extends PropertyModel<string> {
    controlType = 'searchbox';
    searchData: string;
    type: string;


    constructor(options: {}= {}) {
        super(options);
        this.type = options['type'] || '';
        this.searchData = options['searchData'];
    }
}
