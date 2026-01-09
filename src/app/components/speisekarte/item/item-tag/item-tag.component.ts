import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-tag',
  imports: [],
  template: `<li>
    {{ tagData[tag()].icon }}
    {{ tagData[tag()].text }}
  </li>`,
})
export class ItemTagComponent {
  tagData: Record<
    string,
    {
      icon: string;
      text: string;
    }
  > = {
    vegan: {
      icon: '🌱',
      text: 'Vegan',
    },
    spicy: {
      icon: '🌶',
      text: 'Scharf',
    },
    childFriendly: {
      icon: '👶',
      text: 'Kinderfreundlich',
    },
    gluten: {
      icon: '🌾',
      text: 'Gluten',
    },
    lactose: {
      icon: '🥛',
      text: 'Lactose',
    },
  };
  tag = input.required<string>();
}
