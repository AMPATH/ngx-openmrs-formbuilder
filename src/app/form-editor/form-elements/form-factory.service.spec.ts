import { TestBed, inject } from '@angular/core/testing';

import { FormFactory } from './form-factory.service';

describe('FormFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormFactory]
    });
  });

  it('should be created', inject([FormFactory], (service: FormFactory) => {
    expect(service).toBeTruthy();
  }));
});
