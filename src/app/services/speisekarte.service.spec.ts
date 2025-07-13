import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideSpeisekarteService, SpeisekarteService } from './speisekarte.service';

describe('SpeisekarteService', () => {
  let service: SpeisekarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideSpeisekarteService()],
    });
    service = TestBed.inject(SpeisekarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
