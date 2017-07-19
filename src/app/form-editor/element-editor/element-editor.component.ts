import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.css']
})
export class ElementEditorComponent implements OnInit {

  @Input() schema:any;

  constructor() { }

  ngOnInit() {
  }

}
