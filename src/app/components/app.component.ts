import { Component, signal } from '@angular/core';
import { SpeisekarteComponent } from './speisekarte/speisekarte.component';
import { KontaktComponent } from './kontakt/kontakt.component';

@Component({
  selector: 'root',
  imports: [SpeisekarteComponent, KontaktComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'gasthaus';
  firstName = signal('John');

  onClick() {
    this.firstName.update((name) => name.toUpperCase());
  }
}
