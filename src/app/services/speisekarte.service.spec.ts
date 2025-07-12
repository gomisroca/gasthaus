import { TestBed } from '@angular/core/testing';

import { SpeisekarteService } from './speisekarte.service';

describe('SpeisekarteService', () => {
  let service: SpeisekarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeisekarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
