import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpeisekarteService } from './speisekarte.service';

describe('SpeisekarteService', () => {
  let service: SpeisekarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), SpeisekarteService],
    });
    service = TestBed.inject(SpeisekarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
