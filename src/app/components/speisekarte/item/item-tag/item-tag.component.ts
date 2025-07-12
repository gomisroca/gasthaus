import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, input, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-item-tag',
  imports: [],
  templateUrl: './item-tag.component.html',
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
  expanded = signal(false);
  timeout = signal<NodeJS.Timeout | undefined>(undefined);
  private isBrowser: boolean;

  private onClickOutside = (event: MouseEvent) => {
    if (
      this.expanded() &&
      this.elementRef.nativeElement &&
      !this.elementRef.nativeElement.contains(event.target as Node)
    ) {
      this.expanded.set(false);
    }
  };

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  handleClick() {
    clearTimeout(this.timeout());
    this.expanded.update((expanded) => !expanded);

    const newTimeout = setTimeout(() => {
      this.expanded.set(false);
    }, 5000);
    this.timeout.set(newTimeout);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      document.addEventListener('click', this.onClickOutside, true);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      if (this.timeout()) {
        clearTimeout(this.timeout());
      }
      document.removeEventListener('click', this.onClickOutside, true);
    }
  }
}
