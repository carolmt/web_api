import { TestBed } from '@angular/core/testing';

import { FifoRequestService } from './fifo-request.service';

describe('FifoRequestService', () => {
  let service: FifoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FifoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
