import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Brain, Clock } from 'lucide-react';

export function AnalyticsPage() {
  const topicMastery = [
    { topic: 'Physics - Mechanics', mastery: 85, questions: 120, correct: 102 },
    { topic: 'Chemistry - Organic', mastery: 72, questions: 95, correct: 68 },
    { topic: 'Mathematics - Calculus', mastery: 90, questions: 150, correct: 135 },
    { topic: 'Physics - Thermodynamics', mastery: 65, questions: 80, correct: 52 },
    { topic: 'Chemistry - Inorganic', mastery: 78, questions: 110, correct: 86 },
  ];

  const getMasteryColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-green-400';
    if (score >= 50) return 'bg-yellow-400';
    if (score >= 30) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getMasteryLabel = (score: number) => {
    if (score >= 85) return '🔥 Mastered';
    if (score >= 70) return '✅ Good';
    if (score >= 50) return '⚠️ Needs Work';
    return '❌ Critical';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Track your progress and identify areas for improvement
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Brain className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Total Questions</p>
            <p className="text-2xl font-bold mt-1">555</p>
            <p className="text-xs text-green-500 mt-1">+45 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Target className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold mt-1">78%</p>
            <p className="text-xs text-green-500 mt-1">+3% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <TrendingUp className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-2xl font-bold mt-1">72%</p>
            <p className="text-xs text-green-500 mt-1">Above target</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Clock className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Study Time</p>
            <p className="text-2xl font-bold mt-1">45 hrs</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Topic Mastery Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Mastery Heatmap</CardTitle>
          <CardDescription>Your performance across different topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topicMastery.map((topic) => (
              <div key={topic.topic} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{topic.topic}</span>
                  <span className="text-muted-foreground">
                    {topic.mastery.toFixed(0)}% {getMasteryLabel(topic.mastery)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${getMasteryColor(topic.mastery)}`}
                    style={{ width: `${topic.mastery}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{topic.correct}/{topic.questions} correct</span>
                  <span>{((topic.correct / topic.questions) * 100).toFixed(1)}% accuracy</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Legend:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded" />
                  <span>&lt;50%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded" />
                  <span>50-70%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-400 rounded" />
                  <span>70-85%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>&gt;85%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Questions solved per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[45, 52, 48, 65, 70, 68, 75].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary rounded-t" style={{ height: `${(value / 75) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">W{index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Average accuracy by subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: 'Physics', accuracy: 75 },
              { subject: 'Chemistry', accuracy: 78 },
              { subject: 'Mathematics', accuracy: 82 },
            ].map((item) => (
              <div key={item.subject}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.subject}</span>
                  <Badge>{item.accuracy}%</Badge>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
