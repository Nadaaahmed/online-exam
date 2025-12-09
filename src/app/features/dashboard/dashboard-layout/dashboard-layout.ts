import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../projects/auth-lib/src/lib/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout implements OnInit {
  user = signal<any>(null);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedUserInfo().subscribe({
      next: (res) => {
        this.user = res.user;
        console.log('User profile:', this.user);
      },
      error: (err) => console.error('Error fetching profile', err),
    });
  }
}
