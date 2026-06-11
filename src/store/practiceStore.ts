import { create } from 'zustand';
import type { Question, PracticeSession } from '@/types/question.types';

interface PracticeState {
  currentSession: PracticeSession | null;
  currentQuestion: Question | null;
  questionIndex: number;
  totalQuestions: number;
  answers: Record<string, string>;
  hintsUsed: Record<string, number>;
  startTime: Date | null;
  
  // Actions
  startSession: (session: PracticeSession) => void;
  setCurrentQuestion: (question: Question, index: number) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  useHint: (questionId: string) => void;
  endSession: () => void;
  resetSession: () => void;
}

export const usePracticeStore = create<PracticeState>((set) => ({
  currentSession: null,
  currentQuestion: null,
  questionIndex: 0,
  totalQuestions: 0,
  answers: {},
  hintsUsed: {},
  startTime: null,

  startSession: (session) => set({
    currentSession: session,
    startTime: new Date(),
    questionIndex: 0,
    answers: {},
    hintsUsed: {},
  }),

  setCurrentQuestion: (question, index) => set({
    currentQuestion: question,
    questionIndex: index,
  }),

  submitAnswer: (questionId, answer) => set((state) => ({
    answers: {
      ...state.answers,
      [questionId]: answer,
    },
  })),

  useHint: (questionId) => set((state) => ({
    hintsUsed: {
      ...state.hintsUsed,
      [questionId]: (state.hintsUsed[questionId] || 0) + 1,
    },
  })),

  endSession: () => set({
    currentSession: null,
    currentQuestion: null,
  }),

  resetSession: () => set({
    currentSession: null,
    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: 0,
    answers: {},
    hintsUsed: {},
    startTime: null,
  }),
}));
