export interface Question {
  id: string;
  topic_id: string;
  question_text: string;
  question_type: 'mcq' | 'numeric' | 'descriptive';
  options?: Record<string, string>;
  correct_answer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface QuestionAttempt {
  id: string;
  question_id: string;
  user_answer: string;
  is_correct: boolean;
  time_taken_seconds: number;
  hints_used: number;
  attempted_at: string;
}

export interface PracticeSession {
  id: string;
  topic_id: string;
  session_type: string;
  start_time: string;
  end_time?: string;
  questions_attempted: number;
  correct_answers: number;
  xp_earned: number;
}
