import { TestBed, inject } from '@angular/core/testing';

import { FetchFormDetailService } from './fetch-form-detail.service';

describe('FetchFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchFormDetailService]
    });
  });

  it('should be created', inject(
    [FetchFormDetailService],
    (service: FetchFormDetailService) => {
      expect(service).toBeTruthy();
    }
  ));
});
