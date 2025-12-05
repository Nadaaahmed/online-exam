import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';

@Component({
  selector: 'app-reusableinput',
  imports: [CommonModule, ReactiveFormsModule, ErrorMessage],
  templateUrl: './reusableinput.html',
  styleUrl: './reusableinput.scss',
})
export class Reusableinput {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() controlName!: string;
  @Input() form!: FormGroup;
  @Input() fieldName: string = '';

  getFieldName(): string {
    if (this.fieldName) {
      return this.fieldName;
    }
  
    return this.controlName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }
}
