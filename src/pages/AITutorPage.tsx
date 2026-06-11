import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

export function AITutorPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI tutor. Ask me anything about your exam topics, request explanations, or get help with practice problems.',
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, { role: 'user', content: message }]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I understand your question. Let me help you with that...',
        },
      ]);
    }, 1000);
  };

  const quickActions = [
    'Explain Newton\'s Laws',
    'Solve a calculus problem',
    'Organic chemistry reactions',
    'Tips for time management',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Tutor</h1>
        <p className="text-muted-foreground">
          Get instant help with explanations, problem solving, and study tips
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat with AI Tutor
            </CardTitle>
            <CardDescription>Ask questions and get detailed explanations</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="space-y-4 mb-4 h-96 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold">AI Tutor</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask your question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Popular topics to explore</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setMessage(action)}
                >
                  {action}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge>✓</Badge>
                <span className="text-sm">Explain complex concepts</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge>✓</Badge>
                <span className="text-sm">Solve practice problems</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge>✓</Badge>
                <span className="text-sm">Provide study strategies</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge>✓</Badge>
                <span className="text-sm">Answer doubts instantly</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
