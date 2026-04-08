import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeisekarteService } from '@/app/services/speisekarte.service';

import { SpeisekarteComponent } from './speisekarte.component';

describe('SpeisekarteComponent', () => {
  let component: SpeisekarteComponent;
  let fixture: ComponentFixture<SpeisekarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), SpeisekarteService],
      imports: [SpeisekarteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeisekarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
