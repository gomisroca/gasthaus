import { Component, effect, inject, signal } from '@angular/core';

import { SpeisekarteItem } from '../../../../types';
import { SpeisekarteService } from '../../services/speisekarte.service';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-speisekarte',
  imports: [ItemComponent],
  templateUrl: './speisekarte.component.html',
})
export class SpeisekarteComponent {
  private speisekarteService = inject(SpeisekarteService);

  categories = signal<string[]>([]);
  category = signal<string | null>(null);
  readonly items = signal<SpeisekarteItem[]>([]);

  ngOnInit(): void {
    // Fetch categories
    this.speisekarteService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: (err) => console.error('Failed to load categories', err),
    });

    // Fetch all items initially
    this.speisekarteService.getItems().subscribe({
      next: (items) => this.items.set(items),
      error: (err) => console.error('Failed to load items', err),
    });
  }

  readonly effectRef = effect(() => {
    const selected = this.category();
    if (selected) {
      this.speisekarteService.getCategory(selected).subscribe({
        next: (items) => this.items.set(items),
        error: (err) => console.error('Failed to load category items', err),
      });
    } else {
      this.speisekarteService.getItems().subscribe({
        next: (items) => this.items.set(items),
        error: (err) => console.error('Failed to load items', err),
      });
    }
  });

  setCategory(category: string | null) {
    this.category.update(() => category);
  }
}
