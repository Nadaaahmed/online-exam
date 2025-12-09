import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-card.html',
  styleUrls: ['./exam-card.scss'],
})
export class ExamCard {
  @Input() title!: string;
  @Input() numberOfQuestions!: number;
  @Input() duration!: number;
}
