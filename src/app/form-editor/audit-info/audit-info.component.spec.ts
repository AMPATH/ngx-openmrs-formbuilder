import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditInfoComponent } from './audit-info.component';

describe('AuditInfoComponent', () => {
  let component: AuditInfoComponent;
  let fixture: ComponentFixture<AuditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
