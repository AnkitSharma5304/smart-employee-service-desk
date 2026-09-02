import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  FolderOpen,
  Settings,
  LogOut, 
  TrendingUp,
  Users,
  BarChart3,
  Grid3x3,
  MessageSquare,
  FileText,
  Star,
  BellRing,
  ShieldCheck
} from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const primaryLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'agent', 'user'] },
    { to: '/tickets', label: 'Tickets', icon: Ticket, roles: ['admin', 'agent', 'user'] },
    { to: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'agent', 'user'] },
    { to: '/dashboard/custom', label: 'Custom Dashboard', icon: Grid3x3, roles: ['admin', 'agent', 'user'] },
    { to: '/surveys', label: 'Surveys', icon: Star, roles: ['admin', 'agent', 'user'] },
  ];

  const managementLinks = [
    { to: '/saved-replies', label: 'Saved Replies', icon: MessageSquare, roles: ['admin', 'agent'] },
    { to: '/ticket-templates', label: 'Ticket Templates', icon: FileText, roles: ['admin', 'agent'] },
    { to: '/departments', label: 'Departments', icon: FolderOpen, roles: ['admin', 'agent'] },
    { to: '/statuses', label: 'Statuses', icon: Settings, roles: ['admin', 'agent'] },
    { to: '/users', label: 'Users', icon: Users, roles: ['admin', 'agent'] },
    { to: '/escalations', label: 'Escalation Rules', icon: TrendingUp, roles: ['admin'] },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
        : 'text-sidebar-foreground/80 hover:bg-white/70 hover:text-sidebar-foreground'
    }`;

  const canAccess = (roles) => roles.includes(user?.role);

  return (
    <div className="flex min-h-screen bg-transparent">
      <aside className="fixed inset-y-4 left-4 z-20 hidden w-72 overflow-hidden rounded-[2rem] border border-white/60 bg-sidebar/90 shadow-[0_24px_80px_rgba(109,40,217,0.14)] backdrop-blur xl:flex xl:flex-col">
        <div className="border-b border-sidebar-border/70 px-6 py-6">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
            <ShieldCheck size={14} />
            Support Desk
          </div>
          <h2 className="text-2xl font-bold text-sidebar-foreground">Service Console</h2>
          <p className="mt-1 text-sm text-muted-foreground capitalize">
            {user?.role} workspace
          </p>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-5">
          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Overview
            </p>
            {primaryLinks
              .filter((item) => canAccess(item.roles))
              .map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === '/'} className={linkClasses}>
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-white/70 transition-colors group-hover:bg-white/90">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1">{label}</span>
                </NavLink>
              ))}
          </div>

          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Management
            </p>
            {managementLinks
              .filter((item) => canAccess(item.roles))
              .map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={linkClasses}>
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-white/70">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1">{label}</span>
                </NavLink>
              ))}
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <BellRing size={16} className="text-primary" />
              Productivity Tip
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Keep ticket updates clear and short so agents and customers can follow the full history faster.
            </p>
          </div>
        </nav>

        <div className="border-t border-sidebar-border/70 p-4">
          <div className="mb-4 rounded-[1.5rem] bg-white/75 p-4">
            <p className="font-semibold text-sidebar-foreground">{user?.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 px-3 py-3 text-sm font-semibold text-destructive transition-all hover:bg-destructive/15"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="min-h-screen flex-1 xl:pl-[19rem]">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-4 overflow-x-auto xl:hidden">
            <div className="flex min-w-max gap-3 rounded-[1.75rem] border border-white/65 bg-white/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
              {[...primaryLinks, ...managementLinks]
                .filter((item) => canAccess(item.roles))
                .map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                          : 'bg-white/70 text-foreground/80 hover:bg-white hover:text-foreground'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                ))}
            </div>
          </div>

          <div className="sticky top-4 z-10 mb-8 rounded-[2rem] border border-white/65 bg-white/75 px-6 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Support Desk Workspace</p>
                <h1 className="mt-1 text-2xl font-bold text-foreground">
                  Welcome back, {user?.name?.split(' ')[0] || 'there'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage requests, collaborate faster, and keep every support queue in sync.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold capitalize text-primary">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/55 bg-white/55 p-4 shadow-[0_24px_80px_rgba(148,163,184,0.12)] backdrop-blur-sm sm:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
