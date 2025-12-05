import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Diploma } from '../models/diploma';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DiplomasService {
  private http = inject(HttpClient);
  private apiUrl = 'https://exam.elevateegy.com/api/v1';
  private platformId = inject(PLATFORM_ID);

  // جلب كل المواد
  getSubjects(): Observable<Diploma[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http
      .get<{ subjects: Diploma[] }>(`${this.apiUrl}/subjects`)
      .pipe(map((res) => res.subjects));
  }

  getAllExamsOnSubject(subjectId: string): Observable<any[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http
      .get<{ exams: any[] }>(`${this.apiUrl}/exams`)
      .pipe(map((res) => res.exams.filter((exam) => exam.subject === subjectId)));
  }
}
