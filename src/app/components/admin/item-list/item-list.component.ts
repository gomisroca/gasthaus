import { Component, inject, signal } from '@angular/core';

import { type SpeisekarteItem } from '../../../../../types';
import { SpeisekarteService } from '../../../services/speisekarte.service';

@Component({
  selector: 'app-item-list',
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

  onRemove(id: string) {
    const confirmed = confirm('Are you sure you want to remove this item?');
    if (!confirmed) return;
    this.speisekarteService.deleteItem(id).subscribe({
      next: () => {
        alert('Item removed!');
        const currentItems = this.items();
        const updatedItems = currentItems.filter((item) => item.id !== id);
        this.items.set(updatedItems);
      },
      error: (err) => console.error('Remove failed:', err),
    });
  }
}
