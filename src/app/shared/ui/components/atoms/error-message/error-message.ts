import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
  @Input() control!: AbstractControl | null;
  @Input() form!: FormGroup | null;
  @Input() fieldName: string = 'This field';
  @Input() showFormErrors: boolean = false;

  getErrorMessage(): string {
       if (this.showFormErrors && this.form && this.form.errors) {
      const formErrors = this.form.errors;
      
      if (formErrors['passwordsMismatch']) {
        return 'Passwords do not match';
      }
      
      if (formErrors['notMatching']) {
        return 'Passwords do not match';
      }
    }

       if (!this.control || !this.control.errors || !this.control.touched) {
      return '';
    }

    const errors = this.control.errors;

    if (errors['required']) {
      return `${this.fieldName} is required`;
    }

    if (errors['email']) {
      return 'Please enter a valid email address';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      const actualLength = errors['minlength'].actualLength;
      return `${this.fieldName} must be at least ${requiredLength} characters long (currently ${actualLength})`;
    }

    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      const actualLength = errors['maxlength'].actualLength;
      return `${this.fieldName} must not exceed ${requiredLength} characters (currently ${actualLength})`;
    }

    if (errors['pattern']) {
      return `Please enter a valid ${this.fieldName.toLowerCase()}`;
    }

    if (errors['passwordsMismatch']) {
      return 'Passwords do not match';
    }

    if (errors['passwordPattern']) {
      const patternErrors = errors['passwordPattern'];
      const issues: string[] = [];
      
      if (!patternErrors.hasMinLength) {
        issues.push('at least 8 characters');
      }
      if (!patternErrors.hasUpperCase) {
        issues.push('one uppercase letter');
      }
      if (!patternErrors.hasLowerCase) {
        issues.push('one lowercase letter');
      }
      if (!patternErrors.hasNumber) {
        issues.push('one number');
      }
      if (!patternErrors.hasSpecialChar) {
        issues.push('one special character');
      }

      return `Password must contain ${issues.join(', ')}`;
    }

    if (errors['notMatching']) {
      return 'Passwords do not match';
    }

    return `${this.fieldName} is invalid`;
  }

  hasError(): boolean {
        if (this.showFormErrors && this.form && this.form.errors && this.form.touched) {
      return true;
    }

    return !!(this.control && this.control.invalid && this.control.touched);
  }
}

