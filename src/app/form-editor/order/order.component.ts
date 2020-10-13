import { Component, OnInit, Input } from '@angular/core';
import { PropertyModel } from '../models/property-model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  question: PropertyModel<any>;
  form: FormGroup;
  @Input() set _question(question: PropertyModel<any>) {
    this.question = question;
  }

  @Input() set _form(form: FormGroup) {
    this.form = form;
  }
  constructor() {}

  ngOnInit() {}
}
