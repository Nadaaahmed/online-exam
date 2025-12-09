import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Diploma } from '../models/diploma';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DiplomasService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'https://exam.elevateegy.com/api/v1';

  getSubjects(): Observable<Diploma[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http
      .get<{ subjects: Diploma[] }>(`${this.apiUrl}/subjects`)
      .pipe(map((res) => res.subjects || []));
  }

  getAllExamsOnSubject(subjectId: string): Observable<any[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);
    return this.http
      .get<{ exams: any[] }>(`${this.apiUrl}/exams?subject=${subjectId}`)
      .pipe(map((res) => res.exams || []));
  }

  getExamById(examId: string) {
    return this.http.get(`${this.apiUrl}/exams/${examId}`).pipe(
      map((res: any) => {
        console.log('getExamById response:', res);
        // API might return { message: 'success', exam: {...} }
        if (res?.exam) return res.exam;
        return res;
      })
    );
  }

  getQuestionsByExam(examId: string) {
    // normalize response to always return an array of questions
    return this.http.get(`${this.apiUrl}/questions?examId=${examId}`).pipe(
      map((res: any) => {
        console.log('getQuestionsByExam raw response:', res);

        // Check various response formats
        if (Array.isArray(res)) {
          console.log('Response is array:', res.length);
          return res;
        }
        if (Array.isArray(res?.questions)) {
          console.log('Response.questions is array:', res.questions.length);
          return res.questions;
        }
        if (Array.isArray(res?.data)) {
          console.log('Response.data is array:', res.data.length);
          return res.data;
        }
        if (Array.isArray(res?.data?.questions)) {
          console.log('Response.data.questions is array:', res.data.questions.length);
          return res.data.questions;
        }

        console.warn('No questions found in response, returning empty array');
        return [];
      })
    );
  }

  checkAnswers(answers: any[], time: number) {
    return this.http.post(`${this.apiUrl}/questions/check`, { answers, time });
  }
}
