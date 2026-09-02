import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Ticket, Users, FolderOpen, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    myTickets: 0,
    escalatedTickets: 0,
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/tickets?limit=5');
      setRecentTickets(data.data);

      const total = data.pagination.total;
      const open = data.data.filter(t => t.status?.includeInActive).length;
      const mine = data.data.filter(t =>
        t.createdBy?._id === user._id || t.assignedTo?._id === user._id
      ).length;
      const escalated = data.data.filter(t => t.status?.title === 'Escalated').length;

      setStats({
        totalTickets: total,
        openTickets: open,
        myTickets: mine,
        escalatedTickets: escalated,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-lg text-muted-foreground">
        Loading your dashboard...
      </div>
    );
  }

  const getPriorityClasses = (priority) => {
    const classes = {
      low: 'bg-chart-1/20 text-chart-1',
      medium: 'bg-chart-3/20 text-chart-3',
      high: 'bg-destructive/20 text-destructive',
      critical: 'bg-destructive/30 text-destructive',
    };
    return classes[priority.toLowerCase()] || classes.medium;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(6,182,212,0.10),rgba(255,255,255,0.92),rgba(99,102,241,0.10))] p-6 shadow-[0_20px_60px_rgba(8,145,178,0.10)] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Snapshot</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Your Workspace Overview</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor ticket volume, check active queues, and dive into your latest support activity at a glance.
          </p>
        </div>
        <Link
          to="/tickets/new"
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(8,145,178,0.28)] transition-all hover:-translate-y-0.5 hover:opacity-95"
        >
          New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Ticket size={24} />
          </div>
          <h3 className="text-sm text-muted-foreground">All Tickets</h3>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.totalTickets}</p>
          <p className="mt-2 text-sm text-muted-foreground">Every request currently tracked across your organization.</p>
        </div>

        <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-sky-500 text-primary-foreground shadow-lg shadow-primary/20">
            <FolderOpen size={24} />
          </div>
          <h3 className="text-sm text-muted-foreground">Active Tickets</h3>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.openTickets}</p>
          <p className="mt-2 text-sm text-muted-foreground">Requests that are in progress and awaiting resolution.</p>
        </div>

        <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-chart-1 text-white shadow-lg shadow-emerald-500/20">
            <Users size={24} />
          </div>
          <h3 className="text-sm text-muted-foreground">Assigned To Me</h3>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.myTickets}</p>
          <p className="mt-2 text-sm text-muted-foreground">Tickets you've submitted or that are currently assigned to you.</p>
        </div>

        <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-blue-500/20">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-sm text-muted-foreground">Flagged & Escalated</h3>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.escalatedTickets}</p>
          <p className="mt-2 text-sm text-muted-foreground">Critical issues that have been escalated for immediate attention.</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Latest Activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your most recent tickets and any updates across queues.</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {recentTickets.map((ticket) => (
            <Link
              key={ticket._id}
              to={`/tickets/${ticket._id}`}
              className="rounded-[1.5rem] border border-border/70 bg-background/85 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="font-semibold text-primary">{ticket.ticketNumber}</span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: ticket.status?.color }}
                >
                  {ticket.status?.title}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">{ticket.title}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span>{ticket.department?.name}</span>
                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
