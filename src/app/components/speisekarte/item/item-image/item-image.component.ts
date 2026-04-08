import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-item-image',
  template: `<img
    [src]="imageSrc()"
    [alt]="name()"
    (error)="onImageError($event)"
    class="rounded-xl object-contain" />`,
})
export class ItemImageComponent {
  name = input.required<string>();
  image = input<string | null>(null);

  private readonly placeholder = 'assets/images/placeholder.jpg';

  imageSrc = computed(() => this.image() ?? this.placeholder);

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.placeholder;
  }
}
