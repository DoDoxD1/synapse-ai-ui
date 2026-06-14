import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
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
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  path: '/dashboard'   },
  { icon: Target,          label: 'Assessment', path: '/assessment'  },
  { icon: Brain,           label: 'Practice',   path: '/practice'    },
  { icon: FileText,        label: 'Mock Tests', path: '/mock-tests'  },
  { icon: BookOpen,        label: 'Study Plan', path: '/study-plan'  },
  { icon: TrendingUp,      label: 'Analytics',  path: '/analytics'   },
  { icon: MessageSquare,   label: 'AI Tutor',   path: '/ai-tutor'    },
];

export function AppLayout() {
  const user       = useAuthStore((s) => s.user);
  const clearAuth  = useAuthStore((s) => s.clearAuth);
  const navigate   = useNavigate();
  const location   = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = () => { clearAuth(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="md:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-2 ml-4 md:ml-0">
            <div className="w-8 h-8 rounded-full gradient-synapse flex-shrink-0" />
            <span
              className={cn(
                'text-xl font-bold text-gradient-synapse transition-all duration-200 overflow-hidden whitespace-nowrap',
                !sidebarOpen && 'md:opacity-0 md:w-0 md:ml-0'
              )}
            >
              Synapse AI
            </span>
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
        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside
          className={cn(
            // base
            'fixed inset-y-0 left-0 z-40 mt-16 flex flex-col border-r bg-background',
            'transition-[width,transform] duration-200 ease-in-out',
            // mobile: slide in/out
            'w-64',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            // desktop: always visible but can be narrow (icon-only)
            'md:translate-x-0',
            sidebarOpen ? 'md:w-64' : 'md:w-16',
          )}
        >
          {/* Nav items */}
          <nav className="flex flex-col gap-1 p-2 flex-1 overflow-hidden">
            {navItems.map(({ icon: Icon, label, path }) => {
              const active = location.pathname.startsWith(path);
              return (
                <Link key={path} to={path} title={!sidebarOpen ? label : undefined}>
                  <Button
                    variant={active ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full gap-3 transition-all duration-200',
                      sidebarOpen ? 'justify-start px-3' : 'justify-center px-0 md:px-0',
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span
                      className={cn(
                        'transition-all duration-200 overflow-hidden whitespace-nowrap',
                        !sidebarOpen && 'md:w-0 md:opacity-0',
                      )}
                    >
                      {label}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Desktop collapse toggle at bottom */}
          <div className="hidden md:flex p-2 border-t">
            <Button
              id="sidebar-collapse-btn"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              className="w-full"
            >
              {sidebarOpen
                ? <ChevronLeft  className="h-4 w-4" />
                : <ChevronRight className="h-4 w-4" />
              }
            </Button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden mt-16"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* ── Main Content ─────────────────────────────────────────── */}
        <main
          className={cn(
            'flex-1 transition-[margin] duration-200 ease-in-out pt-4 min-h-[calc(100vh-4rem)]',
            // desktop: shift main content based on sidebar width
            sidebarOpen ? 'md:ml-64' : 'md:ml-16',
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
