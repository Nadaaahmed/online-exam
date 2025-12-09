import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../../projects/auth-lib/src/lib/service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const auth = inject(AuthService);
    const token = auth.getToken();

    if (!token) {
      console.warn('authInterceptor: no token found');
      return next(req);
    }

    const cloned = req.clone({
      headers: req.headers.set('token', token),
    });

    console.log('authInterceptor: attaching token to', req.url);
    return next(cloned);
  } catch (e) {
    console.error('authInterceptor error', e);
    return next(req);
  }
};
