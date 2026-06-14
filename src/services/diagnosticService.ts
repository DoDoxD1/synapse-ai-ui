import { apiClient } from './api';
import type {
  DiagnosticStartResponse,
  DiagnosticResult,
} from '@/types/diagnostic.types';

export const diagnosticService = {
  /**
   * Start a new diagnostic test.
   * The user must have exam_type set in their profile.
   */
  start(): Promise<DiagnosticStartResponse> {
    return apiClient.post<DiagnosticStartResponse>('/diagnostic/start');
  },

  /**
   * Submit all answers for a diagnostic test.
   * @param diagnosticId - UUID of the diagnostic test
   * @param answers - map of questionId → selected option key ("A"|"B"|"C"|"D")
   */
  submit(
    diagnosticId: string,
    answers: Record<string, string>
  ): Promise<DiagnosticResult> {
    return apiClient.post<DiagnosticResult>('/diagnostic/submit', {
      diagnostic_id: diagnosticId,
      answers,
    });
  },

  /**
   * Fetch the result of a completed diagnostic test.
   * @param diagnosticId - UUID of the diagnostic test
   */
  getResult(diagnosticId: string): Promise<DiagnosticResult> {
    return apiClient.get<DiagnosticResult>(`/diagnostic/${diagnosticId}/result`);
  },
};
