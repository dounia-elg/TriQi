'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData]       = useState({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(null);
    try {
      const response = await authService.login(formData);
      
      const token = response.accessToken || response.token;
      login(token, response.user);
      
      setShowSuccess(true);
      
      const userRole = response.user?.role?.toUpperCase();
      const redirectPath = userRole === 'ADMIN' ? '/admin' : '/dashboard';
      router.push(redirectPath);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main className="min-h-screen flex overflow-hidden">

      {/* ── Left: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-14 relative overflow-hidden" style={{ background: 'var(--tint-blue)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: 'var(--pink)' }} />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: 'var(--green)' }} />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full blur-2xl opacity-30 pointer-events-none" style={{ background: 'var(--lemon)' }} />

        <div className="w-full max-w-sm fade-up relative z-10">
          <div className="mb-12"><Logo size="md" /></div>

          <div className="flex items-center gap-2 mb-6">
            {['var(--blue)','var(--pink)','var(--green)','var(--lemon)'].map(c => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>

          <h1 className="mb-1" style={{ fontFamily: 'Lora, serif', fontSize: '32px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Welcome back.
          </h1>
          <div className="w-10 h-px my-3" style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
          <p className="section-body text-sm mb-10">Sign in to continue your journey.</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FEE2E2' }}>
              <AlertCircle size={15} /><span>{error}</span>
            </div>
          )}
          {showSuccess && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: 'var(--tint-green)', color: 'var(--accent)', border: '1px solid var(--green)' }}>
              <CheckCircle size={15} /><span>Welcome back! Redirecting…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'email',    type: 'email',    placeholder: 'Email address', Icon: Mail },
              { name: 'password', type: 'password', placeholder: 'Password',      Icon: Lock },
            ].map(({ name, type, placeholder, Icon }) => (
              <div key={name} className="relative">
                <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--dim)' }} />
                <input
                  required name={name} type={type} placeholder={placeholder}
                  value={formData[name as keyof typeof formData]} onChange={handleChange}
                  className="w-full rounded-2xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all"
                  style={{ background: '#fff', border: '1.5px solid var(--blue)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
                />
              </div>
            ))}

            <div className="flex justify-end">
              <Link href="#" className="text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Forgot password?</Link>
            </div>

            <button type="submit" disabled={isLoading || showSuccess}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ borderRadius: '14px' }}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm mt-8" style={{ color: 'var(--muted)' }}>
            No account?{' '}
            <Link href="/auth/register" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Sign up free</Link>
          </p>
        </div>
      </div>

      {/* ── Right: Video ── */}
      <div className="hidden lg:block lg:w-[52%] relative overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="/login.mp4" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(91,170,220,0.45) 0%, rgba(30,41,59,0.65) 50%, rgba(109,196,122,0.35) 100%)' }} />
        <div className="absolute top-16 right-16 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: 'var(--pink)' }} />
        <div className="absolute bottom-24 left-12 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: 'var(--lemon)' }} />

        <div className="absolute bottom-14 left-10 right-10 z-10">
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.18)' }}>
            <div className="flex gap-1.5 mb-4">
              {['var(--blue)','var(--pink)','var(--green)','var(--lemon)'].map(c => (
                <span key={c} className="h-1 w-6 rounded-full opacity-80" style={{ background: c }} />
              ))}
            </div>
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '15px', color: '#fff', lineHeight: 1.75 }}>
              "Finding my path was the best decision I ever made for my career. TriQi made it so much clearer."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--pink)', color: '#B94B6E' }}>S</div>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Sara K., ENSIAS</span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 h-full w-12 pointer-events-none">
          <svg viewBox="0 0 48 900" preserveAspectRatio="none" className="h-full w-full">
            <path d="M48,0 C28,200 0,300 0,450 C0,600 28,700 48,900 L0,900 L0,0 Z" fill="#EBF6FD" />
          </svg>
        </div>
      </div>
    </main>
  );
}