import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { Store } from '@ngrx/store';
import * as QuestionsSelectors from '../../../store/questions/questions.selector';
import * as QuestionsActions from '../../../store/questions/questions.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './exam-result.html',
  styleUrls: ['./exam-result.scss'],
})
export class ExamResult implements OnInit, OnDestroy {
  result: any = null;
  chartData: any;
  chartOptions: any;

  private store = inject(Store);
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.result = nav?.extras?.state?.['result'] ?? null;
  }

  ngOnInit() {
    if (!this.result) {
      this.store
        .select(QuestionsSelectors.selectResult)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) {
            this.result = res;
            this.normalizeResult();
            this.initChart();
            this.store.dispatch(QuestionsActions.clearResult());
          }
        });
    } else {
      this.normalizeResult();
      this.initChart();
      this.store.dispatch(QuestionsActions.clearResult());
    }

    setTimeout(() => {
      if (!this.result) this.router.navigate(['/dashboard']);
    }, 1200);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private normalizeResult() {
    if (!this.result) return;

    // clone to avoid mutating read-only objects
    let res: any;
    try {
      res =
        typeof (globalThis as any).structuredClone === 'function'
          ? (globalThis as any).structuredClone(this.result)
          : JSON.parse(JSON.stringify(this.result));
    } catch {
      res = Object.assign({}, this.result);
    }

    // map exam title
    if (res.exam && !res.examTitle) {
      res.examTitle = res.exam.title ?? res.examTitle;
    }

    const parseNumber = (v: any) => {
      if (v == null) return 0;
      if (typeof v === 'number') return v;
      if (typeof v === 'string') {
        const s = v.trim();
        if (s.endsWith('%')) return Number(parseFloat(s.replace('%', ''))) || 0;
        const n = Number(s);
        return isNaN(n) ? 0 : n;
      }
      return Number(v) || 0;
    };

    // numeric conversion
    res.correct = parseNumber(
      res.correct ?? res.correctAnswers ?? res.correctQuestions?.length ?? 0
    );
    res.incorrect = parseNumber(res.incorrect ?? res.wrong ?? res.WrongQuestions?.length ?? 0);

    // compute total
    const computedSum = res.correct + res.incorrect;
    res.total = parseNumber(res.total ?? res.totalQuestions ?? computedSum ?? 0);

    // ensure arrays exist
    res.WrongQuestions = Array.isArray(res.WrongQuestions) ? res.WrongQuestions : [];
    res.correctQuestions = Array.isArray(res.correctQuestions) ? res.correctQuestions : [];

    // combine for display (if needed for old template)
    res.questions = [...(res.WrongQuestions || []), ...(res.correctQuestions || [])];

    // assign mutable clone
    this.result = res;
  }

  private initChart() {
    if (!this.result) return;
    const correct = Number(this.result.correct ?? 0);
    const incorrect = Number(this.result.incorrect ?? 0);

    this.chartData = {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [correct, incorrect],
          backgroundColor: ['#22c55e', '#ef4444'],
          hoverBackgroundColor: ['#16a34a', '#dc2626'],
          borderWidth: 0,
        },
      ],
    };

    this.chartOptions = {
      cutout: '70%',
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: any) => `${ctx.label}: ${ctx.parsed}`,
          },
        },
      },
    };
  }

  isOptionCorrect(q: any, key: string) {
    if (!q) return false;
    if (q._correctKey) return String(q._correctKey) === String(key);
    // fallback compare by value text
    const optText = (q.choices || []).find((c: any) => String(c.key) === String(key))?.text;
    return q.correct === key || q.correct === optText;
  }

  isOptionSelected(q: any, key: string) {
    if (!q) return false;
    return String(q._selected) === String(key) || String(q.selected) === String(key);
  }

  restart() {
    this.router.navigate(['/dashboard']);
  }

  explore() {
    this.router.navigate(['/dashboard/diplomas']);
  }
}
