import { TestBed } from '@angular/core/testing';

import { FicheDPService } from './fiche-dp.service';

describe('FicheDPService', () => {
  let service: FicheDPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheDPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
