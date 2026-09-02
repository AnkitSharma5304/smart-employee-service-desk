import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ticketService } from '../services/ticketService';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Send, Clock, User, Tag, History, GitMerge, Link2, Paperclip, Star, AlertTriangle, Eye } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import AttachmentList from '../components/AttachmentList';
import SavedReplyPicker from '../components/SavedReplyPicker';
import { useTicketLock } from '../hooks/useTicketLock';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showDependencyModal, setShowDependencyModal] = useState(false);
  const [mergeTargetId, setMergeTargetId] = useState('');
  const [dependencyData, setDependencyData] = useState({ ticketId: '', type: 'blocks' });
  const [allTickets, setAllTickets] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [surveyLink, setSurveyLink] = useState('');
  
  const { isLocked, lockedBy, isAcquiring, acquireLock, releaseLock } = useTicketLock(id);

  useEffect(() => {
    fetchTicket();
    fetchStatuses();
    fetchAttachments();
    checkExistingSurvey();
    if (user?.role !== 'user') {
      fetchUsers();
    }
    
    if (user?.role !== 'user') {
      acquireLock();
    }
    
    return () => {
      if (user?.role !== 'user') {
        releaseLock();
      }
    };
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTicket(id);
      setTicket(response.data.ticket);
      setReplies(response.data.replies);
      setEditData({
        title: response.data.ticket.title,
        description: response.data.ticket.description,
        priority: response.data.ticket.priority,
      });
    } catch (error) {
      console.error('Failed to fetch ticket:', error);
      toast.error('Failed to load ticket');
      navigate('/tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      const { data } = await api.get('/statuses');
      setStatuses(data.data || []);
    } catch (error) {
      console.error('Failed to fetch statuses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/auth/users');
      setUsers(data.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchAttachments = async () => {
    try {
      const { data } = await api.get(`/attachments/ticket/${id}`);
      setAttachments(data.data || []);
    } catch (error) {
      console.error('Failed to fetch attachments:', error);
    }
  };

  const handleAttachmentDelete = (attachmentId) => {
    setAttachments(attachments.filter(a => a._id !== attachmentId));
  };

  const handleFilesUploaded = (newAttachments) => {
    setAttachments([...newAttachments, ...attachments]);
    setShowFileUpload(false);
    toast.success('Files uploaded successfully');
  };

  const fetchHistory = async () => {
    try {
      const response = await ticketService.getTicketHistory(id);
      setHistory(response.data || []);
      setShowHistory(true);
    } catch (error) {
      console.error('Failed to fetch ticket history:', error);
      toast.error('Failed to load ticket history');
    }
  };

  const fetchAllTickets = async () => {
    try {
      const { data } = await api.get('/tickets?limit=100');
      setAllTickets(data.data.filter(t => t._id !== id) || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  const handleMerge = async () => {
    if (!mergeTargetId) {
      toast.error('Please select a target ticket');
      return;
    }

    try {
      await ticketService.mergeTickets(id, mergeTargetId);
      toast.success('Tickets merged successfully');
      setShowMergeModal(false);
      navigate(`/tickets/${mergeTargetId}`);
    } catch (error) {
      console.error('Failed to merge tickets:', error);
      toast.error(error.response?.data?.message || 'Failed to merge tickets');
    }
  };

  const handleAddDependency = async () => {
    if (!dependencyData.ticketId) {
      toast.error('Please select a ticket');
      return;
    }

    try {
      await ticketService.addDependency(id, dependencyData.ticketId, dependencyData.type);
      toast.success('Dependency added successfully');
      setShowDependencyModal(false);
      fetchTicket();
    } catch (error) {
      console.error('Failed to add dependency:', error);
      toast.error(error.response?.data?.message || 'Failed to add dependency');
    }
  };

  const handleRemoveDependency = async (dependentTicketId) => {
    try {
      await ticketService.removeDependency(id, dependentTicketId);
      toast.success('Dependency removed successfully');
      fetchTicket();
    } catch (error) {
      console.error('Failed to remove dependency:', error);
      toast.error('Failed to remove dependency');
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error('Please write something before sending');
      return;
    }

    setSubmitting(true);
    try {
      const response = await ticketService.addReply(id, replyMessage, isInternal);
      setReplies([...replies, response.data]);
      setReplyMessage('');
      setIsInternal(false);
      toast.success('Message posted successfully');
    } catch (error) {
      console.error('Failed to add reply:', error);
      toast.error(error.response?.data?.message || 'Failed to add reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (statusId) => {
    try {
      const response = await ticketService.changeStatus(id, statusId);
      setTicket(response.data);
      toast.success('Status changed');
    } catch (error) {
      console.error('Failed to change status:', error);
      toast.error("Couldn't update status");
    }
  };

  const handleAssignChange = async (assignedTo) => {
    try {
      const response = await ticketService.assignTicket(id, assignedTo || null);
      setTicket(response.data);
      toast.success('Agent assigned');
    } catch (error) {
      toast.error("Couldn't assign agent");
    }
  };

  const checkExistingSurvey = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/surveys?ticket=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.length > 0) {
        const survey = response.data[0];
        const link = `${window.location.origin}/survey/${survey.token}`;
        setSurveyLink(link);
      }
    } catch (error) {
    }
  };

  const handleCreateSurvey = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/surveys', 
        { ticketId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const surveyToken = response.data.token;
      const link = `${window.location.origin}/survey/${surveyToken}`;
      setSurveyLink(link);
      toast.success('Feedback link created!');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        toast.error('A feedback request already exists');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create survey');
      }
    }
  };

  const handleUpdateTicket = async () => {
    try {
      const response = await ticketService.updateTicket(id, {
        ...editData,
        version: ticket.version,
      });
      setTicket(response.data);
      setEditMode(false);
      toast.success('Ticket updated successfully');
    } catch (error) {
      console.error('Failed to update ticket:', error);
      toast.error(error.response?.data?.message || 'Failed to update ticket');
    }
  };

  const getPriorityClasses = (priority) => {
    const classes = {
      low: 'bg-chart-1/20 text-chart-1',
      medium: 'bg-chart-3/20 text-chart-3',
      high: 'bg-destructive/20 text-destructive',
      critical: 'bg-destructive/30 text-destructive',
    };
    return classes[priority?.toLowerCase()] || classes.medium;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-lg text-muted-foreground">
        Loading ticket...
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  const canEdit = user?.role !== 'user' || ticket.createdBy._id === user?.id;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <button
        onClick={() => navigate('/tickets')}
        className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
      >
        <ArrowLeft size={20} />
        Back to Queue
      </button>

      {isLocked && lockedBy && user?.role !== 'user' && (
        <div className="bg-amber-50/80 border-l-4 border-amber-400 rounded-r-[1.5rem] p-4 mb-6">
          <div className="flex items-start">
            <div className="shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-amber-800">
                This ticket is already open
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  <strong>{lockedBy.name}</strong> is already viewing this ticket.
                  Simultaneous edits may cause conflicts.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-600">
                <Eye size={14} />
                <span>We'll notify them if you begin making changes.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAcquiring && user?.role !== 'user' && (
        <div className="bg-sky-50/80 border-l-4 border-sky-400 rounded-r-[1.5rem] p-4 mb-6">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-600 mr-3"></div>
            <p className="text-sm text-sky-700">Verifying ticket access...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {}
        <div className="lg:col-span-2 space-y-6">
          {}
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {ticket.ticketNumber}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                {editMode ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="mb-2 w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-2xl font-bold text-foreground"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-foreground mb-2">{ticket.title}</h1>
                )}
              </div>
            </div>

            {editMode ? (
              <div className="space-y-4">
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={6}
                  className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-foreground resize-none"
                />
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  className="rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-foreground"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateTicket}
                    className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
                  >
                    Save Edits
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditData({
                        title: ticket.title,
                        description: ticket.description,
                        priority: ticket.priority,
                      });
                    }}
                    className="rounded-2xl bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted/80"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-foreground whitespace-pre-wrap mb-4">{ticket.description}</p>
                {canEdit && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit Details
                  </button>
                )}
              </>
            )}

            {ticket.tags && ticket.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Tag size={16} className="text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {ticket.tags.map((tag, index) => (
                    <span
                      key={index}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {}
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Paperclip size={20} />
                Files ({attachments.length})
              </h2>
              <button
                onClick={() => setShowFileUpload(!showFileUpload)}
                className="rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
              >
                {showFileUpload ? 'Close Upload' : 'Upload Files'}
              </button>
            </div>

            {showFileUpload && (
              <div className="mb-6 rounded-[1.5rem] bg-muted/50 p-4">
                <FileUpload
                  ticketId={id}
                  onUploadComplete={handleFilesUploaded}
                />
              </div>
            )}

            <AttachmentList
              attachments={attachments}
              onDelete={handleAttachmentDelete}
              canDelete={user?.role === 'admin' || attachments.some(a => a.uploadedBy?._id === user?._id)}
            />
          </div>

          {}
          {user?.role !== 'user' && (
            <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
              <button
                onClick={fetchHistory}
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <History size={20} />
                {showHistory ? 'Hide Change Log' : 'View Change Log'}
              </button>

              {showHistory && history.length > 0 && (
                <div className="mt-4 space-y-2">
                  {history.map((item, index) => (
                    <div key={index} className="rounded-2xl border-l-4 border-primary bg-muted p-3 text-sm">
                      <p className="text-foreground">
                        <span className="font-semibold">{item.user?.name || 'System'}</span>{' '}
                        {item.action}
                        {item.field && ` ${item.field}`}
                        {item.oldValue && ` from "${item.oldValue}"`}
                        {item.newValue && ` to "${item.newValue}"`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {}
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
            <h2 className="text-xl font-bold text-foreground mb-4">Conversation Thread</h2>

            <div className="space-y-4 mb-6">
              {replies.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No messages yet — start the conversation below.</p>
              ) : (
                replies.map((reply) => (
                  <div
                    key={reply._id}
                  className={`rounded-[1.5rem] border p-4 ${
                      reply.isInternal
                        ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900'
                        : 'bg-muted border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{reply.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {reply.user.role}
                        </span>
                        {reply.isInternal && (
                          <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded">
                            Private Note
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{reply.message}</p>
                  </div>
                ))
              )}
            </div>

            {}
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                disabled={isLocked && user?.role !== 'user'}
                className={`w-full rounded-[1.5rem] border border-border/70 bg-background/85 px-4 py-3.5 text-foreground resize-none focus:border-primary focus:outline-none ${
                  isLocked && user?.role !== 'user' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                placeholder={isLocked && user?.role !== 'user' ? 'Another team member is editing this ticket right now.' : 'Type your response here...'}
              />
              <div className="flex items-center justify-between gap-3">
                <SavedReplyPicker
                  onSelect={(content) => setReplyMessage(content)}
                  ticketData={ticket}
                />
                <div className="flex items-center gap-3 flex-1 justify-end">
                  {user?.role !== 'user' && (
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isInternal}
                        onChange={(e) => setIsInternal(e.target.checked)}
                        className="w-4 h-4"
                      />
                      Mark as private (invisible to requester)
                    </label>
                  )}
                  <button
                    type="submit"
                    disabled={submitting || !replyMessage.trim() || (isLocked && user?.role !== 'user')}
                    className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={16} />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {}
        <div className="space-y-6">
          {}
          <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
            <h3 className="text-sm font-semibold text-foreground mb-3">Current Status</h3>
            <select
              value={ticket.status._id}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isLocked && user?.role !== 'user'}
              className={`w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-foreground ${
                isLocked && user?.role !== 'user' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {statuses.map((status) => (
                <option key={status._id} value={status._id}>
                  {status.title}
                </option>
              ))}
            </select>
          </div>

          {(ticket.status?.name?.toLowerCase().includes('closed') || 
            ticket.status?.name?.toLowerCase().includes('resolved') || 
            ticket.status?.title?.toLowerCase().includes('closed') || 
            ticket.status?.title?.toLowerCase().includes('resolved')) && (
            <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
              <h3 className="text-sm font-semibold text-foreground mb-3">Satisfaction Feedback</h3>
              
              {user?.role !== 'user' && !surveyLink && (
                <button
                  onClick={handleCreateSurvey}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                >
                  <Star size={16} />
                  Request Feedback
                </button>
              )}

              {surveyLink && (
                <div className="mt-3 rounded-[1.5rem] bg-emerald-50/80 p-3">
                  <p className="text-xs text-emerald-800 mb-2">
                    {user?.role === 'user' ? "We'd love to hear about your experience:" : 'Feedback request ready. Share this URL:'}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={surveyLink}
                      readOnly
                      className="flex-1 rounded-xl border border-emerald-300 bg-white px-2 py-1 text-xs"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(surveyLink);
                        toast.success('Link copied to clipboard!');
                      }}
                      className="rounded-xl bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-700"
                    >
                      Copy
                    </button>
                  </div>
                  {user?.role === 'user' && (
                    <a
                      href={surveyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block w-full rounded-2xl bg-sky-600 px-4 py-2 text-center text-white transition-colors hover:bg-sky-700"
                    >
                      Submit Feedback
                    </a>
                  )}
                </div>
              )}

              {!surveyLink && user?.role === 'user' && (
                <p className="text-sm text-gray-600">
                  Your feedback request will be available once the ticket is fully closed.
                </p>
              )}
            </div>
          )}

          {}
          {user?.role !== 'user' && (
            <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
              <h3 className="text-sm font-semibold text-foreground mb-3">Assigned Agent</h3>
              <select
                value={ticket.assignedTo?._id || ''}
                onChange={(e) => handleAssignChange(e.target.value)}
                disabled={isLocked && user?.role !== 'user'}
                className={`w-full px-3 py-2 border-2 border-border rounded-md bg-background text-foreground ${
                  isLocked && user?.role !== 'user' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <option value="">Unassigned — pick an agent</option>
                {users
                  .filter((u) => u.role === 'admin' || u.role === 'agent')
                  .map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
              </select>
            </div>
          )}

          {}
          <div className="space-y-3 rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
            <h3 className="text-sm font-semibold text-foreground mb-3">Ticket Information</h3>

            <div className="flex items-start gap-2">
              <User size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Submitted By</p>
                <p className="text-sm text-foreground font-medium">{ticket.createdBy.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Date Submitted</p>
                <p className="text-sm text-foreground">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="text-sm text-foreground">
                  {new Date(ticket.lastActivityAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Tag size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Handling Team</p>
                <p className="text-sm text-foreground font-medium">{ticket.department.name}</p>
              </div>
            </div>
          </div>

          {}
          {user?.role !== 'user' && (
            <div className="space-y-3 rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
              <h3 className="text-sm font-semibold text-foreground mb-3">Admin Actions</h3>

              <button
                onClick={() => {
                  fetchAllTickets();
                  setShowMergeModal(true);
                }}
                className="flex w-full items-center gap-2 rounded-2xl bg-muted px-3 py-2.5 text-sm text-foreground transition-all hover:bg-muted/80"
              >
                <GitMerge size={16} />
                Merge with Another Ticket
              </button>

              <button
                onClick={() => {
                  fetchAllTickets();
                  setShowDependencyModal(true);
                }}
                className="flex w-full items-center gap-2 rounded-2xl bg-muted px-3 py-2.5 text-sm text-foreground transition-all hover:bg-muted/80"
              >
                <Link2 size={16} />
                Link to Related Ticket
              </button>
            </div>
          )}

          {}
          {ticket.dependencies && ticket.dependencies.length > 0 && (
            <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
              <h3 className="text-sm font-semibold text-foreground mb-3">Related Tickets</h3>
              <div className="space-y-2">
                {ticket.dependencies.map((dep) => (
                  <div key={dep._id} className="flex items-center justify-between rounded-2xl bg-muted p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {dep.dependentTicket?.ticketNumber}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{dep.type}</p>
                    </div>
                    {user?.role !== 'user' && (
                      <button
                        onClick={() => handleRemoveDependency(dep.dependentTicket._id)}
                        className="text-xs text-destructive hover:text-destructive/80"
                      >
                        Unlink
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {}
      {showMergeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-foreground mb-4">Merge This Ticket</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Choose the target ticket to merge this one into. Note: this cannot be reversed.
            </p>
            <select
              value={mergeTargetId}
              onChange={(e) => setMergeTargetId(e.target.value)}
              className="mb-4 w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-foreground"
            >
              <option value="">Choose the destination ticket...</option>
              {allTickets.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.ticketNumber} - {t.title}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleMerge}
                className="flex-1 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95"
              >
                Confirm Merge
              </button>
              <button
                onClick={() => setShowMergeModal(false)}
                className="rounded-2xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {showDependencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-foreground mb-4">Link a Related Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Relationship Type
                </label>
                <select
                  value={dependencyData.type}
                  onChange={(e) => setDependencyData({ ...dependencyData, type: e.target.value })}
                  className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-foreground"
                >
                  <option value="blocks">Blocks this ticket</option>
                  <option value="blocked_by">Blocked by this ticket</option>
                  <option value="related">Loosely related</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Related Ticket
                </label>
                <select
                  value={dependencyData.ticketId}
                  onChange={(e) => setDependencyData({ ...dependencyData, ticketId: e.target.value })}
                  className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3 text-foreground"
                >
                  <option value="">Choose a ticket to link...</option>
                  {allTickets.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.ticketNumber} - {t.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddDependency}
                className="flex-1 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95"
              >
                Create Link
              </button>
              <button
                onClick={() => setShowDependencyModal(false)}
                className="rounded-2xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
