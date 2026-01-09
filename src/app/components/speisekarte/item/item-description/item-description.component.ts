import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SpeisekarteItem } from '@/types';

import { ItemImageComponent } from '../item-image/item-image.component';
import { ItemTagComponent } from '../item-tag/item-tag.component';

@Component({
  selector: 'app-item-description',
  imports: [ItemImageComponent, ItemTagComponent],
  templateUrl: './item-description.component.html',
})
export class ItemDescriptionComponent {
  @Input({ required: true }) item: SpeisekarteItem | null = null;
  @Output() close = new EventEmitter<void>();

  closeOverlay() {
    this.close.emit();
  }
}
