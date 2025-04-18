import { Component, signal } from '@angular/core';
import { SpeisekarteComponent } from './speisekarte/speisekarte.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'root',
  imports: [SpeisekarteComponent, KontaktComponent, LandingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'gasthaus';
}
