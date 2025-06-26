import { Component, input } from '@angular/core';
import { ItemImageComponent } from './item-image/item-image.component';
import { ItemTagComponent } from './item-tag/item-tag.component';
import { SpeisekarteItem } from '../../../../../types';

@Component({
  selector: 'item',
  imports: [ItemImageComponent, ItemTagComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  item = input.required<SpeisekarteItem>();
}
