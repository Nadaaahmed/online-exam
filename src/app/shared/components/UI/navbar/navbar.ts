import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
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
