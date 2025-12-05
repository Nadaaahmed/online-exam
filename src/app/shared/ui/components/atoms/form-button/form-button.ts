import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  imports: [],
  templateUrl: './form-button.html',
  styleUrl: './form-button.scss',
})
export class FormButton {
 @Input() label: string = 'Submit';
  @Input() type: 'submit' | 'button' | 'reset' = 'submit';
  @Input() disabled: boolean = false;
}
