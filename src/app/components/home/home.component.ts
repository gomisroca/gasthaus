import { Component } from '@angular/core';
import { SpeisekarteComponent } from '../speisekarte/speisekarte.component';
import { KontaktComponent } from '../kontakt/kontakt.component';
import { LandingComponent } from '../landing/landing.component';

@Component({
  selector: 'home',
  imports: [SpeisekarteComponent, KontaktComponent, LandingComponent],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {}
