import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reference-forms',
  templateUrl: './reference-forms.component.html',
  styleUrls: ['./reference-forms.component.css']
})
export class ReferenceFormsComponent implements OnInit {
  private _schema:any;
  @Input() set schema(schema){
    this._schema = schema;
  }
  constructor() { }

  ngOnInit() {
  }

}
