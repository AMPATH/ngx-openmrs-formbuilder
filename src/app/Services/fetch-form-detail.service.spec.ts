import { TestBed, inject } from '@angular/core/testing';

import { FetchFormsService } from './fetch-form-detail.service';

describe('FetchFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchFormsService]
    });
  });

  it('should be created', inject([FetchFormsService], (service: FetchFormsService) => {
    expect(service).toBeTruthy();
  }));
});
