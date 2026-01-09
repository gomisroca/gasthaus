import { Component, EventEmitter, input, Output, signal } from '@angular/core';

import { ItemImageComponent } from '@/app/components/speisekarte/item/item-image/item-image.component';
import { SpeisekarteItem } from '@/types';

@Component({
  selector: 'app-item',
  imports: [ItemImageComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  item = input.required<SpeisekarteItem>();

  showOverlay = signal(false);

  @Output() openDescription = new EventEmitter<SpeisekarteItem>();

  onTap(event: Event) {
    event.stopPropagation();
    this.openDescription.emit(this.item());
  }
}
