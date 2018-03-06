import { Component, OnInit, Input } from '@angular/core';
import { Form, FormFactory, QuestionFactory, EncounterAdapter, DataSources, FormErrorsService } from 'ng2-openmrs-formentry';
import { NavigatorService } from '../../Services/navigator.service';
import { FetchFormDetailService } from '../../Services/openmrs-api/fetch-form-detail.service';
import { Observable, Subject } from 'rxjs';
import { MockDataSourceService } from './mock-data-source.service';
import { EncounterService } from '../../Services/openmrs-api/encounters.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { EncounterModalDetailsComponent } from '../../modals/encounter-details.modal';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from '../../modals/confirm.component';
import { EncounterViewerModalComponent } from '../../modals/encounter-viewer-modal';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css'],
  providers: [MockDataSourceService, EncounterService]
})

export class FormRendererComponent implements OnInit {

  private _schema: any;
  form: Form;
  // encounter = new MockObs();


  constructor(private fc: FormFactory,
              private dialogService: DialogService,
              private ns: NavigatorService,
              private encAdapter: EncounterAdapter,
              private dataSources: DataSources,
              private formErrorService: FormErrorsService,
              private fetchAllForms: FetchFormDetailService,
              private route: ActivatedRoute,
              private encounterService: EncounterService,
              private mockDataSourceService: MockDataSourceService
          ) { }

  @Input()
  set schema(schema: any){
    this._schema = schema;
    this.form = this.fc.createForm(this._schema, {});
  }

  ngOnInit() {

    this.wireDataSources();

    this.ns.getSchema().subscribe(res => {
        this._schema = res;
        this.form = this.fc.createForm(this._schema, this.dataSources);
      });
  }

  wireDataSources() {
    this.dataSources.registerDataSource('drug',
        { searchOptions: this.mockDataSourceService.sampleSearch, resolveSelectedValue: this.mockDataSourceService.sampleResolve });
    this.dataSources.registerDataSource('personAttribute',
        { searchOptions: this.mockDataSourceService.sampleSearch, resolveSelectedValue: this.mockDataSourceService.sampleResolve });
    this.dataSources.registerDataSource('problem',
        { searchOptions: this.mockDataSourceService.sampleSearch, resolveSelectedValue: this.mockDataSourceService.sampleResolve });
    this.dataSources.registerDataSource('location',
        { searchOptions: this.mockDataSourceService.sampleSearch, resolveSelectedValue: this.mockDataSourceService.sampleResolve });
    this.dataSources.registerDataSource('provider',
{ searchOptions: this.mockDataSourceService.sampleProviderSearch, resolveSelectedValue: this.mockDataSourceService.sampleProviderResolve });
  }

  submitForm($event) {
          let formuuid = '';
          let encounterType = '';
          this.route.params.flatMap((routeParams) => {
            formuuid = routeParams['uuid'];
            return Observable.fromPromise(this.fetchAllForms.fetchFormMetadata(formuuid, true));
          })
          .flatMap((form) => {
            encounterType = form.encounterType.uuid;
            return this.showDialog(EncounterModalDetailsComponent);
          })
          .subscribe((results: any) => {
            if (results) {
                    $event.preventDefault();
                    this.form.valueProcessingInfo = {
                    patientUuid: results.patient,
                    locationUuid: results.location,
                    formUuid: formuuid,
                    encounterDatetime: new Date(Date.now()).toISOString(),
                    encounterTypeUuid: encounterType,
          };

          if (this.form.valid) {
              this.form.showErrors = false;
              const payload: any = this.encAdapter.generateFormPayload(this.form);
              this.saveEncounter(payload);
          } else {
              this.form.showErrors = true;
              this.form.markInvalidControls(this.form.rootNode);
          }
        }});
  }


  showDialog(component, data?) {
    return this.dialogService.addDialog(component, data, {backdropColor: 'rgba(0,0,0,0.5)'});
  }

  saveEncounter(payload: any) {
    let encounterUuid;
    this.encounterService.saveEncounter(payload).flatMap((result) => {
      encounterUuid = result.uuid;
      return this.showDialog(ConfirmComponent,
        {title: 'Encounter Saved Successfully',
        message: 'Would you like to view the obs generated?',
        buttonText: 'Yes',
        cancelButtonText: 'No, Thanks.'});
    })
    .subscribe((confirm) => {
      if (confirm) {
        this.encounterService.getEncounterByUuid(encounterUuid).subscribe((res) => {
          const form = this.fc.createForm(this._schema);
          this.encAdapter.populateForm(form, res);
          console.log(res.obs);
          this.showDialog(EncounterViewerModalComponent, {encounter: res, form: form });
        });
      } else {
        return 0;
      }
    });
  }

  setProviderUuid(form: Form, providerUuid) {
    form.valueProcessingInfo.providerUuid = null;
    return form;
  }




}
