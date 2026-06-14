import { useState, useCallback, useRef, useEffect } from 'react';
import { diagnosticService } from '@/services/diagnosticService';
import type {
  DiagnosticStartResponse,
  DiagnosticResult,
} from '@/types/diagnostic.types';

export function useDiagnosticTest() {
  const [testData, setTestData] = useState<DiagnosticStartResponse | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasAutoSubmitted = useRef(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      // Auto-submit when time runs out (only if test is active and not already submitted)
      if (testData && !result && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        handleSubmit();
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTest = useCallback(async () => {
    setLoading(true);
    setError(null);
    hasAutoSubmitted.current = false;
    try {
      const data = await diagnosticService.start();
      setTestData(data);
      setAnswers({});
      setResult(null);
      setTimeLeft(data.time_limit_minutes * 60);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to start diagnostic test');
    } finally {
      setLoading(false);
    }
  }, []);

  const selectAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!testData) return;
    setLoading(true);
    setError(null);
    if (timerRef.current) clearInterval(timerRef.current);
    try {
      const data = await diagnosticService.submit(testData.diagnostic_id, answers);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit test');
    } finally {
      setLoading(false);
    }
  }, [testData, answers]);

  const fetchResult = useCallback(async (diagnosticId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await diagnosticService.getResult(diagnosticId);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch result');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestData(null);
    setAnswers({});
    setResult(null);
    setError(null);
    setTimeLeft(0);
    hasAutoSubmitted.current = false;
  }, []);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = testData?.total_questions ?? 0;
  const progress = totalQuestions > 0
    ? Math.round((answeredCount / totalQuestions) * 100)
    : 0;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
  const isTimeLow = timeLeft > 0 && timeLeft <= 300; // last 5 minutes

  return {
    testData,
    answers,
    result,
    loading,
    error,
    timeLeft,
    formattedTime,
    isTimeLow,
    progress,
    answeredCount,
    startTest,
    selectAnswer,
    handleSubmit,
    fetchResult,
    resetTest,
  };
}
