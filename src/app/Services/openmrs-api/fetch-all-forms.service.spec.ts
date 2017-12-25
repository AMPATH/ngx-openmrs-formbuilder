import { TestBed, inject } from '@angular/core/testing';

import { FetchAllFormsService } from './fetch-all-forms.service';

describe('FetchAllFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchAllFormsService]
    });
  });

  it('should be created', inject([FetchAllFormsService], (service: FetchAllFormsService) => {
    expect(service).toBeTruthy();
  }));
});
