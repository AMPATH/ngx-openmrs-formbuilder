import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';

@NgModule({
    declarations: [
        TestComponent,
        PatientSearchComponent
    ],
    imports: [ CommonModule ],
    exports: [],
    providers: [],
})
export class TestFormModule {

}
