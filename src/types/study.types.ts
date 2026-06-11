export interface Topic {
  id: string;
  name: string;
  exam_type: string;
  difficulty_level: number;
  exam_weight: number;
  description: string;
}

export interface TopicMastery {
  topic_id: string;
  topic_name: string;
  mastery_score: number;
  total_questions_attempted: number;
  correct_answers: number;
  last_practiced?: string;
  next_review_date?: string;
}

export interface StudyPlan {
  id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  daily_hours: number;
  is_active: boolean;
  plan_data: WeeklySchedule[];
}

export interface WeeklySchedule {
  week: number;
  topics: DailyTask[];
}

export interface DailyTask {
  day: string;
  topic_id: string;
  topic_name: string;
  duration_minutes: number;
  task_type: 'learn' | 'practice' | 'review' | 'mock_test';
  completed: boolean;
}
