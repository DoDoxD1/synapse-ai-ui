import { apiClient } from './api';
import type { Question, QuestionAttempt, PracticeSession } from '@/types/question.types';
import type { Topic } from '@/types/study.types';

export const practiceService = {
  async getTopics(): Promise<Topic[]> {
    return apiClient.get<Topic[]>('/practice/topics');
  },

  async startPracticeSession(topicId: string): Promise<PracticeSession> {
    return apiClient.post<PracticeSession>('/practice/start', { topic_id: topicId });
  },

  async getNextQuestion(sessionId: string): Promise<Question> {
    return apiClient.get<Question>(`/practice/question?session_id=${sessionId}`);
  },

  async submitAnswer(data: {
    session_id: string;
    question_id: string;
    answer: string;
    time_taken: number;
    hints_used: number;
  }): Promise<QuestionAttempt> {
    return apiClient.post<QuestionAttempt>('/practice/submit', data);
  },

  async getHint(questionId: string, level: number): Promise<{ hint: string }> {
    return apiClient.post<{ hint: string }>('/practice/hint', {
      question_id: questionId,
      level,
    });
  },

  async endSession(sessionId: string): Promise<PracticeSession> {
    return apiClient.post<PracticeSession>(`/practice/end`, { session_id: sessionId });
  },
};
