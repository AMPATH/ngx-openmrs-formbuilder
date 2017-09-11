import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormsComponent } from './view-forms.component';

describe('ViewFormsComponent', () => {
  let component: ViewFormsComponent;
  let fixture: ComponentFixture<ViewFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
