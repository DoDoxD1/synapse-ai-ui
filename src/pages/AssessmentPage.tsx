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
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Minus,
  BookOpen,
  Zap,
  Award,
  XCircle,
} from 'lucide-react';
import type { StrengthLevel } from '@/types/diagnostic.types';

// ─── Strength helpers ────────────────────────────────────────────────────────

const strengthConfig: Record<
  StrengthLevel,
  {
    label: string;
    icon: React.ReactNode;
    badgeCls: string;
    borderCls: string;
    bgCls: string;
    textCls: string;
  }
> = {
  weak: {
    label: 'Needs Work',
    icon: <TrendingDown className="w-3.5 h-3.5" />,
    badgeCls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    borderCls: 'border-l-4 border-red-500',
    bgCls: 'bg-red-50 dark:bg-red-950/20',
    textCls: 'text-red-600 dark:text-red-400',
  },
  moderate: {
    label: 'Improving',
    icon: <Minus className="w-3.5 h-3.5" />,
    badgeCls:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    borderCls: 'border-l-4 border-amber-500',
    bgCls: 'bg-amber-50 dark:bg-amber-950/20',
    textCls: 'text-amber-600 dark:text-amber-400',
  },
  strong: {
    label: 'Strong',
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    badgeCls:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    borderCls: 'border-l-4 border-emerald-500',
    bgCls: 'bg-emerald-50 dark:bg-emerald-950/20',
    textCls: 'text-emerald-600 dark:text-emerald-400',
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StartScreen({
  onStart,
  loading,
}: {
  onStart: () => void;
  loading: boolean;
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
        {/* Question header */}
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium leading-relaxed flex-1">
            <span className="text-primary font-bold mr-2">Q{questionNumber}.</span>
            {question.question_text}
          </p>
          <Badge className={`${difficultyColors[question.difficulty]} flex-shrink-0 capitalize text-xs`}>
            {question.difficulty}
          </Badge>
        </div>

        {/* Options */}
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
          {/* Timer */}
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

          {/* Progress */}
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

          {/* Submit */}
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
                <Button
                  id="cancel-submit-btn"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowConfirm(false)}
                >
                  Keep going
                </Button>
                <Button
                  id="confirm-submit-btn"
                  className="flex-1 gradient-synapse text-white"
                  onClick={() => {
                    setShowConfirm(false);
                    onSubmit();
                  }}
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
              {/* Topic header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {topic.topic_name}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {topicAnswered}/{topic.questions.length} answered
                </Badge>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {topic.questions.map((q, idx) => {
                  // Calculate global question number
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
  const weakCount = result.topic_breakdown.filter((t) => t.strength_level === 'weak').length;
  const moderateCount = result.topic_breakdown.filter((t) => t.strength_level === 'moderate').length;
  const strongCount = result.topic_breakdown.filter((t) => t.strength_level === 'strong').length;

  const scoreColor =
    result.overall_score >= 70
      ? 'text-emerald-600 dark:text-emerald-400'
      : result.overall_score >= 40
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-red-600 dark:text-red-400';

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-synapse mb-2 shadow-lg">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold">Diagnostic Results</h1>
        <p className="text-muted-foreground">
          {result.exam_type.replace('_', ' ')} — completed
        </p>
      </div>

      {/* Overall Score */}
      <Card className="border-2 border-primary/30 text-center">
        <CardContent className="pt-8 pb-8 space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Overall Score
          </p>
          <p className={`text-7xl font-black ${scoreColor}`}>
            {result.overall_score.toFixed(1)}
            <span className="text-3xl">%</span>
          </p>
          <p className="text-muted-foreground">
            {result.total_correct} correct out of {result.total_questions} questions
          </p>
        </CardContent>
      </Card>

      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Needs Work', count: weakCount, cls: strengthConfig.weak.badgeCls, icon: <XCircle className="w-5 h-5" /> },
          { label: 'Improving', count: moderateCount, cls: strengthConfig.moderate.badgeCls, icon: <Minus className="w-5 h-5" /> },
          { label: 'Strong', count: strongCount, cls: strengthConfig.strong.badgeCls, icon: <CheckCircle2 className="w-5 h-5" /> },
        ].map(({ label, count, cls, icon }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-5 flex flex-col items-center gap-1 text-center">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${cls}`}>
                {icon}
                {label}
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
        <p className="text-sm text-muted-foreground">
          Sorted by priority — focus on weak areas first.
        </p>
        <div className="space-y-3">
          {result.topic_breakdown.map((topic) => {
            const cfg = strengthConfig[topic.strength_level];
            const pct = topic.score_percent;
            return (
              <div
                key={topic.topic_id}
                className={`rounded-xl p-4 ${cfg.bgCls} ${cfg.borderCls} space-y-3`}
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="font-semibold">{topic.topic_name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.badgeCls}`}
                    >
                      {cfg.icon}
                      {cfg.label}
                    </span>
                    <span className={`font-bold text-sm ${cfg.textCls}`}>
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      topic.strength_level === 'strong'
                        ? 'bg-emerald-500'
                        : topic.strength_level === 'moderate'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Retake */}
      <div className="flex justify-center pb-6">
        <Button
          id="retake-diagnostic-btn"
          variant="outline"
          size="lg"
          onClick={onRetake}
          className="px-8"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Another Test
        </Button>
      </div>
    </div>
  );
}

// ─── Error Banner ─────────────────────────────────────────────────────────────

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-red-700 dark:text-red-400">
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      <button onClick={onDismiss} className="text-red-400 hover:text-red-600 flex-shrink-0">
        <XCircle className="w-4 h-4" />
      </button>
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
    startTest,
    selectAnswer,
    handleSubmit,
    resetTest,
  } = useDiagnosticTest();

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <ErrorBanner
          message={error}
          onDismiss={() => {
            /* errors auto-clear on next action; just show a manual dismiss option */
          }}
        />
      )}

      {/* Screens */}
      {!testData && !result && (
        <StartScreen onStart={startTest} loading={loading} />
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
