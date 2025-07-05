import { Component, inject, signal } from '@angular/core';
import { SpeisekarteService } from '../../../services/speisekarte.service';
import { SpeisekarteItem } from '../../../../../types';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  private speisekarteService = inject(SpeisekarteService);

  readonly items = signal<SpeisekarteItem[]>([]);

  ngOnInit(): void {
    this.speisekarteService.getItems().subscribe({
      next: (items) => this.items.set(items),
      error: (err) => console.error('Failed to load items', err),
    });
  }
}
