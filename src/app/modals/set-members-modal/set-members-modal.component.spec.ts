import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMembersModalComponent } from './set-members-modal.component';

describe('SetMembersModalComponent', () => {
  let component: SetMembersModalComponent;
  let fixture: ComponentFixture<SetMembersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetMembersModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
