import { Component, effect, inject, signal } from '@angular/core';
import { SpeisekarteService } from '../../services/speisekarte.service';
import { ItemComponent } from './item/item.component';
import { SpeisekarteItem } from '../../../../types';

@Component({
  selector: 'speisekarte',
  imports: [ItemComponent],
  templateUrl: './speisekarte.component.html',
})
export class SpeisekarteComponent {
  private speisekarteService = inject(SpeisekarteService);

  categories = signal<string[]>([]); // signal holding string array

  constructor() {
    this.speisekarteService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  category = signal<string>('Saisonal');

  readonly items = signal<SpeisekarteItem[]>([]);

  readonly effectRef = effect(() => {
    const category = this.category();
    this.speisekarteService.getCategory(category).subscribe((items) => {
      this.items.set(items);
    });
  });

  setCategory(category: string) {
    this.category.update(() => category);
  }
}
