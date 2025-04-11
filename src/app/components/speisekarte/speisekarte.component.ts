import { Component, inject } from '@angular/core';
import { SpeisekarteService } from '../../services/speisekarte.service';

@Component({
  selector: 'speisekarte',
  imports: [],
  templateUrl: './speisekarte.component.html',
})
export class SpeisekarteComponent {
  private speisekarteService = inject(SpeisekarteService);
  speisekarte = this.speisekarteService.getData();
}
