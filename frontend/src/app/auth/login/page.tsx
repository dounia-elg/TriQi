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
      login(response.token, response.user);
      setShowSuccess(true);
      setTimeout(() => router.push('/'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main className="min-h-screen flex overflow-hidden">

      {/* ── Left: Form ───────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-14" style={{ background: '#FBF5EC' }}>
        <div className="w-full max-w-sm fade-up">

          <div className="mb-12">
            <Logo size="md" />
          </div>

          <h1
            className="mb-1"
            style={{ fontFamily: 'Lora, serif', fontSize: '32px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Welcome back.
          </h1>
          <div className="w-10 h-px my-3" style={{ background: 'linear-gradient(90deg, #E8724A, #F0B860)' }} />
          <p className="section-body text-sm mb-10">Log in to resume your progress.</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FEE2E2' }}>
              <AlertCircle size={15} /> <span>{error}</span>
            </div>
          )}
          {showSuccess && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #DCFCE7' }}>
              <CheckCircle size={15} /> <span>Welcome back! Redirecting…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'email',    type: 'email',    placeholder: 'Email address', Icon: Mail },
              { name: 'password', type: 'password', placeholder: 'Password',   Icon: Lock },
            ].map(({ name, type, placeholder, Icon }) => (
              <div key={name} className="relative">
                <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--dim)' }} />
                <input
                  required
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full rounded-2xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all"
                  style={{ background: '#FFF', border: '1.5px solid var(--border)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            ))}

            <div className="flex justify-end">
              <Link href="#" className="text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || showSuccess}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ borderRadius: '14px', marginTop: '4px' }}
            >
              {isLoading
                ? <Loader2 size={18} className="animate-spin" />
                : <> Log in <ArrowRight size={16} /> </>
              }
            </button>
          </form>

          <p className="text-center text-sm mt-8" style={{ color: 'var(--muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
              Sign up free
            </Link>
          </p>

        </div>
      </div>

      {/* ── Right: Video ─────────────────────────────── */}
      <div className="hidden lg:block lg:w-[52%] relative overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="/login.mp4" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(232,114,74,0.5) 0%, rgba(44,36,22,0.6) 55%, rgba(125,170,146,0.4) 100%)' }}
        />

        <div className="absolute bottom-16 left-10 right-10 z-10">
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(251,245,236,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(251,245,236,0.2)' }}
          >
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '16px', color: '#FBF5EC', lineHeight: 1.7 }}>
              "Finding my path was the best decision of my life. TriQi helped me see clearly."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#F0B860', color: '#2C2416' }}>S</div>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(251,245,236,0.85)' }}>Sara K., ENSIAS</span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 h-full w-12 pointer-events-none">
          <svg viewBox="0 0 48 900" preserveAspectRatio="none" className="h-full w-full">
            <path d="M48,0 C28,200 0,300 0,450 C0,600 28,700 48,900 L0,900 L0,0 Z" fill="#FBF5EC" />
          </svg>
        </div>
      </div>

    </main>
  );
}