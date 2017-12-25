import { TestBed, inject } from '@angular/core/testing';

import { EncounterTypeService } from './encounter-type.service';

describe('EncounterTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncounterTypeService]
    });
  });

  it('should be created', inject([EncounterTypeService], (service: EncounterTypeService) => {
    expect(service).toBeTruthy();
  }));
});
