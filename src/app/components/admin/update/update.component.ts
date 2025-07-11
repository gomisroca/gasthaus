import { Component, inject, signal } from '@angular/core';
import { type FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, type Router } from '@angular/router';

import { type SpeisekarteItem } from '../../../../../types';
import { type NewSpeisekarteItem, type SpeisekarteService } from '../../../services/speisekarte.service';

@Component({
  selector: 'app-update-item',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './update.component.html',
})
export class UpdateComponent {
  private activatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  id = signal<string>('');
  readonly item = signal<SpeisekarteItem>({
    id: '',
    name: '',
    description: '',
    price: 0,
    categories: [],
    tags: [],
    seasonal: false,
    image: null,
  });

  constructor(
    private fb: FormBuilder,
    private service: SpeisekarteService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id.set(params['id'] as string);
    });

    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      categories: [[] as string[]],
      tags: [[] as string[]],
      seasonal: [false],
      image: [null],
      currentImage: [''],
    });
  }

  ngOnInit(): void {
    // Fetch item data
    this.service.getUniqueItem(this.id()).subscribe({
      next: (item) => {
        this.item.set(item);
        this.form.patchValue({
          ...item,
          currentImage: item.image,
        });
      },
      error: (err) => console.error('Failed to load item', err),
    });
  }

  onCategoriesInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const categories = input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');

    this.form.patchValue({ categories });
  }

  onTagsInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const tags = input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');

    this.form.patchValue({ tags });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.form.patchValue({ image: input.files[0] });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.updateItem(this.form.value as { id: string; currentImage: string } & NewSpeisekarteItem).subscribe({
        next: () => {
          alert('Item updated!');
          void this.router.navigate(['/admin/items']);
        },
        error: (err) => console.error('Update failed:', err),
      });
    }
  }
}
