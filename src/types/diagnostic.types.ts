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

/**
 * Summary item returned by GET /diagnostic/history
 * Matches backend DiagnosticHistoryItem — does NOT include topic_breakdown.
 */
export interface DiagnosticHistoryItem {
  diagnostic_id: string;
  exam_type: string;
  status: string;
  overall_score: number | null;
  total_correct: number | null;
  total_questions: number;
  time_limit_minutes: number;
  started_at: string;
  completed_at: string | null;
  /** Injected client-side after a submit so the accordion can expand — not from API */
  topic_breakdown?: TopicBreakdown[];
}

/** Paginated wrapper returned by GET /diagnostic/history */
export interface DiagnosticHistoryResponse {
  total: number;
  items: DiagnosticHistoryItem[];
}
