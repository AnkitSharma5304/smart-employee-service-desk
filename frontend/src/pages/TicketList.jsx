import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search } from 'lucide-react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    department: '',
  });
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchTickets();
    fetchDepartments();
    fetchStatuses();
  }, [search, filters]);

  const fetchTickets = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 20,
        ...(search && { search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.department && { department: filters.department }),
      });

      const { data } = await api.get(`/tickets?${params}`);
      setTickets(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {

      const { data } = await api.get('/departments');

      setDepartments(data.data || []);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

  const fetchStatuses = async () => {
    try {

      const { data } = await api.get('/statuses');

      setStatuses(data.data || []);
    } catch (error) {
      console.error('Failed to fetch statuses:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

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
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(124,58,237,0.08),rgba(255,255,255,0.92),rgba(59,130,246,0.08))] p-6 shadow-[0_20px_60px_rgba(76,29,149,0.08)] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Queue</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Tickets</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Search, filter, and manage active requests across departments and priorities.
          </p>
        </div>
        <Link
          to="/tickets/new"
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(124,58,237,0.28)] transition-all hover:-translate-y-0.5 hover:opacity-95"
        >
          Create Ticket
        </Link>
      </div>

      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="mb-4 flex items-center gap-3 rounded-[1.5rem] border border-border/70 bg-background/85 px-4 py-3 shadow-sm">
          <Search size={20} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-none bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="appearance-none rounded-2xl border border-border/70 bg-background/85 px-4 py-3 pr-10 text-sm text-foreground shadow-sm cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status._id} value={status._id}>
                  {status.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="appearance-none rounded-2xl border border-border/70 bg-background/85 px-4 py-3 pr-10 text-sm text-foreground shadow-sm cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="appearance-none rounded-2xl border border-border/70 bg-background/85 px-4 py-3 pr-10 text-sm text-foreground shadow-sm cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px] text-lg text-muted-foreground">
          Loading tickets...
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/70">
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Ticket #</th>
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Title</th>
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Status</th>
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Priority</th>
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Department</th>
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id} className="border-b border-border/60 transition-colors hover:bg-primary/[0.035]">
                      <td className="px-4 py-4">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-primary font-medium hover:underline"
                        >
                          {ticket.ticketNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-primary font-medium hover:underline"
                        >
                          {ticket.title}
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                          style={{ backgroundColor: ticket.status?.color }}
                        >
                          {ticket.status?.title}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{ticket.department?.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => fetchTickets(page)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-all ${
                    page === pagination.page
                      ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'border-border bg-white/80 text-foreground hover:border-primary/35 hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TicketList;
