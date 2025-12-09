import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: true,
  imports: [BreadcrumbModule, ButtonModule],
})
export class Navbar {
  @Input() title = 'Home';
  @Input() iconClass = 'fa-solid fa-graduation-cap';
  @Input() showBack = false;

  @Output() back = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onBack() {
    this.back.emit();
  }
}
