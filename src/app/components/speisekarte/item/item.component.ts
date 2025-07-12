import { Component, input } from '@angular/core';

import { ItemImageComponent } from '@/app/components/speisekarte/item/item-image/item-image.component';
import { ItemTagComponent } from '@/app/components/speisekarte/item/item-tag/item-tag.component';
import { SpeisekarteItem } from '@/types';

@Component({
  selector: 'app-item',
  imports: [ItemImageComponent, ItemTagComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  item = input.required<SpeisekarteItem>();
}
