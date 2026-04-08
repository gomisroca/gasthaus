import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { SpeisekarteItem } from '@/types';

import { ItemImageComponent } from '../item-image/item-image.component';
import { ItemTagComponent } from '../item-tag/item-tag.component';

@Component({
  selector: 'app-item-description',
  imports: [ItemImageComponent, ItemTagComponent, CurrencyPipe],
  templateUrl: './item-description.component.html',
})
export class ItemDescriptionComponent {
  item = input<SpeisekarteItem | null>(null);
  close = output<void>();

  closeOverlay(): void {
    this.close.emit();
  }

  capitalize(value: string): string {
    return value.charAt(0).toLocaleUpperCase() + value.slice(1);
  }
}
