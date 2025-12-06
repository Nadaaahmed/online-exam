import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // استخدم مسارًا أكثر تحديدًا هنا إذا أمكن
    // أو استخدم نمط (pattern) يشمل أي مسار ديناميكي لا تريد عمل Prerender له
    path: 'dashboard/exams/:subjectId',
    renderMode: RenderMode.Client, // ⬅️ هذا يوقف محاولة Prerendering
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
