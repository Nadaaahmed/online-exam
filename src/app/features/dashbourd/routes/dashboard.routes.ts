import { AuthGuard } from './../../../../../projects/auth-lib/src/lib/guards/auth.guard';
import { Routes } from '@angular/router';
import { DashboardLayout } from '../dashboard-layout/dashboard-layout';
import { AccountSettings } from '../pages/account-settings/account-settings';
import { DiplomasPage } from '../pages/diplomas-page/diplomas-page';
import { AccountProfile } from '../pages/account-settings/profile/profile';
import { AccountChangePassword } from '../pages/account-settings/change-password/change-password';
import { Exams } from '../pages/diplomas-page/exams/exams';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
      { path: 'diplomas', component: DiplomasPage },
      { path: 'exams/:subjectId', component: Exams },
      {
        path: 'account-settings',
        component: AccountSettings,
        children: [
          { path: 'profile', component: AccountProfile },
          { path: 'change-password', component: AccountChangePassword },
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
        ],
      },
    ],
  },
];
