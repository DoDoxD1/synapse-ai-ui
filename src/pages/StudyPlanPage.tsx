import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, CheckCircle2, Circle } from 'lucide-react';

export function StudyPlanPage() {
  const weeklyPlan = [
    {
      day: 'Monday',
      tasks: [
        { topic: 'Physics - Newton\'s Laws', duration: 45, type: 'Learn', completed: true },
        { topic: 'Math - Trigonometry', duration: 30, type: 'Practice', completed: true },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { topic: 'Chemistry - Equilibrium', duration: 60, type: 'Learn', completed: true },
        { topic: 'Physics - Work & Energy', duration: 30, type: 'Review', completed: false },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { topic: 'Math - Calculus Basics', duration: 45, type: 'Practice', completed: false },
        { topic: 'Chemistry - Organic Reactions', duration: 45, type: 'Learn', completed: false },
      ],
    },
    {
      day: 'Thursday',
      tasks: [
        { topic: 'Physics - Electrostatics', duration: 60, type: 'Learn', completed: false },
        { topic: 'Math - Integration', duration: 30, type: 'Practice', completed: false },
      ],
    },
    {
      day: 'Friday',
      tasks: [
        { topic: 'Chemistry - Periodic Table', duration: 45, type: 'Review', completed: false },
        { topic: 'Mock Test - Mixed Topics', duration: 90, type: 'Test', completed: false },
      ],
    },
  ];

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'Learn': return 'bg-blue-100 text-blue-800';
      case 'Practice': return 'bg-green-100 text-green-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Test': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Study Plan</h1>
        <p className="text-muted-foreground">
          AI-generated personalized schedule to achieve your target score
        </p>
      </div>

      {/* Plan Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Study Hours</p>
            <p className="text-2xl font-bold mt-1">25 hrs/week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
            <p className="text-2xl font-bold mt-1">12/35</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Days to Exam</p>
            <p className="text-2xl font-bold mt-1">120 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completion</p>
            <p className="text-2xl font-bold mt-1">34%</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            This Week's Schedule
          </CardTitle>
          <CardDescription>Week 5 of 20 - Stay on track!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weeklyPlan.map((dayPlan, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  {dayPlan.day}
                  <Badge variant="outline" className="ml-auto">
                    {dayPlan.tasks.filter(t => t.completed).length}/{dayPlan.tasks.length} completed
                  </Badge>
                </h3>
                <div className="space-y-2">
                  {dayPlan.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        task.completed ? 'bg-muted/50' : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.topic}
                          </p>
                          <p className="text-sm text-muted-foreground">{task.duration} minutes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTaskColor(task.type)}>{task.type}</Badge>
                        {!task.completed && (
                          <Button size="sm" variant="outline">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline">Adjust Schedule</Button>
        <Button variant="outline">Skip to Next Week</Button>
      </div>
    </div>
  );
}
