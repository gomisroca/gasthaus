import { Component } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NewSpeisekarteItem, SpeisekarteService } from '@/app/services/speisekarte.service';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './add.component.html',
})
export class AddComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SpeisekarteService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      categories: [[] as string[]],
      ingredients: [[] as string[]],
      tags: [[] as string[]],
      seasonal: [false],
      image: [null, Validators.required],
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

  onIngredientsInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const ingredients = input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');

    this.form.patchValue({ ingredients });
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
      this.service.addItem(this.form.value as NewSpeisekarteItem).subscribe({
        next: () => alert('Item added!'),
        error: (err) => console.error('Add failed:', err),
      });
    }
  }
}
