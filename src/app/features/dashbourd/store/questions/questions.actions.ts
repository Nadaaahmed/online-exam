import { createAction, props } from '@ngrx/store';

export const loadExam = createAction('[Exam] Load Exam', props<{ examId: string }>());
export const loadExamSuccess = createAction(
  '[Exam] Load Exam Success',
  props<{ exam: any; questions: any }>()
);
export const loadExamFailure = createAction('[Exam] Load Exam Failure', props<{ error: any }>());

export const submitExam = createAction(
  '[Exam] Submit Exam',
  props<{ answers: any[]; time: number }>()
);
export const submitExamSuccess = createAction(
  '[Exam] Submit Exam Success',
  props<{ result: any }>()
);
export const submitExamFailure = createAction(
  '[Exam] Submit Exam Failure',
  props<{ error: any }>()
);

export const clearResult = createAction('[Exam] Clear Result');
