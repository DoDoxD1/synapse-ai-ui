import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Target, TrendingUp } from 'lucide-react';

export function MockTestPage() {
  const mockTests = [
    {
      id: '1',
      name: 'Full Length Test #1',
      duration: 180,
      questions: 90,
      difficulty: 'Hard',
      status: 'Not Started',
      topics: ['Physics', 'Chemistry', 'Mathematics'],
    },
    {
      id: '2',
      name: 'Physics Sectional Test',
      duration: 60,
      questions: 30,
      difficulty: 'Medium',
      status: 'Completed',
      score: 75,
      topics: ['Physics'],
    },
    {
      id: '3',
      name: 'Chemistry Sectional Test',
      duration: 60,
      questions: 30,
      difficulty: 'Medium',
      status: 'In Progress',
      topics: ['Chemistry'],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mock Tests</h1>
        <p className="text-muted-foreground">
          Take full-length and sectional tests to prepare for your exam
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <FileText className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Tests Taken</p>
            <p className="text-2xl font-bold mt-1">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Target className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-2xl font-bold mt-1">72%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <TrendingUp className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Best Score</p>
            <p className="text-2xl font-bold mt-1">85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Clock className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Time Saved</p>
            <p className="text-2xl font-bold mt-1">12 min</p>
          </CardContent>
        </Card>
      </div>

      {/* Mock Tests List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Tests</h2>
        <div className="grid gap-4">
          {mockTests.map((test) => (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 mb-2">
                      {test.name}
                      <Badge className={getDifficultyColor(test.difficulty)}>
                        {test.difficulty}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {test.topics.join(', ')}
                    </CardDescription>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(test.status)}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{test.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>{test.questions} questions</span>
                    </div>
                    {test.score && (
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{test.score}% scored</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {test.status === 'Completed' && (
                      <Button variant="outline">View Results</Button>
                    )}
                    {test.status === 'In Progress' && (
                      <Button>Resume Test</Button>
                    )}
                    {test.status === 'Not Started' && (
                      <Button className="gradient-synapse text-white">Start Test</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
