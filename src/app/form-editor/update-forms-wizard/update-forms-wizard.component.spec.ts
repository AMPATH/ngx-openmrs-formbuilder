import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormsWizardComponent } from './update-forms-wizard.component';

describe('UpdateFormsWizardComponent', () => {
  let component: UpdateFormsWizardComponent;
  let fixture: ComponentFixture<UpdateFormsWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormsWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
