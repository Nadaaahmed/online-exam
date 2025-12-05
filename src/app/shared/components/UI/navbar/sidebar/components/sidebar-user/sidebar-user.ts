import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  user: any;
  userImage: string = 'assets/images/circle-user-round.png';
  isUserMenuOpen = false;
  isLoading = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getLoggedUserInfo().subscribe({
      next: (res) => {
        this.user = res.user;
        this.userName = this.user.firstName + ' ' + this.user.lastName;
        this.userEmail = this.user.email;
        this.userImage = this.user.avatar || 'assets/images/circle-user-round.png';
        this.isLoading = false;
        console.log('User profile:', this.user);
      },
      error: (err) => {
        console.error('Error fetching profile', err);
        this.isLoading = false;
      },
    });
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeMenu(): void {
    this.isUserMenuOpen = false;
  }

  onAccount(): void {
    console.log('Navigate to account settings');
    this.closeMenu();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/circle-user-round.png';
  }
}
