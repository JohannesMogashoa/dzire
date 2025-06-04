import { TestBed } from '@angular/core/testing';

import { DzireItemService } from './dzire-item.service';

describe('DzireItemService', () => {
  let service: DzireItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DzireItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
