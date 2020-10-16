import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildVersionFooterComponent } from './build-version-footer.component';

describe('BuildVersionFooterComponent', () => {
  let component: BuildVersionFooterComponent;
  let fixture: ComponentFixture<BuildVersionFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuildVersionFooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildVersionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
