export interface User {
  id: string;
  email: string;
  full_name: string;
  exam_type: string;
  target_score?: number;
  exam_date?: string;
  created_at: string;
  is_verified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  exam_type: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}
