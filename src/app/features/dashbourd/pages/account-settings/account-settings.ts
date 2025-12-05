import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LogoutButton } from './components/logout-button/logout-button';
import { SidebarNav } from '../../../../shared/components/UI/navbar/sidebar/components/sidebar-nav/sidebar-nav';
import { SidebarLink } from '../../../../shared/components/UI/navbar/sidebar/models/sidebar-link';
import { SidebarUser } from '../../../../shared/components/UI/navbar/sidebar/components/sidebar-user/sidebar-user';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  imports: [RouterOutlet, SidebarNav, SidebarUser, LogoutButton, CommonModule],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss',
})
export class AccountSettings {
  platformId = inject(PLATFORM_ID);

  links: SidebarLink[] = [
    {
      label: 'Profile',
      route: '/dashboard/account-settings/profile',
      icon: 'assets/images/user-round.png',
    },
    {
      label: 'Change Password',
      route: '/dashboard/account-settings/change-password',
      icon: 'assets/images/lock.png',
    },
  ];

  userName = '';
  userEmail = '';

  constructor() {
    this.loadUserData();
  }

  loadUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.firstName || 'User';
      this.userEmail = user.email || '';
    }
  }
}
