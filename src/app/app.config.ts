import { authInterceptor } from './core/interceptors/auth.interceptor'; // <- تأكد المسار صحيح
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { questionsReducer } from './features/dashbourd/store/questions/questions.reducer';
import { QuestionsEffects } from './features/dashbourd/store/questions/questions.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), // استخدم هذا interceptor

    // ✅ Angular core providers
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    // ✅ NgRx store & effects
    provideStore({
      questions: questionsReducer,
    }),
    provideEffects([QuestionsEffects]),

    // ✅ DevTools
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

    // ✅ Hydration (SSR / client-side)
    provideClientHydration(withEventReplay()),
  ],
};
