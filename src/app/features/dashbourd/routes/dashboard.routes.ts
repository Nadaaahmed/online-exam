import { Routes } from '@angular/router';
import { DashboardLayout } from '../dashboard-layout/dashboard-layout';
import { DiplomasPage } from '../pages/diplomas-page/diplomas-page';
import { Exams } from '../pages/diplomas-page/exams/exams';
import { AccountSettings } from '../pages/account-settings/account-settings';
import { AccountProfile } from '../pages/account-settings/profile/profile';
import { AccountChangePassword } from '../pages/account-settings/change-password/change-password';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },

      // diplomas
      { path: 'diplomas', component: DiplomasPage },

      // exams ✅ عطّل prerendering (يحتوي على parameters)
      {
        path: 'exams/:subjectId',
        component: Exams,
        data: { prerender: false },
      },

      // exam questions ✅ عطّل prerendering (يحتوي على parameters)
      {
        path: 'exams/:subjectId/questions/:examId',
        loadComponent: () =>
          import('../pages/diplomas-page/exam-questions/exam-questions').then(
            (m) => m.ExamQuestions
          ),
        data: { prerender: false },
      },

      // exam result ✅ عطّل prerendering
      {
        path: 'exam-result',
        loadComponent: () =>
          import('../pages/diplomas-page/exam-result/exam-result').then((m) => m.ExamResult),
        data: { prerender: false },
      },

      // account
      {
        path: 'account-settings',
        component: AccountSettings,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: AccountProfile },
          { path: 'change-password', component: AccountChangePassword },
        ],
      },
    ],
  },
];
