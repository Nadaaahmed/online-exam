import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../../../../projects/auth-lib/src/lib/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  imports: [CommonModule],
  templateUrl: './logout-button.html',
  styleUrls: ['./logout-button.scss'],
})
export class LogoutButton {
  private _authService = inject(AuthService);
  private router = inject(Router);

  @Input() variant: 'default' | 'dropdown' | 'compact' = 'default';
  @Input() buttonText: string = 'Logout';
  @Input() iconSrc: string = 'assets/images/log-out.png';
  @Input() iconAlt: string = 'Logout Icon';
  @Input() customClass: string = '';

  @Output() loggedOut = new EventEmitter<void>();

  isLoggingOut = false;
  errorMessage = '';

  getButtonClasses(): string {
    const baseClass = 'flex items-center gap-2 transition disabled:opacity-60';
    const variants = {
      default: 'w-full text-red-600 px-3 py-2 rounded hover:bg-red-50 border border-red-200',
      dropdown:
        'block w-full px-4 py-2.5 text-left text-red-500 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100',
      compact: 'p-2 text-red-600 hover:bg-red-50 rounded',
    };
    return `${baseClass} ${variants[this.variant]} ${this.customClass}`;
  }

  logout(): void {
    this.isLoggingOut = true;
    this.errorMessage = '';

    try {
      this._authService.logout();
      localStorage.removeItem('user');

      this.loggedOut.emit();

      this.router.navigate(['/auth/signin']);
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Failed to logout.';
    } finally {
      this.isLoggingOut = false;
    }
  }
}
