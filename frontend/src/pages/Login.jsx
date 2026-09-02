import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[8%] h-64 w-64 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-[10%] right-[12%] h-80 w-80 rounded-full bg-chart-1/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/65 bg-white/70 shadow-[0_30px_120px_rgba(76,29,149,0.16)] backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden xl:flex flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_28%),linear-gradient(160deg,#7c3aed_0%,#8b5cf6_45%,#312e81_100%)] p-12 text-white">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
              Support Desk Platform
            </div>
            <h1 className="mt-8 max-w-lg text-5xl font-bold leading-tight">
              Modern ticketing for faster customer care.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
              Give your team a cleaner workspace for triage, collaboration, and resolution without losing visibility across every request.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex items-start gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-white" size={22} />
                <div>
                  <h3 className="text-lg font-semibold">Real-time updates</h3>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Stay aligned with live ticket changes, status movement, and team replies.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="mt-1 text-xs text-white/70">Coverage</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">SLA</p>
                  <p className="mt-1 text-xs text-white/70">Tracking</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">Live</p>
                  <p className="mt-1 text-xs text-white/70">Responses</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Smart escalation</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Route urgent issues with priority-aware workflows.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Team collaboration</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Keep replies, attachments, and ownership in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-white/60">© 2026 Support Desk. All rights reserved.</div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-lg">
            <div className="mb-8">
              <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Sign in
              </div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground">Welcome back</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Sign in to access your support workspace, manage requests, and keep service operations moving.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
              <button
                onClick={handleGoogleLogin}
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
                Sign in with Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/80"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="rounded-full bg-white px-4 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-border/80 bg-background/80 py-3.5 pl-12 pr-4 text-base text-foreground shadow-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
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
                </div>

                <div className="flex items-center justify-end">
                  <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(124,58,237,0.3)] transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                  {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </form>

              <p className="mt-8 text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
