import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktComponent } from './kontakt.component';

describe('KontaktComponent', () => {
  let component: KontaktComponent;
  let fixture: ComponentFixture<KontaktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KontaktComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KontaktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
