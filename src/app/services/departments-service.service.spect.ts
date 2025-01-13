import { TestBed } from '@angular/core/testing';

import { DeaprtmentsServiceService } from './departments-service.service';

describe('DeaprtmentsServiceService', () => {
  let service: DeaprtmentsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeaprtmentsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});