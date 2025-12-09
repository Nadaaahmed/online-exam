import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from '../../../shared/components/UI/navbar/navbar';
import { Sidebar } from '../../../shared/components/UI/navbar/sidebar/sidebar';
import { SidebarLink } from '../../../shared/components/UI/navbar/sidebar/models/sidebar-link';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Sidebar, Navbar, CommonModule, RouterOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  platformId = inject(PLATFORM_ID);

  sidebarTitle = 'ELEVATE';
  sidebarSubtitle = 'Exam App';
  mobileSidebarOpen = false;

  sidebarLinks: SidebarLink[] = [
    {
      label: 'Diplomas',
      route: '/dashboard/diplomas',
      icon: 'assets/images/graduation-cap.png',
    },
    {
      label: 'Account Settings',
      route: '/dashboard/account-settings',
      icon: 'assets/images/user-round.png',
    },
  ];

  userName = 'Firstname';
  userEmail = 'email@example.com';

  navbarTitle = 'Home';
  navbarIcon = 'fa-solid fa-graduation-cap';
  showBackButton = false;

  constructor(private router: Router) {
    this.loadUserData();
    this.setupNavbarFromRoute();
  }

  onBack() {
    window.history.back();
  }

  private loadUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');

      if (userStr) {
        const user = JSON.parse(userStr);

        this.userName = user.firstName || 'User';
        this.userEmail = user.email || '';
      }
    }
  }

  // dashboard-layout.ts
  private setupNavbarFromRoute() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects;

        if (url.startsWith('/dashboard/account-settings')) {
          this.navbarTitle = 'Account Settings';
          this.navbarIcon = 'fa-solid fa-user';
          this.showBackButton = true;
        } else if (url.startsWith('/dashboard/diplomas')) {
          this.navbarTitle = 'Diplomas';
          this.navbarIcon = 'fa-solid fa-graduation-cap';
          this.showBackButton = false;
        } else if (url.includes('/exams/')) {
          this.navbarTitle = 'Exams';
          this.navbarIcon = 'fa-solid fa-list-check';
          this.showBackButton = true;
        } else if (url.includes('/questions/')) {
          this.navbarTitle = 'Questions';
          this.navbarIcon = 'fa-solid fa-file-lines';
          this.showBackButton = true;
        } else {
          this.navbarTitle = 'Home';
          this.navbarIcon = 'fa-solid fa-graduation-cap';
          this.showBackButton = false;
        }
      });
  }
}
