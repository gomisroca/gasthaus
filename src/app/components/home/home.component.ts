import { Component } from '@angular/core';

import { KontaktComponent } from '../kontakt/kontakt.component';
import { LandingComponent } from '../landing/landing.component';
import { SpeisekarteComponent } from '../speisekarte/speisekarte.component';

@Component({
  selector: 'app-home',
  imports: [SpeisekarteComponent, KontaktComponent, LandingComponent],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {}
