import { useState } from 'react';
import { useDiagnosticTest } from '@/hooks/useDiagnosticTest';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Minus,
  BookOpen,
  Zap,
  Award,
  XCircle,
  History,
  CalendarClock,
  Loader2,
} from 'lucide-react';
import type { DiagnosticHistoryItem, DiagnosticResult, StrengthLevel } from '@/types/diagnostic.types';

// ─── Strength config ──────────────────────────────────────────────────────────

const strengthConfig: Record<
  StrengthLevel,
  { label: string; icon: React.ReactNode; badgeCls: string; borderCls: string; bgCls: string; textCls: string; barCls: string }
> = {
  weak: {
    label: 'Needs Work',
    icon: <TrendingDown className="w-3.5 h-3.5" />,
    badgeCls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    borderCls: 'border-l-4 border-red-500',
    bgCls: 'bg-red-50 dark:bg-red-950/20',
    textCls: 'text-red-600 dark:text-red-400',
    barCls: 'bg-red-500',
  },
  moderate: {
    label: 'Improving',
    icon: <Minus className="w-3.5 h-3.5" />,
    badgeCls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    borderCls: 'border-l-4 border-amber-500',
    bgCls: 'bg-amber-50 dark:bg-amber-950/20',
    textCls: 'text-amber-600 dark:text-amber-400',
    barCls: 'bg-amber-500',
  },
  strong: {
    label: 'Strong',
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    badgeCls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    borderCls: 'border-l-4 border-emerald-500',
    bgCls: 'bg-emerald-50 dark:bg-emerald-950/20',
    textCls: 'text-emerald-600 dark:text-emerald-400',
    barCls: 'bg-emerald-500',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function scoreColor(score: number) {
  if (score >= 70) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

// ─── Topic breakdown rows (shared by history + result screen) ─────────────────

function TopicBreakdownList({ breakdown }: { breakdown: DiagnosticResult['topic_breakdown'] }) {
  return (
    <div className="space-y-2.5">
      {breakdown.map((topic) => {
        const cfg = strengthConfig[topic.strength_level];
        return (
          <div
            key={topic.topic_id}
            className={`rounded-xl p-3.5 ${cfg.bgCls} ${cfg.borderCls} space-y-2`}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="font-medium text-sm">{topic.topic_name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{topic.correct}/{topic.total}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.badgeCls}`}>
                  {cfg.icon}
                  {cfg.label}
                </span>
                <span className={`font-bold text-xs ${cfg.textCls}`}>{topic.score_percent.toFixed(0)}%</span>
              </div>
            </div>
            <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-700 ${cfg.barCls}`}
                style={{ width: `${topic.score_percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Past Results Accordion ───────────────────────────────────────────────────

function PastResultsAccordion({
  history,
  historyLoading,
  historyError,
}: {
  history: DiagnosticHistoryItem[];
  historyLoading: boolean;
  historyError: string | null;
}) {
  // Only one open at a time — store the diagnostic_id of the open panel
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  if (historyLoading) {
    return (
      <div className="flex items-center gap-3 text-muted-foreground py-4 justify-center">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading past results…</span>
      </div>
    );
  }

  if (historyError) {
    return (
      <div className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-red-600 dark:text-red-400 text-sm">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        {historyError}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-3">
        No past results found. Take your first diagnostic test!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((item, idx) => {
        const isOpen = openId === item.diagnostic_id;
        const takenAt = item.completed_at || item.started_at;
        const breakdown = item.topic_breakdown ?? [];
        const weakCount = breakdown.filter((t) => t.strength_level === 'weak').length;
        const moderateCount = breakdown.filter((t) => t.strength_level === 'moderate').length;
        const strongCount = breakdown.filter((t) => t.strength_level === 'strong').length;

        return (
          <div
            key={item.diagnostic_id}
            className="border rounded-xl overflow-hidden transition-all duration-200"
          >
            {/* Accordion header — always visible */}
            <button
              id={`history-item-${idx}`}
              onClick={() => toggle(item.diagnostic_id)}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/50 transition-colors text-left gap-4"
            >
              {/* Left: attempt number + date */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full gradient-synapse flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  #{history.length - idx}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {item.exam_type.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <CalendarClock className="w-3 h-3 flex-shrink-0" />
                    {formatDateTime(takenAt)}
                  </p>
                </div>
              </div>

              {/* Centre: score + mini strength pills */}
              <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                <span className={`text-2xl font-black ${scoreColor(item.overall_score ?? 0)}`}>
                  {(item.overall_score ?? 0).toFixed(1)}%
                </span>
                <div className="flex gap-1">
                  {weakCount > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${strengthConfig.weak.badgeCls}`}>
                      {weakCount} weak
                    </span>
                  )}
                  {moderateCount > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${strengthConfig.moderate.badgeCls}`}>
                      {moderateCount} mod
                    </span>
                  )}
                  {strongCount > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${strengthConfig.strong.badgeCls}`}>
                      {strongCount} strong
                    </span>
                  )}
                </div>
              </div>

              {/* Right: chevron */}
              <div className="flex-shrink-0 text-muted-foreground">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {/* Accordion body */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-4 border-t bg-muted/20">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  {[
                    { label: 'Score', value: `${(item.overall_score ?? 0).toFixed(1)}%`, cls: scoreColor(item.overall_score ?? 0) },
                    { label: 'Correct', value: `${item.total_correct ?? 0}/${item.total_questions}`, cls: 'text-foreground' },
                    { label: 'Completed', value: formatDateTime(item.completed_at), cls: 'text-foreground' },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="text-center space-y-0.5">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className={`font-bold text-sm ${cls}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Topic breakdown */}
                {breakdown.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Topic Breakdown
                    </p>
                    <TopicBreakdownList breakdown={breakdown} />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Start Screen ─────────────────────────────────────────────────────────────

function StartScreen({
  onStart,
  loading,
  history,
  historyLoading,
  historyError,
}: {
  onStart: () => void;
  loading: boolean;
  history: DiagnosticHistoryItem[];
  historyLoading: boolean;
  historyError: string | null;
}) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center space-y-3 py-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-synapse mb-2 shadow-lg">
          <Target className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold">Diagnostic Assessment</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Take a comprehensive test to identify your strengths and weaknesses
          across all topics. We'll use this to build your personalised study plan.
        </p>
      </div>

      {/* Past Results — shown regardless of history length so loading/empty states appear */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="w-5 h-5 text-primary" />
            Past Results
            {!historyLoading && history.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {history.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PastResultsAccordion
            history={history}
            historyLoading={historyLoading}
            historyError={historyError}
          />
        </CardContent>
      </Card>

      {/* Why take the test */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5 text-primary" />
            Why take the diagnostic test?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              'Get a detailed analysis of your current knowledge level',
              'Receive a personalised study plan based on your results',
              'Identify topics that need more attention first',
              'Set a baseline to track your progress over time',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Test details */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: <Clock className="w-8 h-8 text-primary" />, label: 'Duration', value: 'Per exam type' },
          { icon: <BookOpen className="w-8 h-8 text-primary" />, label: 'Questions', value: 'Adaptive mix' },
          { icon: <Target className="w-8 h-8 text-primary" />, label: 'Topics', value: 'All subjects' },
        ].map(({ icon, label, value }) => (
          <Card key={label}>
            <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
              {icon}
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Before you start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Questions cover all major topics from your exam syllabus.',
            'Unanswered questions are treated as wrong — answer as many as you can.',
            'The test auto-submits when the timer reaches zero.',
            'You can only have one active diagnostic test at a time.',
            'Your results will be used to generate a personalised study plan.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Badge variant="outline" className="min-w-[1.75rem] justify-center font-mono">
                {i + 1}
              </Badge>
              <p className="text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex justify-center pb-4">
        <Button
          id="start-diagnostic-btn"
          size="lg"
          onClick={onStart}
          disabled={loading}
          className="gradient-synapse text-white px-10 py-6 text-base font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Starting test…
            </>
          ) : (
            <>
              <Target className="w-5 h-5 mr-2" />
              Start Diagnostic Test
              <ChevronRight className="w-5 h-5 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────

function QuestionCard({
  question,
  questionNumber,
  selected,
  onSelect,
}: {
  question: { id: string; question_text: string; options: Record<string, string>; difficulty: string };
  questionNumber: number;
  selected: string | undefined;
  onSelect: (qId: string, key: string) => void;
}) {
  const difficultyColors: Record<string, string> = {
    easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  };

  return (
    <Card id={`question-${question.id}`} className="transition-shadow hover:shadow-md">
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium leading-relaxed flex-1">
            <span className="text-primary font-bold mr-2">Q{questionNumber}.</span>
            {question.question_text}
          </p>
          <Badge className={`${difficultyColors[question.difficulty]} flex-shrink-0 capitalize text-xs`}>
            {question.difficulty}
          </Badge>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {Object.entries(question.options).map(([key, value]) => {
            const isSelected = selected === key;
            return (
              <button
                key={key}
                id={`option-${question.id}-${key}`}
                onClick={() => onSelect(question.id, key)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm
                  transition-all duration-150 hover:border-primary/50 hover:bg-primary/5
                  ${isSelected
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border bg-card'
                  }
                `}
              >
                <span
                  className={`
                    inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0
                    ${isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {key}
                </span>
                <span className="leading-snug">{value}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Test Screen ──────────────────────────────────────────────────────────────

function TestScreen({
  testData,
  answers,
  formattedTime,
  isTimeLow,
  progress,
  answeredCount,
  loading,
  onSelect,
  onSubmit,
}: {
  testData: NonNullable<ReturnType<typeof useDiagnosticTest>['testData']>;
  answers: Record<string, string>;
  formattedTime: string;
  isTimeLow: boolean;
  progress: number;
  answeredCount: number;
  loading: boolean;
  onSelect: (qId: string, key: string) => void;
  onSubmit: () => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmitClick = () => {
    if (progress < 100) {
      setShowConfirm(true);
    } else {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div
            className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg border-2
              ${isTimeLow
                ? 'border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30 animate-pulse'
                : 'border-border text-foreground'
              }`}
          >
            <Clock className={`w-5 h-5 ${isTimeLow ? 'text-red-500' : 'text-primary'}`} />
            {formattedTime}
          </div>

          <div className="flex-1 min-w-[200px] space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{answeredCount} of {testData.total_questions} answered</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="gradient-synapse h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button
            id="submit-diagnostic-btn"
            onClick={handleSubmitClick}
            disabled={loading}
            className="gradient-synapse text-white flex-shrink-0"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting…
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Test
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-sm shadow-2xl">
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col items-center text-center gap-2">
                <AlertCircle className="w-10 h-10 text-amber-500" />
                <h3 className="text-lg font-bold">Submit test?</h3>
                <p className="text-muted-foreground text-sm">
                  You have only answered <strong>{answeredCount}</strong> of{' '}
                  <strong>{testData.total_questions}</strong> questions.
                  Unanswered questions count as wrong.
                </p>
              </div>
              <div className="flex gap-3">
                <Button id="cancel-submit-btn" variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
                  Keep going
                </Button>
                <Button
                  id="confirm-submit-btn"
                  className="flex-1 gradient-synapse text-white"
                  onClick={() => { setShowConfirm(false); onSubmit(); }}
                >
                  Yes, submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Topics & Questions */}
      <div className="space-y-10">
        {testData.topics.map((topic) => {
          const topicAnswered = topic.questions.filter((q) => answers[q.id]).length;
          return (
            <div key={topic.topic_id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {topic.topic_name}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {topicAnswered}/{topic.questions.length} answered
                </Badge>
              </div>
              <div className="space-y-4">
                {topic.questions.map((q, idx) => {
                  const globalIdx =
                    testData.topics
                      .slice(0, testData.topics.indexOf(topic))
                      .reduce((acc, t) => acc + t.questions.length, 0) + idx + 1;
                  return (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      questionNumber={globalIdx}
                      selected={answers[q.id]}
                      onSelect={onSelect}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom submit */}
      <div className="flex justify-center py-6">
        <Button
          id="submit-diagnostic-bottom-btn"
          size="lg"
          onClick={handleSubmitClick}
          disabled={loading}
          className="gradient-synapse text-white px-10"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Submit Test
        </Button>
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({
  result,
  onRetake,
}: {
  result: NonNullable<ReturnType<typeof useDiagnosticTest>['result']>;
  onRetake: () => void;
}) {
  const weakCount     = result.topic_breakdown.filter((t) => t.strength_level === 'weak').length;
  const moderateCount = result.topic_breakdown.filter((t) => t.strength_level === 'moderate').length;
  const strongCount   = result.topic_breakdown.filter((t) => t.strength_level === 'strong').length;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-synapse mb-2 shadow-lg">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold">Diagnostic Results</h1>
        <p className="text-muted-foreground">
          {result.exam_type.replace(/_/g, ' ')} — completed{' '}
          <span className="font-medium">{formatDateTime(result.completed_at)}</span>
        </p>
      </div>

      {/* Overall Score */}
      <Card className="border-2 border-primary/30 text-center">
        <CardContent className="pt-8 pb-8 space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Overall Score</p>
          <p className={`text-7xl font-black ${scoreColor(result.overall_score)}`}>
            {result.overall_score.toFixed(1)}<span className="text-3xl">%</span>
          </p>
          <p className="text-muted-foreground">
            {result.total_correct} correct out of {result.total_questions} questions
          </p>
        </CardContent>
      </Card>

      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Needs Work', count: weakCount,     cls: strengthConfig.weak.badgeCls,     icon: <XCircle    className="w-5 h-5" /> },
          { label: 'Improving',  count: moderateCount, cls: strengthConfig.moderate.badgeCls, icon: <Minus      className="w-5 h-5" /> },
          { label: 'Strong',     count: strongCount,   cls: strengthConfig.strong.badgeCls,   icon: <CheckCircle2 className="w-5 h-5" /> },
        ].map(({ label, count, cls, icon }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-5 flex flex-col items-center gap-1 text-center">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${cls}`}>
                {icon}{label}
              </span>
              <p className="text-3xl font-bold mt-1">{count}</p>
              <p className="text-xs text-muted-foreground">topics</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Topic Breakdown */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Topic Breakdown</h2>
        <p className="text-sm text-muted-foreground">Sorted by priority — focus on weak areas first.</p>
        <TopicBreakdownList breakdown={result.topic_breakdown} />
      </div>

      {/* Retake */}
      <div className="flex justify-center pb-6">
        <Button id="retake-diagnostic-btn" variant="outline" size="lg" onClick={onRetake} className="px-8">
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Another Test
        </Button>
      </div>
    </div>
  );
}

// ─── Error Banner ─────────────────────────────────────────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-red-700 dark:text-red-400">
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AssessmentPage() {
  const {
    testData,
    answers,
    result,
    loading,
    error,
    formattedTime,
    isTimeLow,
    progress,
    answeredCount,
    history,
    historyLoading,
    historyError,
    startTest,
    selectAnswer,
    handleSubmit,
    resetTest,
  } = useDiagnosticTest();

  return (
    <div className="space-y-6">
      {error && <ErrorBanner message={error} />}

      {!testData && !result && (
        <StartScreen
          onStart={startTest}
          loading={loading}
          history={history}
          historyLoading={historyLoading}
          historyError={historyError}
        />
      )}

      {testData && !result && (
        <TestScreen
          testData={testData}
          answers={answers}
          formattedTime={formattedTime}
          isTimeLow={isTimeLow}
          progress={progress}
          answeredCount={answeredCount}
          loading={loading}
          onSelect={selectAnswer}
          onSubmit={handleSubmit}
        />
      )}

      {result && (
        <ResultScreen result={result} onRetake={resetTest} />
      )}
    </div>
  );
}
