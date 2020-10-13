import { TestBed, inject } from '@angular/core/testing';

import { ElementEditorService } from './element-editor.service';

describe('ElementEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementEditorService]
    });
  });

  it('should be created', inject(
    [ElementEditorService],
    (service: ElementEditorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
