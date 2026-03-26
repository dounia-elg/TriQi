'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

const checklistItems = [
  { text: 'Intelligent, weighted orientation test',  swatch: 'var(--blue)',  color: '#1A6FA0' },
  { text: 'Personalized 3 to 6-month roadmap',       swatch: 'var(--pink)',  color: '#B94B6E' },
  { text: 'Recommended Moroccan institutions',        swatch: 'var(--green)', color: '#2D7A3A' },
  { text: '100% free, forever',                      swatch: 'var(--lemon)', color: '#8A6A00' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData]       = useState({ firstName: '', lastName: '', email: '', password: '', educationLevel: '', ageRange: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.educationLevel || !formData.ageRange) { setError('Please select your education level and age range.'); return; }
    setIsLoading(true); setError(null);
    try {
      const response = await authService.register(formData);
      login(response.token, response.user);
      setShowSuccess(true);
      setTimeout(() => router.push('/'), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(', ') : msg || 'Something went wrong. Please try again.');
    } finally { setIsLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const iStyle = { background: '#fff', border: '1.5px solid var(--pink)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' };
  const onF = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = 'var(--primary)');
  const onB = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = 'var(--pink)');
  const iCls = "w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all";

  return (
    <main className="min-h-screen flex overflow-hidden">

      {/* ── Left: Video ── */}
      <div className="hidden lg:block lg:w-[48%] relative overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="/register.mp4" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(249,206,222,0.4) 0%, rgba(30,41,59,0.65) 50%, rgba(253,232,160,0.3) 100%)' }} />
        <div className="absolute top-20 left-10 w-44 h-44 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: 'var(--blue)' }} />
        <div className="absolute bottom-24 right-10 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: 'var(--green)' }} />

        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          <Logo light size="md" />

          <div className="max-w-xs space-y-8">
            <div className="space-y-3">
              <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(253,232,160,0.18)', color: 'var(--lemon)', border: '1px solid rgba(253,232,160,0.3)', fontFamily: 'DM Sans, sans-serif' }}>
                Join the movement
              </span>
              <h2 style={{ fontFamily: 'Lora, serif', fontSize: '32px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                Your future starts with a single question.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '15px', fontFamily: 'DM Sans, sans-serif' }}>
                Thousands of students have already found their path with TriQi.
              </p>
            </div>

            <ul className="space-y-3">
              {checklistItems.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: item.swatch }}>
                    <CheckCircle size={11} style={{ color: item.color }} />
                  </span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', fontFamily: 'DM Sans, sans-serif' }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            Trusted by students from UM5, ENSIAS, Al Akhawayn and more.
          </p>
        </div>

        <div className="absolute right-0 top-0 h-full w-12 pointer-events-none">
          <svg viewBox="0 0 48 900" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0,0 C20,200 48,300 48,450 C48,600 20,700 0,900 L48,900 L48,0 Z" fill="#FEF0F5" />
          </svg>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 overflow-y-auto relative" style={{ background: 'var(--tint-pink)' }}>
        <div className="absolute top-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: 'var(--blue)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: 'var(--green)' }} />

        <div className="w-full max-w-md fade-up relative z-10">
          <div className="mb-8 lg:hidden"><Logo size="md" /></div>

          <div className="flex items-center gap-2 mb-6">
            {['var(--blue)','var(--pink)','var(--green)','var(--lemon)'].map(c => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>

          <h1 className="mb-1" style={{ fontFamily: 'Lora, serif', fontSize: '30px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Create your account.
          </h1>
          <div className="w-10 h-px my-3" style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
          <p className="section-body text-sm mb-7">Start your orientation in under 2 minutes.</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FEE2E2' }}>
              <AlertCircle size={15} /><span>{error}</span>
            </div>
          )}
          {showSuccess && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: 'var(--tint-green)', color: 'var(--accent)', border: '1px solid var(--green)' }}>
              <CheckCircle size={15} /><span>Account created! Redirecting…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              {[{ name: 'firstName', ph: 'First name' }, { name: 'lastName', ph: 'Last name' }].map(({ name, ph }) => (
                <input key={name} required name={name} type="text" placeholder={ph}
                  value={formData[name as keyof typeof formData]} onChange={handleChange}
                  className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
              ))}
            </div>

            {[{ name: 'email', type: 'email', ph: 'Email address' }, { name: 'password', type: 'password', ph: 'Password (min. 6 characters)' }].map(({ name, type, ph }) => (
              <input key={name} required name={name} type={type} placeholder={ph}
                value={formData[name as keyof typeof formData]} onChange={handleChange}
                className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
            ))}

            <select required name="educationLevel" value={formData.educationLevel} onChange={handleChange}
              className={iCls + ' appearance-none'} style={{ ...iStyle, color: formData.educationLevel ? 'var(--text)' : 'var(--dim)' }} onFocus={onF} onBlur={onB}>
              <option value="" disabled>Education level</option>
              <option value="Middle School">Middle School (9th Grade)</option>
              <option value="Tronc Commun">Common Core</option>
              <option value="1ère Année Bac">High School — 11th Grade</option>
              <option value="2ème Année Bac">High School — 12th Grade (Baccalaureate)</option>
              <option value="Bac +1 / Bac +2">Undergraduate (Year 1–2)</option>
              <option value="Licence">Bachelor's Degree (Year 3)</option>
              <option value="Master / Ingénieur">Master's / Engineering Degree</option>
              <option value="Doctorat">PhD / Doctorate</option>
            </select>

            <select required name="ageRange" value={formData.ageRange} onChange={handleChange}
              className={iCls + ' appearance-none'} style={{ ...iStyle, color: formData.ageRange ? 'var(--text)' : 'var(--dim)' }} onFocus={onF} onBlur={onB}>
              <option value="" disabled>Age range</option>
              <option value="13-15">13–15</option>
              <option value="16-18">16–18</option>
              <option value="19-22">19–22</option>
              <option value="23-25">23–25</option>
              <option value="26+">26+</option>
            </select>

            <button type="submit" disabled={isLoading || showSuccess}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60" style={{ borderRadius: '14px', marginTop: '4px' }}>
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Create my account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm mt-7" style={{ color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Sign in</Link>
          </p>
          <p className="text-center text-xs mt-4" style={{ color: 'var(--dim)' }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}