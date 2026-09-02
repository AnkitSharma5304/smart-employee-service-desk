import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Check } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;
    let strength = 'weak';
    let color = 'bg-destructive';

    if (passedChecks >= 5) {
      strength = 'strong';
      color = 'bg-chart-1';
    } else if (passedChecks >= 3) {
      strength = 'medium';
      color = 'bg-chart-3';
    }

    return { checks, strength, color, passedChecks };
  };

  const passwordValidation = formData.password ? validatePassword(formData.password) : null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordValidation && passwordValidation.passedChecks < 4) {
      toast.error('Please create a stronger password');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[6%] h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute bottom-[8%] right-[10%] h-80 w-80 rounded-full bg-cyan-400/18 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/65 bg-white/70 shadow-[0_30px_120px_rgba(76,29,149,0.16)] backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden xl:flex flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_28%),linear-gradient(160deg,#0d9488_0%,#06b6d4_40%,#4f46e5_100%)] p-12 text-white">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
              Start with NexaDesk
            </div>
            <h1 className="mt-8 max-w-lg text-5xl font-bold leading-tight">
              Transform how your team handles support, starting today.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
              Set up your account and begin organizing tickets with a refined interface built for productive teams.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex items-start gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-white" size={22} />
                <div>
                  <h3 className="text-lg font-semibold">A single source of truth</h3>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Submit, prioritize, assign, and resolve tickets using a workflow designed with support teams in mind.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">Fast</p>
                  <p className="mt-1 text-xs text-white/70">Quick setup</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">Secure</p>
                  <p className="mt-1 text-xs text-white/70">Bank-grade security</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">Shared</p>
                  <p className="mt-1 text-xs text-white/70">Full context</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Fast team onboarding</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Get your team up and running in minutes with a simple, guided setup flow.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Better team alignment</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Keep canned replies, templates, and team conversations perfectly synchronized.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-white/60">© 2026 NexaDesk. Crafted for modern teams.</div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-lg">
            <div className="mb-8">
              <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Get Started
              </div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground">Set up your workspace</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Join NexaDesk to manage tickets, collaborate seamlessly, and organize every request in one elegant platform.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
              <button
                onClick={handleGoogleSignup}
                className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-border/80 bg-white px-4 py-3.5 text-base font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up using Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/80"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="rounded-full bg-white px-4 text-muted-foreground">Or sign up with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-border/80 bg-background/80 py-3.5 pl-12 pr-4 text-base text-foreground shadow-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-border/80 bg-background/80 py-3.5 pl-12 pr-4 text-base text-foreground shadow-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a strong password"
                      className="w-full rounded-2xl border border-border/80 bg-background/80 py-3.5 pl-12 pr-12 text-base text-foreground shadow-sm focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {formData.password && passwordValidation && (
                    <div className="mt-4 rounded-[1.5rem] border border-border/70 bg-background/60 p-4">
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Password strength</span>
                          <span
                            className={`font-semibold capitalize ${
                              passwordValidation.strength === 'strong'
                                ? 'text-chart-1'
                                : passwordValidation.strength === 'medium'
                                  ? 'text-chart-3'
                                  : 'text-destructive'
                            }`}
                          >
                            {passwordValidation.strength}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full transition-all duration-300 ${passwordValidation.color}`}
                            style={{ width: `${(passwordValidation.passedChecks / 5) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className={`flex items-center gap-2 ${passwordValidation.checks.length ? 'text-chart-1' : 'text-muted-foreground'}`}>
                          {passwordValidation.checks.length ? <Check size={16} className="shrink-0" /> : <X size={16} className="shrink-0" />}
                          <span>At least 8 characters</span>
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.checks.uppercase ? 'text-chart-1' : 'text-muted-foreground'}`}>
                          {passwordValidation.checks.uppercase ? <Check size={16} className="shrink-0" /> : <X size={16} className="shrink-0" />}
                          <span>One uppercase letter</span>
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.checks.lowercase ? 'text-chart-1' : 'text-muted-foreground'}`}>
                          {passwordValidation.checks.lowercase ? <Check size={16} className="shrink-0" /> : <X size={16} className="shrink-0" />}
                          <span>One lowercase letter</span>
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.checks.number ? 'text-chart-1' : 'text-muted-foreground'}`}>
                          {passwordValidation.checks.number ? <Check size={16} className="shrink-0" /> : <X size={16} className="shrink-0" />}
                          <span>One number</span>
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.checks.special ? 'text-chart-1' : 'text-muted-foreground'}`}>
                          {passwordValidation.checks.special ? <Check size={16} className="shrink-0" /> : <X size={16} className="shrink-0" />}
                          <span>One special character (!@#$%^&*)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm leading-6 text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading || (passwordValidation && passwordValidation.passedChecks < 4)}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(13,148,136,0.28)] transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Setting things up...' : 'Create Workspace'}
                  {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </form>

              <p className="mt-8 text-center text-muted-foreground">
                Already part of NexaDesk?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
