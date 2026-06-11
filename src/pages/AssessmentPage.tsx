import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function AssessmentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Diagnostic Assessment</h1>
        <p className="text-muted-foreground">
          Take a comprehensive test to identify your strengths and weaknesses
        </p>
      </div>

      {/* Assessment Info */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Why Take a Diagnostic Test?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <span>Get a detailed analysis of your current knowledge level</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <span>Receive a personalized study plan based on your results</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <span>Identify topics that need more attention</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <span>Set a baseline to track your progress</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Test Details */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Clock className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Duration</h3>
            <p className="text-2xl font-bold">90 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Target className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Questions</h3>
            <p className="text-2xl font-bold">60 questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <AlertCircle className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Topics Covered</h3>
            <p className="text-2xl font-bold">All subjects</p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge>1</Badge>
            <p>The test covers all major topics from your exam syllabus</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge>2</Badge>
            <p>You have 90 minutes to complete all 60 questions</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge>3</Badge>
            <p>Questions are a mix of easy, medium, and hard difficulty levels</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge>4</Badge>
            <p>Your results will be used to create a personalized study plan</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge>5</Badge>
            <p>You can pause the test and resume later if needed</p>
          </div>
        </CardContent>
      </Card>

      {/* Start Test Button */}
      <div className="flex justify-center">
        <Button size="lg" className="gradient-synapse text-white">
          <Target className="w-5 h-5 mr-2" />
          Start Diagnostic Test
        </Button>
      </div>
    </div>
  );
}
