export interface QuestionsState {
  exam: any | null;
  questions: any[];
  loading: boolean;
  error: string | null;
  result: any | null;
}

export const questionsInitialState: QuestionsState = {
  exam: null,
  questions: [],
  loading: false,
  error: null,
  result: null,
};
