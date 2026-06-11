import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Brain, Target, TrendingUp, Zap, BookOpen, Award } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized study plans powered by advanced AI algorithms',
    },
    {
      icon: Target,
      title: 'Diagnostic Assessment',
      description: 'Identify your strengths and weaknesses with precision',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your progress with detailed performance metrics',
    },
    {
      icon: Zap,
      title: 'Adaptive Practice',
      description: 'Questions that adjust to your skill level in real-time',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Extensive question bank covering all exam topics',
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Stay motivated with streaks, badges, and leaderboards',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-synapse" />
            <span className="text-xl font-bold text-gradient-synapse">Synapse AI</span>
          </div>
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Master Your Exam with{' '}
          <span className="text-gradient-synapse">AI-Powered Learning</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Personalized study plans, adaptive practice, and real-time analytics
          to help you achieve your target score.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="gradient-synapse text-white">
              Start Learning Free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="gradient-synapse text-white border-0">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students achieving their exam goals with Synapse AI
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Get Started Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 Synapse AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
