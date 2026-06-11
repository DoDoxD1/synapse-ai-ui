import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, CheckCircle2 } from 'lucide-react';

export function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    { 
      id: '1', 
      name: 'Physics - Mechanics', 
      mastery: 75, 
      questions: 120, 
      difficulty: 'Medium',
      color: 'bg-purple-500'
    },
    { 
      id: '2', 
      name: 'Chemistry - Organic', 
      mastery: 60, 
      questions: 95, 
      difficulty: 'Hard',
      color: 'bg-cyan-500'
    },
    { 
      id: '3', 
      name: 'Mathematics - Calculus', 
      mastery: 85, 
      questions: 150, 
      difficulty: 'Medium',
      color: 'bg-orange-500'
    },
    { 
      id: '4', 
      name: 'Physics - Thermodynamics', 
      mastery: 45, 
      questions: 80, 
      difficulty: 'Hard',
      color: 'bg-purple-500'
    },
    { 
      id: '5', 
      name: 'Chemistry - Inorganic', 
      mastery: 70, 
      questions: 110, 
      difficulty: 'Easy',
      color: 'bg-cyan-500'
    },
    { 
      id: '6', 
      name: 'Mathematics - Algebra', 
      mastery: 90, 
      questions: 130, 
      difficulty: 'Easy',
      color: 'bg-orange-500'
    },
  ];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Practice Sessions</h1>
        <p className="text-muted-foreground">
          Select a topic to start practicing adaptive questions
        </p>
      </div>

      {/* Practice Modes */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-primary">
          <CardContent className="pt-6">
            <Brain className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Adaptive Practice</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered questions that adapt to your skill level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Topic Mastery</h3>
            <p className="text-sm text-muted-foreground">
              Focus on specific topics to improve mastery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Play className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Mixed Practice</h3>
            <p className="text-sm text-muted-foreground">
              Practice random questions from multiple topics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Topics Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Select a Topic</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Card 
              key={topic.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTopic === topic.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                  <Badge className={getDifficultyColor(topic.difficulty)}>
                    {topic.difficulty}
                  </Badge>
                </div>
                <CardDescription>
                  {topic.questions} questions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mastery</span>
                    <span className="font-semibold">{topic.mastery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getMasteryColor(topic.mastery)}`}
                      style={{ width: `${topic.mastery}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Start Practice Button */}
      {selectedTopic && (
        <div className="flex justify-center">
          <Button size="lg" className="gradient-synapse text-white">
            <Play className="w-5 h-5 mr-2" />
            Start Practice Session
          </Button>
        </div>
      )}
    </div>
  );
}
