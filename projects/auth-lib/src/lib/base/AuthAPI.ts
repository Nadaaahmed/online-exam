import { Observable } from 'rxjs';
export abstract class AuthAPI {
  abstract login(data: any): Observable<any>;
  abstract register(data: any): Observable<any>;
  abstract forgetPassword(data: any): Observable<any>;
  abstract resetPassword(data: any): Observable<any>;
  abstract verifyCode(data: any): Observable<any>;
  abstract logout(): void;
  abstract changePassword(data: any): Observable<any>;
  abstract editProfile(data: any): Observable<any>;
  abstract getLoggedUserInfo(): Observable<any>;
  abstract deleteMyAccount(): Observable<any>;
}
