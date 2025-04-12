import { Component, input } from '@angular/core';

@Component({
  selector: 'item-tags',
  imports: [],
  templateUrl: './item-tags.component.html',
})
export class ItemTagsComponent {
  tags = input.required<string[]>();

  icons: { [key: string]: string } = {
    vegan: '🌱',
    spicy: '🌶',
    childFriendly: '👶',
  };
}
