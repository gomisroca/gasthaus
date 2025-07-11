import { Component, input } from '@angular/core';

import { SpeisekarteItem } from '../../../../../types';
import { ItemImageComponent } from './item-image/item-image.component';
import { ItemTagComponent } from './item-tag/item-tag.component';

@Component({
  selector: 'app-item',
  imports: [ItemImageComponent, ItemTagComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  item = input.required<SpeisekarteItem>();
}
