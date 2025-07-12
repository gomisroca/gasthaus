import { Component } from '@angular/core';

import { KontaktComponent } from '@/app/components/kontakt/kontakt.component';
import { LandingComponent } from '@/app/components/landing/landing.component';
import { SpeisekarteComponent } from '@/app/components/speisekarte/speisekarte.component';

@Component({
  selector: 'app-home',
  imports: [SpeisekarteComponent, KontaktComponent, LandingComponent],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {}
