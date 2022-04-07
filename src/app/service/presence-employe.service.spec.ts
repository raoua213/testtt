import { TestBed } from '@angular/core/testing';

import { PresenceEmployeService } from './presence-employe.service';

describe('PresenceEmployeService', () => {
  let service: PresenceEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresenceEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
