import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export function ReviewPage() {
  const reviewTopics = [
    {
      topic: 'Physics - Mechanics',
      lastPracticed: '3 days ago',
      nextReview: 'Today',
      mastery: 85,
      status: 'due',
    },
    {
      topic: 'Chemistry - Organic',
      lastPracticed: '1 day ago',
      nextReview: 'Tomorrow',
      mastery: 72,
      status: 'upcoming',
    },
    {
      topic: 'Mathematics - Calculus',
      lastPracticed: '5 days ago',
      nextReview: 'Today',
      mastery: 90,
      status: 'due',
    },
    {
      topic: 'Physics - Thermodynamics',
      lastPracticed: '2 days ago',
      nextReview: 'In 3 days',
      mastery: 65,
      status: 'scheduled',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Spaced Repetition Review</h1>
        <p className="text-muted-foreground">
          Review topics at optimal intervals for better retention
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-sm text-muted-foreground">Due Today</p>
            <p className="text-2xl font-bold mt-1">2 topics</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Calendar className="w-6 h-6 text-yellow-500 mb-2" />
            <p className="text-sm text-muted-foreground">Due This Week</p>
            <p className="text-2xl font-bold mt-1">5 topics</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-sm text-muted-foreground">Reviewed Today</p>
            <p className="text-2xl font-bold mt-1">3 topics</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <BookOpen className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Retention Rate</p>
            <p className="text-2xl font-bold mt-1">87%</p>
          </CardContent>
        </Card>
      </div>

      {/* Review Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Review Schedule</CardTitle>
          <CardDescription>Topics scheduled for spaced repetition review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reviewTopics.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{item.topic}</h3>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'due' ? 'Due Now' : item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground ml-8">
                    <span>Last practiced: {item.lastPracticed}</span>
                    <span>Next review: {item.nextReview}</span>
                    <span>Mastery: {item.mastery}%</span>
                  </div>
                </div>
                <Button
                  variant={item.status === 'due' ? 'default' : 'outline'}
                  className={item.status === 'due' ? 'gradient-synapse text-white' : ''}
                >
                  {item.status === 'due' ? 'Review Now' : 'Preview'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            How Spaced Repetition Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            Our AI automatically schedules review sessions based on your performance and the forgetting curve.
          </p>
          <ul className="text-sm space-y-1 ml-4 list-disc">
            <li>Topics you struggle with are reviewed more frequently</li>
            <li>Well-mastered topics have longer intervals between reviews</li>
            <li>This proven technique improves long-term retention by up to 200%</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
