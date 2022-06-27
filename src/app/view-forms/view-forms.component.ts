import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FetchAllFormsService } from '../Services/openmrs-api/fetch-all-forms.service';
import { FetchFormDetailService } from '../Services/openmrs-api/fetch-form-detail.service';
import { AuthenticationService } from '../Services/authentication/authentication.service';
import { LocalStorageService } from '../Services/storage/local-storage.service';
import { SessionStorageService } from '../Services/storage/session-storage.service';
import { Router } from '@angular/router';
import { Constants } from '../Services/constants';
import { FormListService } from '../Services/form-list.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css']
})
export class ViewFormsComponent implements OnInit {
  forms = [];
  componentForms: any;
  POCForms = [];
  page = 1; // pagination
  loggingOut = false;
  searchValue = '';
  draftAvailable = false;
  draft: any;
  rawDraft: any;
  formsWithoutSchemas: any[] = [];
  subscription: Subscription;
  draftForm = '';
  username: string;
  fullName: string;
  searchFilter: string;
  isMenuExpanded = false;
  isLoadingForms = false;
  dateDraftWasLastOpened: Date;
  constructor(
    private fetchAllFormsService: FetchAllFormsService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private fetchFormDetailService: FetchFormDetailService,
    private auth: AuthenticationService,
    private ls: LocalStorageService,
    private formListService: FormListService
  ) {
    const user = sessionStorageService.getObject('user');
    this.username = user.username;
    this.fullName = user.person.display;
  }

  ngOnInit() {
    // this.subscription = this.fetchAllFormsService.resaveAllPOCSchemasToLocalStorage.subscribe((res) => {
    //   if (res) {
    //     this.fetchAllFormSchemas(this.POCForms);
    //   }
    // });

    this.fetchPOCForms();

    if (
      this.ls.getObject(Constants.RAW_SCHEMA) &&
      this.ls.getObject(Constants.SCHEMA)
    ) {
      this.draftAvailable = true;
      const schema = this.ls.getObject(Constants.RAW_SCHEMA);
      let timestamp;
      if (this.ls.getObject(Constants.TIME_STAMP)) {
        timestamp = this.ls.getObject(Constants.TIME_STAMP);
      }

      this.dateDraftWasLastOpened = new Date(parseInt(timestamp, 10));

      this.draftForm = this.ls.getObject(Constants.FORM_METADATA).name;
    }
  }

  editForm(form: any, uuid: string) {
    if (_.includes(this.componentForms, form)) {
      this.fetchAllFormsService.setFormType(Constants.COMPONENT);
    } else {
      this.fetchAllFormsService.setFormType(Constants.POC);
    }
    this.router.navigate(['/edit', uuid]);
  }

  createNew() {
    this.router.navigate(['/edit', 'new']);
  }

  logout() {
    this.loggingOut = true;
    this.auth
      .logOut()
      .pipe(catchError((e) => this.router.navigate(['/login'])))
      .subscribe((res) => {
        this.router.navigate(['/login']);
      });
  }

  discard() {
    this.draftAvailable = false;
    this.ls.remove(Constants.SCHEMA);
    this.ls.remove(Constants.RAW_SCHEMA);
    this.ls.remove(Constants.FORM_METADATA);
  }

  restore() {
    this.draft = this.ls.getObject(Constants.SCHEMA);
    this.router.navigate(['/edit', 'restoredForm']);
  }

  onChange($event) {
    if ($event === 'Component Forms') {
      this.fetchComponentForms();
    } else {
      this.fetchPOCForms();
    }
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  fetchPOCForms() {
    this.isLoadingForms = true;
    this.subscription = this.fetchAllFormsService
      .fetchAllPOCForms()
      .subscribe((forms) => {
        const f = forms.results;
        f.forEach((form, index) => {
          this.fetchFormDetailService
            .fetchFormMetadata(form.uuid, false)
            .then((res) => {
              if (!form.resources[0] || form.resources.length === 0) {
                this.formsWithoutSchemas.push(form.name);
              } else {
                this.POCForms.push(form);
              }
            });
        });
        this.isLoadingForms = false;
        this.POCForms = _.cloneDeep(f);
        this.forms = _.cloneDeep(f);

        // this.fetchAllFormSchemas(this.POCForms);
      });
  }

  fetchComponentForms() {
    this.subscription = this.fetchAllFormsService
      .fetchAllComponentForms()
      .subscribe((forms) => {
        this.forms = forms.results;
      });
  }

  // fetchAllFormSchemas(POCForms) {
  //     const date = new Date().getTime();
  //     let count = 0;
  //     const schemas = [];
  //     const numberOfPOCForms = POCForms.length;
  //     const $forms = _.cloneDeep(POCForms);
  //     if (this.ls.getObject('POC_FORM_SCHEMAS')) {
  //       this.ls.setObject('POC_FORM_SCHEMAS', []);
  //     }
  //     _.forEach(($forms), (formMetadata: any, index: number, form) => {
  //       if (formMetadata.resources.length > 0 && formMetadata.resources[0].valueReference) {
  //         this.fetchFormDetailService.fetchForm(formMetadata.resources[0].valueReference, true).then((schema) => {
  //           count = index;
  //           schemas.push({
  //             schema: schema,
  //             metadata: formMetadata
  //           });
  //           if (count === numberOfPOCForms - 1) {
  //             // this.fetchAllFormsService.setAllPOCFormSchemas(schemas);
  //             this.ls.setObject('POC_FORM_SCHEMAS', schemas);
  //             this.fetchAllFormsService.setPOCFormSchemas(schemas);
  //             const finishTime = (new Date().getTime() - date) / 1000;
  //             console.log('Done fetching schemas. Took ' + finishTime + 'seconds');
  //           }
  //         });
  //       }
  //     });

  //  }

  addSchema(form) {
    this.router.navigate(['/edit', form.uuid]);
  }

  download(valueReference) {
    this.fetchFormDetailService
      .fetchForm(valueReference, true)
      .then((schema) => {
        const blob = new Blob([JSON.stringify(schema, null, '\t')], {
          type: 'application/json'
        });
        saveAs(blob, `${schema.name}.json`);
      });
  }

  navigateToTestPage() {
    this.router.navigate(['/test']);
  }
}
