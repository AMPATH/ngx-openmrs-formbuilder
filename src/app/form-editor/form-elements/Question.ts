import {FormElement} from './FormElement';
export class QuestionOptions {
    rendering: string;
    answers: any;
    concept: string;

}
export class Question extends FormElement {

        id = '';
        type: string;
        questionOptions: QuestionOptions = new QuestionOptions();
        questions: Question[];


    constructor(options: {}= {}) {
        super(options);
        this.type = options['type'] || '';
        this.questionOptions.rendering = options['questionOptions.rendering'] || '';
    }
}
