import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-logo',
  imports: [],
  templateUrl: './sidebar-logo.html',
  styleUrl: './sidebar-logo.scss',
})
export class SidebarLogo {
  @Input() title!: string;
  @Input() subtitle!: string;
}
