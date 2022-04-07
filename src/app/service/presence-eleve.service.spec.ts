import { TestBed } from '@angular/core/testing';

import { PresenceEleveService } from './presence-eleve.service';

describe('PresenceEleveService', () => {
  let service: PresenceEleveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresenceEleveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
