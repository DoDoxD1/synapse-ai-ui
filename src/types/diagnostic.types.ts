export interface DiagnosticQuestion {
  id: string;
  question_text: string;
  question_type: 'mcq';
  options: Record<string, string>; // { A: "...", B: "...", ... }
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface DiagnosticTopic {
  topic_id: string;
  topic_name: string;
  questions: DiagnosticQuestion[];
}

export interface DiagnosticStartResponse {
  diagnostic_id: string;
  exam_type: string;
  time_limit_minutes: number;
  total_questions: number;
  topics: DiagnosticTopic[];
}

export interface DiagnosticSubmitRequest {
  diagnostic_id: string;
  answers: Record<string, string>; // { questionId: "A"|"B"|"C"|"D" }
}

export type StrengthLevel = 'weak' | 'moderate' | 'strong';

export interface TopicBreakdown {
  topic_id: string;
  topic_name: string;
  correct: number;
  total: number;
  score_percent: number;
  strength_level: StrengthLevel;
}

export interface DiagnosticResult {
  diagnostic_id: string;
  exam_type: string;
  status: 'in_progress' | 'completed';
  overall_score: number;
  total_correct: number;
  total_questions: number;
  time_limit_minutes: number;
  started_at: string;
  completed_at: string;
  topic_breakdown: TopicBreakdown[];
}
