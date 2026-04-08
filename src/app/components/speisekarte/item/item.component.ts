import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { ItemImageComponent } from '@/app/components/speisekarte/item/item-image/item-image.component';
import { SpeisekarteItem } from '@/types';

@Component({
  selector: 'app-item',
  imports: [ItemImageComponent, CurrencyPipe],
  templateUrl: './item.component.html',
  host: {
    class:
      'relative flex h-full cursor-pointer justify-between overflow-hidden rounded-xl text-white shadow-md transition-all duration-300 ease-out hover:z-50 hover:scale-105 hover:shadow-lg',
    '(click)': 'onTap($event)',
  },
})
export class ItemComponent {
  item = input.required<SpeisekarteItem>();
  openDescription = output<SpeisekarteItem>();

  onTap(event: Event): void {
    event.stopPropagation();
    this.openDescription.emit(this.item());
  }
}
