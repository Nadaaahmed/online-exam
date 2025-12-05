import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../../projects/auth-lib/src/lib/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class AccountProfile implements OnInit {
  private router = inject(Router);
  profileForm!: FormGroup;
  user: any;
  isLoading = true;
  isSaving = false;
  isDeleting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  loadUserProfile() {
    this.isLoading = true;
    this.authService.getLoggedUserInfo().subscribe({
      next: (res) => {
        this.user = res.user;
        this.isLoading = false;

        this.profileForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username || '',
          email: this.user.email,
          phone: this.user.phone || '',
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile data';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onSaveChanges() {
    if (this.profileForm.invalid) return;

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { firstName, lastName, email, username } = this.profileForm.value;

    this.authService.editProfile({ firstName, lastName, email, username }).subscribe({
      next: (res) => {
        this.successMessage = 'Profile updated successfully!';
        this.isSaving = false;
        this.user = { ...this.user, firstName, lastName, email };
      },
      error: (err) => {
        this.errorMessage = 'Failed to update profile';
        this.isSaving = false;
        console.error(err);
      },
    });
  }

  onDeleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.deleteMyAccount().subscribe({
      next: (res) => {
        this.isDeleting = false;
        this.successMessage = 'Your account has been deleted successfully.';
        localStorage.removeItem('token'); // log out the user
        this.router.navigate(['/auth/signin']);
      },
      error: (err) => {
        this.isDeleting = false;
        this.errorMessage = 'Failed to delete account. Please try again.';
        console.error(err);
      },
    });
  }
}
