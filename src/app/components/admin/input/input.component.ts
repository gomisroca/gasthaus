import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() name!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() required: boolean = false;
}
