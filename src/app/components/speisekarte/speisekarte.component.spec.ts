import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideSpeisekarteService } from '@/app/services/speisekarte.service';

import { SpeisekarteComponent } from './speisekarte.component';

describe('SpeisekarteComponent', () => {
  let component: SpeisekarteComponent;
  let fixture: ComponentFixture<SpeisekarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideSpeisekarteService()],
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
