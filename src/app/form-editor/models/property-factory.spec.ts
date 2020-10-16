import { TestBed, inject } from '@angular/core/testing';

import { PropertyFactory } from './property-factory';

describe('PropertyFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyFactory]
    });
  });

  it('should be created', inject(
    [PropertyFactory],
    (service: PropertyFactory) => {
      expect(service).toBeTruthy();
    }
  ));
});
