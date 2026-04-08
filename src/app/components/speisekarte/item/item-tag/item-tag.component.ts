import { Component, input } from '@angular/core';

const TAG_DATA: Record<string, { icon: string; text: string }> = {
  vegan: { icon: '🌱', text: 'Vegan' },
  spicy: { icon: '🌶', text: 'Scharf' },
  childFriendly: { icon: '👶', text: 'Kinderfreundlich' },
  gluten: { icon: '🌾', text: 'Gluten' },
  lactose: { icon: '🥛', text: 'Lactose' },
};

@Component({
  selector: 'app-item-tag',
  template: `<li>
    <span aria-hidden="true">{{ getTag(tag()).icon }}</span>
    <span>{{ getTag(tag()).text }}</span>
  </li>`,
})
export class ItemTagComponent {
  tag = input.required<string>();

  getTag(tag: string): { icon: string; text: string } {
    return TAG_DATA[tag] ?? { icon: '❓', text: tag };
  }
}
