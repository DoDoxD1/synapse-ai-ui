import { RegisterForm } from '@/components/auth/RegisterForm';

export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full gradient-synapse" />
            <span className="text-2xl font-bold text-gradient-synapse">Synapse AI</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Start your journey to exam success</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
