import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Diploma } from '../models/diploma';

@Injectable({ providedIn: 'root' })
export class DiplomasService {
  private http = inject(HttpClient);
  private apiUrl = 'https://exam.elevateegy.com/api/v1';

  // جلب كل المواد (يمكن SSR الوصول إليها مباشرة)
  getSubjects(): Observable<Diploma[]> {
    return this.http
      .get<{ subjects: Diploma[] }>(`${this.apiUrl}/subjects`)
      .pipe(map((res) => res.subjects));
  }

  getAllExamsOnSubject(subjectId: string): Observable<any[]> {
    return this.http
      .get<{ exams: any[] }>(`${this.apiUrl}/exams`)
      .pipe(map((res) => res.exams.filter((exam) => exam.subject === subjectId)));
  }
}
