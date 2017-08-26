import { TestBed, inject } from '@angular/core/testing';
<<<<<<< HEAD
=======

>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
import { ConceptService } from './concept.service';

describe('ConceptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConceptService]
    });
  });

  it('should be created', inject([ConceptService], (service: ConceptService) => {
    expect(service).toBeTruthy();
  }));
});
