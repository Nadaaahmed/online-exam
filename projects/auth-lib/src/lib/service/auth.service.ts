import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from '../enums/AuthEndPoint';
import { AuthAPI } from '../base/AuthAPI';
import { AuthApi } from '../adaptor/auth-api.adaptor';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthAPI {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private adaptor = inject(AuthApi);
  token = signal<string | null>(null);
  private readonly baseURL = 'https://exam.elevateegy.com';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.token.set(localStorage.getItem('token'));
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}${AuthEndPoint.login}`, data).pipe(
      tap((res: any) => {
        if (res?.token && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          this.token.set(res.token);
        }
      }),
      map((res) => this.adaptor.adapt(res))
    );
  }

  getToken(): string | null {
    return this.token();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem('token');
    this.token.set(null);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}${AuthEndPoint.register}`, data);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}${AuthEndPoint.forgotPassword}`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.put(`${this.baseURL}${AuthEndPoint.resetPassword}`, data, {
      responseType: 'text',
    });
  }

  verifyCode(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}${AuthEndPoint.VerifyResetCode}`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.patch(`${this.baseURL}${AuthEndPoint.changePassword}`, data);
  }

  editProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseURL}${AuthEndPoint.editProfile}`, data);
  }

  getLoggedUserInfo(): Observable<any> {
    return this.http.get(`${this.baseURL}${AuthEndPoint.getLoggedUserInfo}`);
  }

  deleteMyAccount(): Observable<any> {
    return this.http.delete(`${this.baseURL}${AuthEndPoint.deleteMyAccount}`);
  }
}
