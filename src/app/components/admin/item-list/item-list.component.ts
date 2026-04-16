import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { SpeisekarteService } from '@/app/services/speisekarte.service';

@Component({
  selector: 'app-item-list',
  imports: [RouterLink],
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  private speisekarteService = inject(SpeisekarteService);

  readonly items = toSignal(this.speisekarteService.getItems(), { initialValue: [] });
  pendingDeleteId = signal<string | null>(null);

  confirmRemove(id: string): void {
    this.pendingDeleteId.set(id);
  }

  cancelRemove(): void {
    this.pendingDeleteId.set(null);
  }

  onRemove(id: string): void {
    this.speisekarteService.deleteItem(id).subscribe({
      next: () => this.pendingDeleteId.set(null),
      error: (err) => console.error('Remove failed:', err),
    });
  }
}
