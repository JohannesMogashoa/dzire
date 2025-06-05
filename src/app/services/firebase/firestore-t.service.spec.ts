import { TestBed } from '@angular/core/testing';

import { FirestoreTService } from './firestore-t.service';

describe('FirestoreTService', () => {
  let service: FirestoreTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
