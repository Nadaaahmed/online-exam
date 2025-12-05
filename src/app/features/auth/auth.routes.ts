import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { ForgotPasswordLayout } from './pages/forgotpassword/forgot-password-layout/forgot-password-layout';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'signin', component: Signin },
      { path: 'signup', component: Signup },
      { path: 'forgot-password', component: ForgotPasswordLayout },
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
    ],
  },
];
