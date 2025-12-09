import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionsState } from './questions.state';

export const selectQuestionsState = createFeatureSelector<QuestionsState>('questions');

export const selectExam = createSelector(selectQuestionsState, (state) => state.exam);
export const selectQuestions = createSelector(selectQuestionsState, (state) => state.questions);
export const selectResult = createSelector(selectQuestionsState, (state) => state.result);
export const selectLoading = createSelector(selectQuestionsState, (state) => state.loading);
export const selectError = createSelector(selectQuestionsState, (state) => state.error);
