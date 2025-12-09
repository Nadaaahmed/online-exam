import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../../projects/auth-lib/src/lib/service/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class AccountProfile implements OnInit {
  profileForm!: FormGroup;
  user: any;
  isLoading = true;
  isSaving = false;
  isDeleting = false;
  errorMessage = '';
  successMessage = '';

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile();
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
    if (!isPlatformBrowser(this.platformId) || !this.authService.getToken()) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.authService
      .getLoggedUserInfo()
      .pipe(take(1))
      .subscribe({
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
        error: () => {
          this.errorMessage = 'Failed to load profile data';
          this.isLoading = false;
        },
      });
  }

  onSaveChanges() {
    if (this.profileForm.invalid || !isPlatformBrowser(this.platformId)) return;

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { firstName, lastName, email, username } = this.profileForm.value;

    this.authService
      .editProfile({ firstName, lastName, email, username })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully!';
          this.isSaving = false;
          this.profileForm.patchValue({ firstName, lastName, email, username });
          this.user = { ...this.user, firstName, lastName, email, username };
        },
        error: () => {
          this.errorMessage = 'Failed to update profile';
          this.isSaving = false;
        },
      });
  }

  onDeleteAccount() {
    if (!isPlatformBrowser(this.platformId) || !this.authService.getToken()) return;

    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.'))
      return;

    this.isDeleting = true;

    this.authService
      .deleteMyAccount()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isDeleting = false;
          localStorage.removeItem('token');
          this.router.navigate(['/auth/signin']);
        },
        error: () => {
          this.errorMessage = 'Failed to delete account. Please try again.';
          this.isDeleting = false;
        },
      });
  }
}
