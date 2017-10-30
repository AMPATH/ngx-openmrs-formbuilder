import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormsWizardModalComponent } from './update-forms-wizard-modal.component';

describe('UpdateFormsWizardModalComponent', () => {
  let component: UpdateFormsWizardModalComponent;
  let fixture: ComponentFixture<UpdateFormsWizardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormsWizardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormsWizardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
