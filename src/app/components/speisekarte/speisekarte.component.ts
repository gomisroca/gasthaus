import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { shareReplay, startWith, switchMap } from 'rxjs';

import { SpeisekarteService } from '@/app/services/speisekarte.service';
import { SpeisekarteItem } from '@/types';

import { ItemComponent } from './item/item.component';
import { ItemDescriptionComponent } from './item/item-description/item-description.component';

@Component({
  selector: 'app-speisekarte',
  imports: [ItemComponent, ItemDescriptionComponent],
  templateUrl: './speisekarte.component.html',
})
export class SpeisekarteComponent {
  private speisekarteService = inject(SpeisekarteService);

  category = signal<string | null>(null);

  categories = toSignal(this.speisekarteService.getCategories().pipe(shareReplay(1)), { initialValue: [] });

  items = toSignal(
    toObservable(this.category).pipe(
      startWith(null), // emit null first to load all items
      switchMap((cat) =>
        cat
          ? this.speisekarteService.getCategoryItems(cat).pipe(shareReplay(1))
          : this.speisekarteService.getItems().pipe(shareReplay(1))
      )
    ),
    { initialValue: [] }
  );

  selectedItem = signal<SpeisekarteItem | null>(null);

  setCategory(category: string | null) {
    this.category.set(category);
  }

  openDescription(item: SpeisekarteItem) {
    this.selectedItem.set(item);
  }

  closeDescription() {
    this.selectedItem.set(null);
  }
}
