import { createReducer, on } from '@ngrx/store';
import * as QuestionsActions from './questions.actions';
import { QuestionsState, questionsInitialState } from './questions.state';

export const questionsReducer = createReducer(
  questionsInitialState,

  on(QuestionsActions.loadExam, (state) => ({ ...state, loading: true, error: null })),
  on(QuestionsActions.loadExamSuccess, (state, { exam, questions }) => ({
    ...state,
    loading: false,
    exam,
    questions,
  })),
  on(QuestionsActions.loadExamFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error?.message || 'Error loading exam',
  })),

  on(QuestionsActions.submitExam, (state) => ({ ...state, loading: true, error: null })),
  on(QuestionsActions.submitExamSuccess, (state, { result }) => ({
    ...state,
    loading: false,
    result,
    error: null,
  })),
  on(QuestionsActions.submitExamFailure, (state, { error }) => ({
    ...state,
    loading: false,
    result: null,
    error: error?.message || 'Error submitting exam',
  })),

  on(QuestionsActions.clearResult, (state) => ({ ...state, result: null }))
);
