import { Component, input } from '@angular/core';
import { ItemImageComponent } from './item-image/item-image.component';
import { ItemTagComponent } from './item-tag/item-tag.component';

@Component({
  selector: 'item',
  imports: [ItemImageComponent, ItemTagComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  item = input.required<{
    id: number;
    name: string;
    description: string;
    categories: string[];
    tags: string[];
    price: number;
  }>();
}
