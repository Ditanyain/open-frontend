import type { ApiResponse } from "@/lib/api/types";

export interface AttemptItem {
  attemptId: string;
  tutorialId: number;
  createdAt: string;
  submittedAt: string | null;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
}

export type AttemptsListResponse = ApiResponse<AttemptItem[]>;

export interface AttemptsFilter {
  userId: number;
  tutorialId: number;
}

export interface CreateAttemptParams {
  userId: number;
  tutorialId: number;
}

export interface CreateAttemptData {
  attemptId: string;
  tutorialId: number;
  questions: AttemptQuestionDetail[];
}

export type CreateAttemptResponse = ApiResponse<CreateAttemptData>;

// QUIZ TYPES
export type QuestionType = "SINGLE" | "MULTIPLE" | "BOOLEAN";

export interface AttemptOptionDetail {
  optionId: string;
  option: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  reason?: string;
}

export interface AttemptQuestionDetail {
  questionId: string;
  question: string;
  type: QuestionType;
  isAnswered?: boolean;
  options: AttemptOptionDetail[];
  isCorrect?: boolean;
}

export interface AttemptDetail extends AttemptItem {
  userId: number;
  questions: AttemptQuestionDetail[];
}

export type AttemptDetailResponse = ApiResponse<AttemptDetail>;

export interface SubmitAnswerPayload {
  questionId: string;
  optionIds: string[];
}

export interface SubmitAnswerData {
  attemptId: string;
  question: AttemptQuestionDetail;
}

export type SubmitAnswerResponse = ApiResponse<SubmitAnswerData>;