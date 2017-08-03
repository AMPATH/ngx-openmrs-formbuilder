import { TestBed, inject } from '@angular/core/testing';

import { QuestionIdService } from './question-id.service';

describe('QuestionIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionIdService]
    });
  });

  it('should be created', inject([QuestionIdService], (service: QuestionIdService) => {
    expect(service).toBeTruthy();
  }));
});
