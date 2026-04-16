import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { type NewSpeisekarteItem, SpeisekarteService } from '@/app/services/speisekarte.service';

interface AddItemForm {
  name: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number | null>;
  categories: FormControl<string[]>;
  ingredients: FormControl<string[]>;
  tags: FormControl<string[]>;
  seasonal: FormControl<boolean>;
  image: FormControl<File | null>;
}

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
})
export class AddComponent {
  private fb = inject(FormBuilder);
  private service = inject(SpeisekarteService);

  successMsg = signal<string | null>(null);
  errorMsg = signal<string | null>(null);

  form: FormGroup<AddItemForm> = this.fb.group<AddItemForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categories: new FormControl<string[]>([], { nonNullable: true }),
    ingredients: new FormControl<string[]>([], { nonNullable: true }),
    tags: new FormControl<string[]>([], { nonNullable: true }),
    seasonal: new FormControl(false, { nonNullable: true }),
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  parseCommaSeparated(event: Event): string[] {
    return (event.target as HTMLInputElement).value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');
  }

  onCategoriesInput(event: Event): void {
    this.form.controls.categories.setValue(this.parseCommaSeparated(event));
  }

  onIngredientsInput(event: Event): void {
    this.form.controls.ingredients.setValue(this.parseCommaSeparated(event));
  }

  onTagsInput(event: Event): void {
    this.form.controls.tags.setValue(this.parseCommaSeparated(event));
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.form.controls.image.setValue(input.files[0]);
    }
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const { name, description, price, categories, ingredients, tags, seasonal, image } = this.form.controls;

    const payload: NewSpeisekarteItem = {
      name: name.value,
      description: description.value,
      priceCents: Math.round(price.value! * 100),
      categories: categories.value,
      ingredients: ingredients.value,
      tags: tags.value,
      seasonal: seasonal.value,
      image: image.value!,
    };

    this.service.addItem(payload).subscribe({
      next: () => {
        this.successMsg.set('Item added successfully!');
        this.errorMsg.set(null);
        this.form.reset();
      },
      error: (err) => {
        console.error('Add failed:', err);
        this.errorMsg.set('Failed to add item. Please try again.');
        this.successMsg.set(null);
      },
    });
  }
}
