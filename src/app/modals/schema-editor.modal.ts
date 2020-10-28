import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export interface SchemaEditorModel {
  title: string;
  schema: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'prompt',
  template: `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" (click)="close()">&times;</button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <div class="modal-body">
        <ace-editor
          #editor
          style="height:70vh; width:100%; overflow:auto;"
        ></ace-editor>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .modal-dialog {
        overflow-y: initial !important;
      }
      .modal-body {
        overflow-y: auto;
      }
    `
  ]
})
export class SchemaModalComponent
  extends DialogComponent<SchemaEditorModel, string>
  implements SchemaEditorModel, OnInit {
  title: string;
  schema: string;
  @ViewChild('editor') editor;

  constructor(dialogService: DialogService, private fb: FormBuilder) {
    super(dialogService);
  }

  ngOnInit() {
    this.editor.getEditor().setOptions({
      printMargin: false,
      readOnly: true
    });
    this.editor.setTheme('chrome');
    this.editor.setMode('json');
    this.editor.getEditor().setFontSize(16);
    this.editor.setText(this.schema);
    this.editor.getEditor().scrollToLine(0);
  }
}
