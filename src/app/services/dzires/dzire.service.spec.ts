import { TestBed } from '@angular/core/testing';

import { DzireService } from './dzire.service';

describe('DzireService', () => {
  let service: DzireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DzireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
