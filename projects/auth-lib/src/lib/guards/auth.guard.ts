import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true; // السيرفر فقط يتجاوز
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['auth/signin']); // ارجع لصفحة تسجيل الدخول
      return false;
    }

    return true;
  }
}
