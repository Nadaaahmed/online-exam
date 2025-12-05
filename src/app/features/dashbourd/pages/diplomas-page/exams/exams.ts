import { Component, inject, OnInit } from '@angular/core';
import { DiplomasService } from '../../../services/diplomas.service';
import { ExamCard } from './exam-card/exam-card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exams',
  imports: [ExamCard, CommonModule],
  templateUrl: './exams.html',
  styleUrl: './exams.scss',
})
export class Exams implements OnInit {
  private route = inject(ActivatedRoute);
  private diplomasService = inject(DiplomasService);

  exams: any[] = [];
  subjectId = '';

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId') ?? '';
    console.log('Subject ID:', this.subjectId);
    this.loadExams();
  }

  loadExams() {
    if (!this.subjectId) return;

    this.diplomasService.getAllExamsOnSubject(this.subjectId).subscribe({
      next: (res) => {
        console.log('Exams:', res);
        this.exams = res;
      },
      error: (err) => console.error(err),
    });
  }
}
