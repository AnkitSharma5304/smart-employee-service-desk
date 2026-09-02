import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ticketService } from '../services/ticketService';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Paperclip, FileText } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import TicketTemplatePicker from '../components/TicketTemplatePicker';

const CreateTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState(null);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    department: '',
    tags: '',
  });

  useEffect(() => {
    fetchDepartments();

    if (location.state?.template) {
      handleTemplateSelect(location.state.template);
    }
  }, [location]);

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/departments');
      setDepartments(data.data || []);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      toast.error('Failed to load departments');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData({
      title: template.title,
      description: template.content,
      priority: template.priority.charAt(0).toUpperCase() + template.priority.slice(1),
      department: template.department?._id || '',
      tags: template.tags?.join(', ') || '',
    });
    setShowTemplatePicker(false);
    toast.success(`Template "${template.name}" loaded`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a summary');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please provide details about the issue');
      return;
    }
    if (!formData.department) {
      toast.error('Please select a team for this ticket');
      return;
    }

    setLoading(true);
    try {
      const ticketData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      };

      const response = await ticketService.createTicket(ticketData);
      setCreatedTicketId(response.data._id);
      toast.success('Ticket created successfully!');

      setShowFileUpload(true);
    } catch (error) {
      console.error('Failed to create ticket:', error);
      toast.error(error.response?.data?.message || 'Failed to create ticket');
      setLoading(false);
    }
  };

  const handleSkipFiles = () => {
    navigate(`/tickets/${createdTicketId}`);
  };

  const handleFilesUploaded = () => {
    navigate(`/tickets/${createdTicketId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(255,255,255,0.94),rgba(20,184,166,0.10))] p-6 shadow-[0_20px_60px_rgba(14,165,233,0.10)] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Submit Request</p>
          <h1 className="text-3xl font-bold text-foreground">Raise a New Ticket</h1>
          {selectedTemplate && (
            <p className="text-sm text-muted-foreground mt-1">
              Template loaded: <span className="font-medium">{selectedTemplate.name}</span>
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowTemplatePicker(true)}
            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(14,165,233,0.28)] transition-all hover:-translate-y-0.5 hover:opacity-95"
          >
            <FileText size={20} />
            Browse Templates
          </button>
          <button
            onClick={() => navigate('/tickets')}
            className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white/75 px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
          >
            <ArrowLeft size={20} />
            Return to Queue
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
        {!showFileUpload ? (
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                Short Summary <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3.5 text-foreground shadow-sm focus:border-primary focus:outline-none"
                placeholder="Summarize the problem in a few words"
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Detailed Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3.5 text-foreground shadow-sm resize-none focus:border-primary focus:outline-none"
                placeholder="Provide full details: steps to reproduce, error messages, expected behavior, etc."
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-foreground mb-2">
                Urgency Level <span className="text-destructive">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3.5 text-foreground shadow-sm cursor-pointer focus:border-primary focus:outline-none"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-foreground mb-2">
                Assign to Team <span className="text-destructive">*</span>
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3.5 text-foreground shadow-sm cursor-pointer focus:border-primary focus:outline-none"
                required
              >
                <option value="">Choose a team...</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="tags" className="block text-sm font-semibold text-foreground mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-2xl border border-border/70 bg-background/85 px-4 py-3.5 text-foreground shadow-sm focus:border-primary focus:outline-none"
                placeholder="Add relevant tags (e.g., bug, billing, api-issue)"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use commas to separate multiple tags
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border/70">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(14,165,233,0.28)] transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/tickets')}
              className="rounded-2xl bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted/80"
            >
              Cancel
            </button>
          </div>
        </form>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-border/70 pb-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Paperclip size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Attach Files (Optional)
              </h2>
              <p className="text-muted-foreground">
                Drop screenshots, error logs, or relevant files here to speed up resolution.
              </p>
            </div>

            <FileUpload
              ticketId={createdTicketId}
              onUploadComplete={handleFilesUploaded}
            />

            <div className="flex gap-4 pt-4 border-t border-border/70">
              <button
                onClick={handleFilesUploaded}
                className="flex-1 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95"
              >
                View My Ticket
              </button>
              <button
                onClick={handleSkipFiles}
                className="rounded-2xl bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted/80"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>

      {}
      {showTemplatePicker && (
        <TicketTemplatePicker
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}
    </div>
  );
};

export default CreateTicket;
