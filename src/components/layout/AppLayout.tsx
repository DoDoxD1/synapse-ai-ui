import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Brain, 
  BookOpen, 
  TrendingUp, 
  Target, 
  FileText,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Target, label: 'Assessment', path: '/assessment' },
    { icon: Brain, label: 'Practice', path: '/practice' },
    { icon: FileText, label: 'Mock Tests', path: '/mock-tests' },
    { icon: BookOpen, label: 'Study Plan', path: '/study-plan' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: MessageSquare, label: 'AI Tutor', path: '/ai-tutor' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2 ml-4 md:ml-0">
            <div className="w-8 h-8 rounded-full gradient-synapse" />
            <span className="text-xl font-bold text-gradient-synapse">Synapse AI</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="text-sm">
                <div className="font-medium">{user?.full_name}</div>
                <div className="text-xs text-muted-foreground">{user?.exam_type}</div>
              </div>
            </div>
            
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0 mt-16",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-200 ease-in-out pt-4",
            sidebarOpen ? "md:ml-64" : ""
          )}
        >
          <div className="container mx-auto px-4 md:px-6 pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
