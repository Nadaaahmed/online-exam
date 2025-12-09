import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    // لازم يكون نفس اسم الهيدر اللي الـ API متوقعه
    req = req.clone({
      setHeaders: {
        token,
      },
    });
  }

  return next(req);
}
