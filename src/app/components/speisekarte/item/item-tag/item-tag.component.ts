import { Component, ElementRef, input, signal } from '@angular/core';

@Component({
  selector: 'item-tag',
  imports: [],
  templateUrl: './item-tag.component.html',
})
export class ItemTagComponent {
  tagData: {
    [key: string]: {
      icon: string;
      text: string;
    };
  } = {
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
  expanded = signal(false);

  private onClickOutside = (event: MouseEvent) => {
    if (
      this.expanded() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.expanded.set(false);
    }
  };

  constructor(private elementRef: ElementRef) {}

  handleClick() {
    this.expanded.update((expanded) => !expanded);
  }

  ngAfterViewInit() {
    document.addEventListener('click', this.onClickOutside, true);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside, true);
  }
}
