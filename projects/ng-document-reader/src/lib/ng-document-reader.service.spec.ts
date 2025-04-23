import { TestBed } from '@angular/core/testing';

import { NgDocumentReaderService } from './ng-document-reader.service';

describe('NgDocumentReaderService', () => {
  let service: NgDocumentReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgDocumentReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
