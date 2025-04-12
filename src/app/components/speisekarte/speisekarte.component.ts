import { Component, computed, inject, signal } from '@angular/core';
import { SpeisekarteService } from '../../services/speisekarte.service';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'speisekarte',
  imports: [ItemComponent],
  templateUrl: './speisekarte.component.html',
})
export class SpeisekarteComponent {
  private speisekarteService = inject(SpeisekarteService);
  categories = this.speisekarteService.getCategories();

  category = signal<string>('Saisonal');
  items = computed<
    {
      id: number;
      name: string;
      description: string;
      categories: string[];
      tags: string[];
      price: number;
    }[]
  >(() => this.speisekarteService.getCategory(this.category()));

  setCategory(category: string) {
    this.category.update(() => category);
  }
}
