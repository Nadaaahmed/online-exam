import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamCard } from './exam-card/exam-card';
import { DiplomasService } from '../../../services/diplomas.service';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, ExamCard],
  templateUrl: './exams.html',
  styleUrls: ['./exams.scss'],
})
export class Exams implements OnInit {
  private diplomasService = inject(DiplomasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  subjectId = '';
  exams$!: Observable<any[]>;

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId') || '';

    if (!this.subjectId) {
      console.warn('Invalid subjectId!');
      this.router.navigate(['/dashboard/subjects']); // Redirect
      return;
    }

    this.exams$ = this.diplomasService.getAllExamsOnSubject(this.subjectId).pipe(
      catchError((err) => {
        console.error('Error fetching exams', err);
        return of([]);
      })
    );
  }

  goToQuestions(examId: string) {
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.router.navigate(['/dashboard/exams', subjectId, 'questions', examId]);
  }
}
