import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { startWith, switchMap } from 'rxjs';

import { SpeisekarteService } from '@/app/services/speisekarte.service';

import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-speisekarte',
  imports: [ItemComponent],
  templateUrl: './speisekarte.component.html',
})
export class SpeisekarteComponent {
  private speisekarteService = inject(SpeisekarteService);

  category = signal<string | null>(null);

  categories = toSignal(this.speisekarteService.getCategories(), { initialValue: [] }); // Load categories on startup, then update when they change

  items = toSignal(
    toObservable(this.category).pipe(
      startWith(null), // Load all items on startup
      switchMap((cat) => (cat ? this.speisekarteService.getCategoryItems(cat) : this.speisekarteService.getItems())) // If category is set, load items for that category, otherwise load all items
    ),
    { initialValue: [] }
  );

  setCategory(category: string | null) {
    this.category.set(category);
  }
}
