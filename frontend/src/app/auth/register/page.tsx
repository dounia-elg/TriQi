'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

const checklistItems = [
  'Intelligent and weighted orientation test',
  'Personalized 3 to 6-month roadmap',
  'Recommended Moroccan institutions',
  '100% free, forever',
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData]       = useState({
    firstName: '', lastName: '', email: '',
    password: '', educationLevel: '', ageRange: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.educationLevel || !formData.ageRange) {
      setError('Please select your education level and age range.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(formData);
      login(response.token, response.user);
      setShowSuccess(true);
      setTimeout(() => router.push('/'), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(', ') : msg || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClass = "w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all";
  const inputStyle = { background: '#FFF', border: '1.5px solid var(--border)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' };
  const onFocus    = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = 'var(--primary)');
  const onBlur     = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = 'var(--border)');

  return (
    <main className="min-h-screen flex overflow-hidden">

      {/* ── Left: Video ──────────────────────────────── */}
      <div className="hidden lg:block lg:w-[48%] relative overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="/register.mp4" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(125,170,146,0.5) 0%, rgba(44,36,22,0.65) 55%, rgba(232,114,74,0.45) 100%)' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          <Logo light size="md" />

          <div className="max-w-xs space-y-8">
            <div className="space-y-3">
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F0B860' }}>
                Join the movement
              </p>
              <h2 style={{ fontFamily: 'Lora, serif', fontSize: '34px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                Your future starts with a single question.
              </h2>
              <p style={{ color: 'rgba(251,245,236,0.75)', lineHeight: 1.7, fontSize: '15px', fontFamily: 'DM Sans, sans-serif' }}>
                Thousands of students have already found their path with TriQi.
              </p>
            </div>

            <ul className="space-y-3">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} style={{ color: '#F0B860', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'rgba(251,245,236,0.85)', fontFamily: 'DM Sans, sans-serif' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: '12px', color: 'rgba(251,245,236,0.45)', fontFamily: 'DM Sans, sans-serif' }}>
            Trusted by students from UM5, ENSIAS, Al Akhawayn and many more.
          </p>
        </div>

        {/* Right edge curve */}
        <div className="absolute right-0 top-0 h-full w-12 pointer-events-none">
          <svg viewBox="0 0 48 900" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0,0 C20,200 48,300 48,450 C48,600 20,700 0,900 L48,900 L48,0 Z" fill="#FBF5EC" />
          </svg>
        </div>
      </div>

      {/* ── Right: Form ──────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 overflow-y-auto" style={{ background: '#FBF5EC' }}>
        <div className="w-full max-w-md fade-up">

          <div className="mb-8 lg:hidden">
            <Logo size="md" />
          </div>

          <h1
            className="mb-1"
            style={{ fontFamily: 'Lora, serif', fontSize: '30px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            Create your account.
          </h1>
          <div className="w-10 h-px my-3" style={{ background: 'linear-gradient(90deg, #E8724A, #F0B860)' }} />
          <p className="section-body text-sm mb-7">Start your orientation in less than 2 minutes.</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FEE2E2' }}>
              <AlertCircle size={15} /> <span>{error}</span>
            </div>
          )}
          {showSuccess && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl text-sm" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #DCFCE7' }}>
              <CheckCircle size={15} /> <span>Account created! Redirecting…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'firstName', placeholder: 'First name' },
                { name: 'lastName',  placeholder: 'Last name' },
              ].map(({ name, placeholder }) => (
                <input
                  key={name}
                  required
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              ))}
            </div>

            {/* Email & Password */}
            {[
              { name: 'email',    type: 'email',    placeholder: 'Email address' },
              { name: 'password', type: 'password', placeholder: 'Password (min. 6 characters)' },
            ].map(({ name, type, placeholder }) => (
              <input
                key={name}
                required
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            ))}

            {/* Selects */}
            <select
              required
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className={inputClass + ' appearance-none'}
              style={{ ...inputStyle, color: formData.educationLevel ? 'var(--text)' : 'var(--dim)' }}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="" disabled>Education Level</option>
              <option value="Colledge">Middle School (9th Grade)</option>
              <option value="Tronc Commun">Common Core</option>
              <option value="1ère Année Bac">High School - 11th Grade</option>
              <option value="2ème Année Bac">High School - 12th Grade (Baccalaureate)</option>
              <option value="Bac +1 / Bac +2">Undergraduate (Year 1-2)</option>
              <option value="Licence">Bachelor's Degree (Year 3)</option>
              <option value="Master / Ingénieur">Master's / Engineering Degree</option>
              <option value="Doctorat">PhD / Doctorate</option>
            </select>

            <select
              required
              name="ageRange"
              value={formData.ageRange}
              onChange={handleChange}
              className={inputClass + ' appearance-none'}
              style={{ ...inputStyle, color: formData.ageRange ? 'var(--text)' : 'var(--dim)' }}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="" disabled>Age Range</option>
              <option value="13-15">13–15 years</option>
              <option value="16-18">16–18 years</option>
              <option value="19-22">19–22 years</option>
              <option value="23-25">23–25 years</option>
              <option value="26+">26 years and older</option>
            </select>

            <button
              type="submit"
              disabled={isLoading || showSuccess}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ borderRadius: '14px', marginTop: '4px' }}
            >
              {isLoading
                ? <Loader2 size={18} className="animate-spin" />
                : <> Create my account <ArrowRight size={16} /> </>
              }
            </button>
          </form>

          <p className="text-center text-sm mt-7" style={{ color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
              Log in
            </Link>
          </p>

          <p className="text-center text-xs mt-4" style={{ color: 'var(--dim)' }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>

    </main>
  );
}