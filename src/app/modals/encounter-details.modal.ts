import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { PatientResourceService } from '../Services/openmrs-api/patient-resource.service';
import { LocationResourceService } from '../Services/openmrs-api/location-resource.service';
import * as _ from 'lodash';
@Component({
    selector: 'app-modals',
    template: `<div class="modal-dialog" >
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Select Encounter Details</h4>
                   </div>
                   <div class="modal-body">
                   <div *ngIf="!patients" class="text-center">
                        <i class="fa fa-spinner fa-spin"></i>
                   </div>
                   <div *ngIf="patients">
                   <form #form="ngForm" (ngSubmit)="submit()">
                     <div class="form-group">
                     <div style="margin-bottom: 25px">
                     <label> Select Patient </label>
                     <input [typeahead]="patients" typeaheadOptionField="display" class="form-control" placeholder="Enter test patient name"
                     name="patient" (typeaheadOnSelect)="onSelectPatient($event)" ngModel required autocomplete="off" autofocus required>
                     </div>
                     </div>

                     <button type="submit" class="btn btn-success" [disabled]="!form.valid">Submit Form
                     <span class="fa fa-chevron-right"></span></button>
                    </form>
                    </div>
                   </div>
              </div>
              </div>`,
    providers: [PatientResourceService,
                LocationResourceService]
})

export class EncounterModalDetailsComponent extends DialogComponent<any, any> {
    patients: any;
    form: any = {patient: '', location: ''};
    constructor(dialogService: DialogService,
        private patientResourceService: PatientResourceService,
        private locationResourceService: LocationResourceService) {
        super(dialogService);
    }

    public ngOnInit() {

        this.patientResourceService.searchPatientByName('test').subscribe((patients) => {
            const p = _.filter((patients.results), (patient) => !_.isEmpty(patient));
            this.patients = p;

        });
     }

    public onSelectPatient($patient) {
        console.log($patient);
        this.form.patient = $patient.item.uuid;
    }

    public onSelectLocation($location) {
            console.log($location);
             this.form.location = $location.item.uuid;
    }

    public submit() {
        this.result = this.form;
        this.close();
    }
}
