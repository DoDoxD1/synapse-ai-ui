import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar, 
  Trophy, 
  Flame,
  BookOpen,
  Clock
} from 'lucide-react';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Questions Solved', value: '247', icon: Brain, color: 'text-purple-500' },
    { label: 'Accuracy', value: '78%', icon: Target, color: 'text-cyan-500' },
    { label: 'Study Streak', value: '12 days', icon: Flame, color: 'text-orange-500' },
    { label: 'XP Points', value: '1,420', icon: Trophy, color: 'text-yellow-500' },
  ];

  const upcomingTasks = [
    { title: 'Physics - Mechanics', type: 'Practice', time: '30 min', status: 'pending' },
    { title: 'Chemistry - Organic', type: 'Review', time: '45 min', status: 'pending' },
    { title: 'Math - Calculus', type: 'Mock Test', time: '1 hour', status: 'scheduled' },
  ];

  const recentActivity = [
    { topic: 'Thermodynamics', questions: 15, correct: 12, time: '2 hours ago' },
    { topic: 'Algebra', questions: 20, correct: 17, time: '1 day ago' },
    { topic: 'Organic Chemistry', questions: 18, correct: 14, time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.full_name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's your learning progress for {user?.exam_type}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Study Plan
            </CardTitle>
            <CardDescription>Your scheduled tasks for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {task.time}
                    </div>
                  </div>
                </div>
                <Badge variant={task.status === 'pending' ? 'default' : 'secondary'}>
                  {task.type}
                </Badge>
              </div>
            ))}
            <Link to="/study-plan">
              <Button variant="outline" className="w-full mt-2">
                View Full Study Plan
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest practice sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{activity.topic}</p>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {activity.correct}/{activity.questions} correct
                  </span>
                  <Badge variant={activity.correct / activity.questions >= 0.7 ? 'default' : 'secondary'}>
                    {Math.round((activity.correct / activity.questions) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
            <Link to="/analytics">
              <Button variant="outline" className="w-full mt-2">
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/practice">
              <Button className="w-full h-24 flex flex-col gap-2">
                <Brain className="w-8 h-8" />
                <span>Practice</span>
              </Button>
            </Link>
            <Link to="/mock-tests">
              <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                <Target className="w-8 h-8" />
                <span>Mock Test</span>
              </Button>
            </Link>
            <Link to="/ai-tutor">
              <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                <BookOpen className="w-8 h-8" />
                <span>AI Tutor</span>
              </Button>
            </Link>
            <Link to="/analytics">
              <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                <TrendingUp className="w-8 h-8" />
                <span>Analytics</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
