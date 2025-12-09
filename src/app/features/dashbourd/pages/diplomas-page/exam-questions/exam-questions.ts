import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as QuestionsActions from '../../../store/questions/questions.actions';
import * as QuestionsSelectors from '../../../store/questions/questions.selector';
import { CommonModule } from '@angular/common';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-questions.html',
})
export class ExamQuestions implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signals
  questions = signal<any[]>([]);
  currentIndex = signal(0);
  selectedAnswers = signal<{ [key: string]: string }>({});
  timeLeft = signal(0);
  timerDisplay = signal('00:00');
  canSubmit = signal(false);
  loading = signal(true);
  error = signal<string | null>(null);
  totalQuestions = signal(0);
  exam = signal<any>(null); // ✅ احفظ بيانات الامتحان

  private timerStarted = false;
  private destroy$ = new Subject<void>();
  private examDurationMinutes = 30; // default
  private resultNavigated = false;
  private examSubmitted = false;

  ngOnInit() {
    const examId = this.route.snapshot.paramMap.get('examId') ?? '';
    if (!examId) {
      this.error.set('Exam ID not found');
      return;
    }

    // Load exam & questions
    this.store.dispatch(QuestionsActions.loadExam({ examId }));

    // ✅ Subscribe to exam - للحصول على مدة الامتحان
    this.store
      .select(QuestionsSelectors.selectExam)
      .pipe(takeUntil(this.destroy$))
      .subscribe((exam) => {
        if (exam) {
          console.log('Exam loaded:', exam);
          this.exam.set(exam);
          // ✅ احصل على مدة الامتحان من الـ API (بالدقائق)
          const duration = exam.duration || exam.time || 30;
          this.examDurationMinutes = duration;
          console.log('Exam duration:', this.examDurationMinutes, 'minutes');
        }
      });

    // Subscribe to questions
    this.store
      .select(QuestionsSelectors.selectQuestions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((qs) => {
        console.log('Questions loaded from API:', qs?.length || 0);
        console.log('numberOfQuestions from exam:', this.exam()?.numberOfQuestions);

        // ✅ استخدم عدد الأسئلة من بيانات الامتحان إن وجدت
        const questionsToShow = qs?.slice(0, this.exam()?.numberOfQuestions) || [];

        this.questions.set(questionsToShow);
        this.totalQuestions.set(questionsToShow.length);
        console.log('Total questions set to:', this.totalQuestions());
        this.currentIndex.set(0);
        this.updateCanSubmit();
        this.loading.set(false);
      });

    // Subscribe to loading
    this.store
      .select(QuestionsSelectors.selectLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => this.loading.set(loading));

    // Subscribe to error
    this.store
      .select(QuestionsSelectors.selectError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((err) => this.error.set(err));

    // Subscribe to result
    this.store
      .select(QuestionsSelectors.selectResult)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        console.log('Component received result:', result);
        if (result && !this.resultNavigated) {
          this.resultNavigated = true;
          this.loading.set(false);
          this.timerStarted = false;
          this.router
            .navigate(['/dashboard/exam-result'], {
              state: { result },
            })
            .catch((e) => console.error('Navigation error', e));
        }
      });

    // ✅ بدء التايمر بعد تحميل الأسئلة مباشرة (ليس الامتحان)
    this.store
      .select(QuestionsSelectors.selectQuestions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((qs) => {
        if (qs && qs.length > 0 && !this.timerStarted && this.exam()) {
          console.log('Questions ready, starting timer');
          this.startTimer(this.examDurationMinutes);
        }
      });
  }

  startTimer(minutes: number) {
    if (this.timerStarted) return;
    this.timerStarted = true;

    console.log('Starting timer with', minutes, 'minutes');
    this.timeLeft.set(minutes * 60);
    this.updateTimerDisplay();

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const current = this.timeLeft();
        if (current > 0) {
          this.timeLeft.update((t) => t - 1);
          this.updateTimerDisplay();
        } else {
          console.log('Time expired - auto submitting exam');
          this.submitExamNow(true);
        }
      });
  }

  updateTimerDisplay() {
    const t = this.timeLeft();
    const m = Math.floor(t / 60);
    const s = t % 60;
    this.timerDisplay.set(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
  }

  onSelectAnswer(questionId: string, answerKey: string) {
    this.selectedAnswers.update((prev) => ({
      ...prev,
      [questionId]: answerKey,
    }));
    this.updateCanSubmit();
  }

  updateCanSubmit() {
    const totalQuestions = this.questions().length;
    const answeredCount = Object.keys(this.selectedAnswers()).length;
    this.canSubmit.set(totalQuestions > 0 && answeredCount === totalQuestions);
  }

  next() {
    this.currentIndex.update((i) => Math.min(i + 1, this.questions().length - 1));
  }

  previous() {
    this.currentIndex.update((i) => Math.max(i - 1, 0));
  }

  isSelected(qId: string, ansKey: string) {
    return this.selectedAnswers()[qId] === ansKey;
  }

  formatAnswers() {
    return Object.entries(this.selectedAnswers()).map(([questionId, correct]) => ({
      questionId,
      correct,
    }));
  }

  submitExamNow(autoSubmit: boolean = false) {
    console.log('submitExamNow called', {
      autoSubmit,
      canSubmit: this.canSubmit(),
      examSubmitted: this.examSubmitted,
      totalQuestions: this.totalQuestions(),
    });

    if (this.examSubmitted) {
      console.warn('Exam already submitted - ignoring');
      return;
    }

    if (!autoSubmit && !this.canSubmit()) {
      this.error.set('Please answer all questions before submitting');
      return;
    }

    const answers = this.formatAnswers();
    const timeTaken = this.examDurationMinutes * 60 - this.timeLeft();

    console.log('Dispatching submitExam with:', {
      answers,
      time: timeTaken,
      totalQuestions: this.totalQuestions(),
    });

    this.loading.set(true);
    this.examSubmitted = true;
    this.store.dispatch(QuestionsActions.submitExam({ answers, time: timeTaken }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
