import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ForgetPasswordRequest,
  VerifyEmailRequest,
} from '../models/auth.models';
import { map, Observable, tap } from 'rxjs';
import { AuthAPI } from '../base/AuthAPI';
import { AuthEndPoint } from '../enums/AuthEndPoint';
import { AuthApi } from '../adaptor/auth-api.adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthAPI {
  private readonly baseURL = 'https://exam.elevateegy.com';

  constructor(private http: HttpClient, private adaptor: AuthApi) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}${AuthEndPoint.login}`, data).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          console.log('Token stored:', res.token);
        }
      }),
      map((res) => this.adaptor.adapt(res))
    );
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

  logout(): void {
    localStorage.removeItem('token');
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
