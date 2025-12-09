import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'dashboard/diplomas',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'dashboard/account-settings/**',
    renderMode: RenderMode.Prerender,
  },
  // ✅ كل الـ dynamic routes استخدم Server rendering
  {
    path: 'dashboard/exams/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/exam-result',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server, // ✅ default للـ routes المتبقية
  },
];
