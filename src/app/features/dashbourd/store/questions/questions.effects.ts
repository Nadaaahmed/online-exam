import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuestionsActions from './questions.actions';
import { DiplomasService } from '../../services/diplomas.service';
import { switchMap, map, catchError, of, tap } from 'rxjs';

@Injectable()
export class QuestionsEffects {
  private actions$ = inject(Actions);
  private diplomasService = inject(DiplomasService);

  loadExam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.loadExam),
      switchMap(({ examId }) =>
        this.diplomasService.getExamById(examId).pipe(
          switchMap((exam) =>
            this.diplomasService.getQuestionsByExam(examId).pipe(
              map((questions) => QuestionsActions.loadExamSuccess({ exam, questions })),
              catchError((error) => of(QuestionsActions.loadExamFailure({ error })))
            )
          ),
          catchError((error) => of(QuestionsActions.loadExamFailure({ error })))
        )
      )
    )
  );

  submitExam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActions.submitExam),
      tap(() => console.log('submitExam action received')),
      switchMap(({ answers, time }) =>
        this.diplomasService.checkAnswers(answers, time).pipe(
          map((result) => QuestionsActions.submitExamSuccess({ result })),
          catchError((error) => of(QuestionsActions.submitExamFailure({ error })))
        )
      )
    )
  );
}
