import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceFormsComponent } from './reference-forms.component';

describe('ReferenceFormsComponent', () => {
  let component: ReferenceFormsComponent;
  let fixture: ComponentFixture<ReferenceFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceFormsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
