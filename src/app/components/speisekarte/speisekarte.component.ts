import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

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

  categories = toSignal(this.speisekarteService.getCategories(), { initialValue: [] });

  items = toSignal(
    toObservable(this.category).pipe(
      switchMap((cat) => (cat ? this.speisekarteService.getCategoryItems(cat) : this.speisekarteService.getItems()))
    ),
    { initialValue: [] }
  );

  selectedItem = signal<SpeisekarteItem | null>(null);

  setCategory(category: string | null): void {
    this.category.set(category);
  }

  openDescription(item: SpeisekarteItem): void {
    this.selectedItem.set(item);
  }

  closeDescription(): void {
    this.selectedItem.set(null);
  }
}
