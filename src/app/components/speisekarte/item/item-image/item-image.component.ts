import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-image',
  template: `<img
    [src]="imageSrc"
    alt="{{ name }}"
    (error)="onImageError($event)"
    class="h-32 w-32 rounded-xl border-2 border-white/10 object-cover" />`,
})
export class ItemImageComponent {
  @Input() name!: string;
  @Input() image: string | null = null;

  get imageSrc(): string {
    return this.image ?? 'assets/images/placeholder.jpg';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder.jpg';
  }
}
