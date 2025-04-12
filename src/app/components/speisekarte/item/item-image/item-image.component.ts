import { Component, input } from '@angular/core';

@Component({
  selector: 'item-image',
  imports: [],
  templateUrl: './item-image.component.html',
})
export class ItemImageComponent {
  id = input.required<number>();
  name = input.required<string>();
}
