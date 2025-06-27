import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpeisekarteService } from '../../services/speisekarte.service';

@Component({
  selector: 'admin',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: SpeisekarteService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      categories: [[] as string[]],
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
    console.log('Submitting form', this.form.value);
    if (this.form.valid) {
      this.service.addItem(this.form.value as any).subscribe({
        next: () => alert('Item added!'),
        error: (err) => console.error('Add failed:', err),
      });
    }
  }
}
