import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementEditorComponent } from './element-editor.component';

describe('ElementEditorComponent', () => {
  let component: ElementEditorComponent;
  let fixture: ComponentFixture<ElementEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
