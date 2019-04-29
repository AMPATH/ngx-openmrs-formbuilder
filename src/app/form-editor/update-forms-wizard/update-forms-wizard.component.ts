import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UpdateComponentService } from '../../Services/update-component.service';
import { NavigatorService} from '../../Services/navigator.service';
import { FetchFormDetailService } from '../../Services/openmrs-api/fetch-form-detail.service';
import { FormSchemaCompiler } from '../../Services/schema-compiler.service';
import { SaveFormService } from '../../Services/openmrs-api/save-form.service';
import { Node, LinkedList } from '../../collections/linked-list';
import { FormListService } from '../../Services/form-list.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-forms-wizard',
  templateUrl: './update-forms-wizard.component.html',
  styleUrls: ['./update-forms-wizard.component.css'],

})
export class UpdateFormsWizardComponent implements OnInit {


  schemaMetadatas: any = [];
  componentSchema: any;
  componentMetadata: any;
  oldComponentUUID: any;
  currentCompiledSchema: any;
  currentRawSchema: any;
  currentSchemaMetadata: any;
  list: LinkedList = new LinkedList();
  head: Node;
  errorMessage: string;
  loading: boolean;
  currentNode: Node;
  @Input() set _newComponentMetadata(data) {
    console.log(data);
    this.componentMetadata = data;
  } // for the new component form
  @Input() set _selectedForms(data) {
    this.schemaMetadatas = data;
  }
  @Input() set _oldComponentMetadata(data) {
    this.oldComponentUUID = data;
  }
  @Output() finished: EventEmitter < boolean > = new EventEmitter();
  constructor(
    private updateComponentService: UpdateComponentService,
    private saveFormService: SaveFormService,
    private snackbar: MatSnackBar,
    private fetchFormDetailService: FetchFormDetailService,
    private ns: NavigatorService, compiler: FormSchemaCompiler,
    private formListService: FormListService,
    private route: ActivatedRoute) {}


  ngOnInit() {
    this.ns.getRawSchema().subscribe((rawSchema) => {
      if (!_.isEmpty(rawSchema)) {
        this.currentRawSchema = rawSchema;
      }});

    _.forEach(this.schemaMetadatas, (formMetadata) => {
      this.list.append(formMetadata);
    });
    this.head = this.list.head;
    this.currentNode = this.list.head;
    this.fetchSchema(this.head);
    console.log(this.currentNode);

  }

  fetchSchema(node: Node) {
    this.currentRawSchema = undefined;
    this.errorMessage = undefined;
    this.loading = true;
    this.fetchFormDetailService.fetchForm(node.formMetadata.resources[0].valueReference, false).then((compiledSchema) => {
      this.loading = true;
      this.fetchFormDetailService.fetchForm(node.formMetadata.resources[0].valueReference, true).then((rawSchema) => {
          this.currentSchemaMetadata = node.formMetadata;
          this.replaceOldComponent(rawSchema, this.oldComponentUUID, this.componentMetadata);
          this.currentCompiledSchema = compiledSchema;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.displayErrorMessage();
        });
    });
  }

  fetchNextSchema(newVersion) {
    this.errorMessage = undefined;
    if (newVersion) {  this.saveForm(this.currentRawSchema, this.currentNode.formMetadata, newVersion); }
    this.currentNode = this.currentNode.next;
    this.fetchSchema(this.currentNode);
  }

  fetchPreviousSchema() {
    this.currentNode = this.currentNode.previous;
    this.fetchSchema(this.currentNode);
  }

  replaceOldComponent(schema: any, oldComponentUUID: string, newComponentMetadata: any) {
    _.each(schema.referencedForms, (refForm: any) => {
      if (refForm.ref.uuid === oldComponentUUID) {
        refForm.ref.uuid = newComponentMetadata.uuid;
        refForm.formName = newComponentMetadata.name;
      }});
    this.fetchFormDetailService.setReferencedFormsDetails(schema.referencedForms);
    this.fetchFormDetailService.fetchReferencedFormSchemas(schema.referencedForms)
    .then((schemas) => {
      this.fetchFormDetailService.setReferencedFormsSchemasArray(schemas);
      this.currentRawSchema = schema;
      this.ns.setRawSchema(this.currentRawSchema);
    })
    .catch((error) => {
      this.loading = false;
      this.displayErrorMessage();
      console.log(error);
    });
  }

  saveForm(schema: any, metadata: any, newVersion: number) {
    const strNewVersion = newVersion.toString();
    const form = metadata;
    let newName = this.formListService.removeVersionInformation(form.name);
    newName = newName + ' v' + newVersion;
    this.saveFormService.uploadSchema(schema).subscribe(valueReference => {
      console.log(valueReference);
      this.saveFormService.saveNewForm(newName, strNewVersion, false, form.description).subscribe(createdForm => {
        const parsedRes = JSON.parse(createdForm._body);
        this.saveFormService.getResourceUUID(parsedRes.uuid, valueReference).subscribe(resourceUUID =>
          this.showDoneSnackBar(newName));
      });
    });
  }

  showDoneSnackBar(name) {
    this.snackbar.open('Updated ' + name, '', {
      duration: 1200
    });
  }

  done(newVersion) {
    this.ns.getRawSchema().subscribe((rawSchema) => {
      this.saveForm(rawSchema, this.currentNode.formMetadata, newVersion);
      console.log('done');
      this.finished.emit(true);
    });
  }

  displayErrorMessage() {
    this.errorMessage = ' This form is broken. Click next to move to the next form. ';
  }
}

