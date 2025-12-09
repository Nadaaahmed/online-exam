import { Component, Input, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LogoutButton } from '../../../../../../../features/dashbourd/pages/account-settings/components/logout-button/logout-button';
import { AuthService } from '../../../../../../../../../projects/auth-lib/src/lib/service/auth.service';

@Component({
  selector: 'app-sidebar-user',
  imports: [CommonModule, LogoutButton],
  templateUrl: './sidebar-user.html',
  styleUrls: ['./sidebar-user.scss'],
})
export class SidebarUser implements OnInit {
  @Input() userName: string = '';
  @Input() userEmail: string = '';
  user = signal<any>(null);
  userImage = signal('assets/images/circle-user-round.png');
  isUserMenuOpen = signal(false);
  isLoading = signal(true);

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading.set(false);
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      this.isLoading.set(false);
      return;
    }

    this.authService.getLoggedUserInfo().subscribe({
      next: (res) => {
        this.user.set(res.user);
        this.userName = this.user().firstName + ' ' + this.user().lastName;
        this.userEmail = this.user().email;
        this.userImage.set(this.user().avatar || 'assets/images/circle-user-round.png');
        this.isLoading.set(false);
        console.log('User profile:', this.user());
      },
      error: (err) => {
        console.error('Error fetching profile', err);
        this.isLoading.set(false);
      },
    });
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.isUserMenuOpen.set(!this.isUserMenuOpen());
  }

  closeMenu(): void {
    this.isUserMenuOpen.set(false);
  }

  onAccount(): void {
    console.log('Navigate to account settings');
    this.closeMenu();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/circle-user-round.png';
  }
}
