import { DASHBOARD_ROUTES } from './features/dashbourd/routes/dashboard.routes';
import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
  {path: 'dashboard', children: DASHBOARD_ROUTES},
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
];
