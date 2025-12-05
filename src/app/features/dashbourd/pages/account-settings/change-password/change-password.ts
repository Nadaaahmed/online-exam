import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
  passwordPatternValidator,
  passwordsMatchValidator,
} from '../../../../../shared/utils/password-validators';
import { AuthService } from '../../../../../../../projects/auth-lib/src/lib/service/auth.service';

@Component({
  selector: 'app-account-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class AccountChangePassword implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  // Handle form submit
  onSave() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { currentPassword, newPassword, confirmPassword } = this.form.value;

    this.authService
      .changePassword({
        oldPassword: currentPassword,
        password: newPassword,
        rePassword: confirmPassword,
      })
      .subscribe({
        next: (res) => {
          this.successMessage = 'Password changed successfully!';
          this.isSubmitting = false;
          this.form.reset();
        },
        error: (err) => {
          this.errorMessage = 'Failed to change password';
          this.isSubmitting = false;
          console.error(err);
        },
      });
  }
}
