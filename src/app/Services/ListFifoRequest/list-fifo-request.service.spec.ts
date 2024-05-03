import { TestBed } from '@angular/core/testing';

import { ListFifoRequestService } from './list-fifo-request.service';

describe('ListFifoRequestService', () => {
  let service: ListFifoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFifoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
