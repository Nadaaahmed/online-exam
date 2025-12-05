import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exam-card',
  imports: [],
  templateUrl: './exam-card.html',
  styleUrl: './exam-card.scss',
})
export class ExamCard {
  @Input() title!: string;
  @Input() questions!: number;
  @Input() duration!: number;
}
