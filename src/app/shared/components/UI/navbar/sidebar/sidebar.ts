import { Component, Input } from '@angular/core';
import { SidebarLogo } from './components/sidebar-logo/sidebar-logo';
import { SidebarNav } from './components/sidebar-nav/sidebar-nav';
import { SidebarUser } from './components/sidebar-user/sidebar-user';
import { SidebarLink } from './models/sidebar-link';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarLogo, SidebarNav, SidebarUser],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() title = 'ELEVATE';
  @Input() subtitle = 'Exam App';

  @Input() links: SidebarLink[] = [
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

  @Input() userName = 'Firstname';
  @Input() userEmail = 'email@example.com';
}
