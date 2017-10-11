import { Component, OnInit, Input } from '@angular/core';
import { Form, FormFactory } from 'ng2-openmrs-formentry';
import { NavigatorService } from '../../Services/navigator.service'
@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnInit {

  private _schema:any;
  form:Form;


  constructor(private fc: FormFactory, private ns: NavigatorService) { }

  @Input()
  set schema(schema:any){
    this._schema = schema;
    console.log("Got new schema");
    this.form = this.fc.createForm(this._schema,{});
    
  }
  

  ngOnInit() {

      this.ns.getSchema().subscribe(res => {
        this._schema = res;
        console.log("Got new schema");
        this.form = this.fc.createForm(this._schema,{});
      })
  }


}
