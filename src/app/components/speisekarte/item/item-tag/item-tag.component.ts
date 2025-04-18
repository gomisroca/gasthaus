import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';

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
  timeout = signal<NodeJS.Timeout | undefined>(undefined);
  private isBrowser: boolean;

  private onClickOutside = (event: MouseEvent) => {
    if (
      this.expanded() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.expanded.set(false);
    }
  };

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
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
