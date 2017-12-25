import { TestBed, inject } from '@angular/core/testing';

import { SaveFormsGuardService } from './save-forms-guard.service';

describe('SaveFormsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveFormsGuardService]
    });
  });

  it('should be created', inject([SaveFormsGuardService], (service: SaveFormsGuardService) => {
    expect(service).toBeTruthy();
  }));
});
