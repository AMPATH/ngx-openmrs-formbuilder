import { TestBed, inject } from '@angular/core/testing';

import { FormElementFactory } from './form-element-factory';

describe('FormElementFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormElementFactory]
    });
  });

  it('should be created', inject([FormElementFactory], (service: FormElementFactory) => {
    expect(service).toBeTruthy();
  }));
});
