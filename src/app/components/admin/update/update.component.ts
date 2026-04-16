import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SpeisekarteService, type UpdateSpeisekarteItem } from '@/app/services/speisekarte.service';
import { type SpeisekarteItem } from '@/types';

interface UpdateItemForm {
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
  selector: 'app-update-item',
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(SpeisekarteService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  id = signal<string>(this.activatedRoute.snapshot.params['id'] as string);

  readonly item = signal<SpeisekarteItem>({
    id: '',
    name: '',
    description: '',
    priceCents: 0,
    categories: [],
    ingredients: [],
    tags: [],
    seasonal: false,
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  successMsg = signal<string | null>(null);
  errorMsg = signal<string | null>(null);

  form: FormGroup<UpdateItemForm> = this.fb.group<UpdateItemForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categories: new FormControl<string[]>([], { nonNullable: true }),
    ingredients: new FormControl<string[]>([], { nonNullable: true }),
    tags: new FormControl<string[]>([], { nonNullable: true }),
    seasonal: new FormControl(false, { nonNullable: true }),
    image: new FormControl<File | null>(null),
  });

  ngOnInit(): void {
    this.service.getUniqueItem(this.id()).subscribe({
      next: (item) => {
        this.item.set(item);
        this.form.controls.name.setValue(item.name);
        this.form.controls.description.setValue(item.description ?? '');
        this.form.controls.price.setValue(item.priceCents / 100);
        this.form.controls.categories.setValue(item.categories);
        this.form.controls.ingredients.setValue(item.ingredients);
        this.form.controls.tags.setValue(item.tags);
        this.form.controls.seasonal.setValue(item.seasonal);
      },
      error: (err) => console.error('Failed to load item', err),
    });
  }

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

    const payload: UpdateSpeisekarteItem = {
      id: this.id(),
      name: name.value,
      description: description.value,
      priceCents: Math.round(price.value! * 100),
      categories: categories.value,
      ingredients: ingredients.value,
      tags: tags.value,
      seasonal: seasonal.value,
      image: image.value!,
    };

    this.service.updateItem(payload).subscribe({
      next: () => {
        this.successMsg.set('Item updated successfully!');
        this.errorMsg.set(null);
        void this.router.navigate(['/admin/items']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.errorMsg.set('Failed to update item. Please try again.');
        this.successMsg.set(null);
      },
    });
  }
}
