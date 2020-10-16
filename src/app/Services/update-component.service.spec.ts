import { TestBed, inject } from '@angular/core/testing';

import { UpdateComponentService } from './update-component.service';

describe('UpdateComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateComponentService]
    });
  });

  it('should be created', inject(
    [UpdateComponentService],
    (service: UpdateComponentService) => {
      expect(service).toBeTruthy();
    }
  ));
});
