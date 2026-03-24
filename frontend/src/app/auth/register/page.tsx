'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    educationLevel: '',
    ageRange: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic frontend validation
    if (!formData.educationLevel || !formData.ageRange) {
      setError('Please select your education level and age range.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      login(response.token, response.user);
      setShowSuccess(true);
      setTimeout(() => router.push('/'), 1500);
    } catch (err: any) {
      // Improved error reporting
      const message = err.response?.data?.message;
      if (Array.isArray(message)) {
        setError(message.join(', '));
      } else {
        setError(message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="relative min-h-screen flex overflow-hidden">
      {/* Left side - Video & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#6a4c93]/20 to-[#ff595e]/20">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/register.mp4"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#6a4c93]/80 via-[#6a4c93]/40 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-3xl transition-transform group-hover:rotate-12">🧭</span>
              <span className="text-2xl font-bold tracking-tight">TriQi</span>
            </Link>
          </div>
          
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wider text-[#ffca3a]">JOIN THE MOVEMENT</p>
              <h2 className="text-4xl font-bold leading-tight">
                Find your path with confidence
              </h2>
              <p className="text-white/80 text-lg">
                Thousands of students have already discovered their ideal career direction with TriQi.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                'AI-powered career matching',
                'Personalized 6-month roadmap',
                'Moroccan institutions database',
                '100% free forever'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#ffca3a]" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-white/60">
            ✨ Trusted by students from UM5, Al Akhawayn, ENSIAS and more
          </div>
        </div>
      </div>

      {/* Right side - Compact Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#fff4d7] relative overflow-y-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff595e] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6a4c93] opacity-5 rounded-full blur-3xl" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-3xl transition-transform group-hover:rotate-12">🧭</span>
              <span className="text-2xl font-bold text-(--text)">TriQi</span>
            </Link>
          </div>
          
          {/* Compact card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-(--border)">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-(--text) mb-1">Create an account</h1>
              <p className="text-sm text-(--muted)">Start your journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs">
                  <AlertCircle size={14} />
                  <p>{error}</p>
                </div>
              )}

              {showSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-600 rounded-xl text-xs">
                  <CheckCircle size={14} />
                  <p>Account created! Redirecting...</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-2 px-4 text-sm outline-none transition-all"
                  onChange={handleChange}
                />
                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-2 px-4 text-sm outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-2 px-4 text-sm outline-none transition-all"
                onChange={handleChange}
              />

              <input
                required
                name="password"
                type="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-2 px-4 text-sm outline-none transition-all"
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 gap-3">
                <select
                  required
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-2 px-4 text-sm outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select Education Level</option>
                  <option value="Colledge">Collège (9ème AF)</option>
                  <option value="Tronc Commun">Tronc Commun</option>
                  <option value="1ère Année Bac">1ère Année Bac</option>
                  <option value="2ème Année Bac">2ème Année Bac (Bachelier)</option>
                  <option value="Bac +1 / Bac +2">Bac +1 / Bac +2</option>
                  <option value="Licence">Licence (Bac +3)</option>
                  <option value="Master / Ingénieur">Master / Ingénieur (Bac +5)</option>
                  <option value="Doctorat">Doctorat</option>
                </select>

                <select
                  required
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleChange}
                  className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-2 px-4 text-sm outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select Age Range</option>
                  <option value="13-15">13-15</option>
                  <option value="16-18">16-18</option>
                  <option value="19-22">19-22</option>
                  <option value="23-25">23-25</option>
                  <option value="26+">26+</option>
                </select>
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-(--primary) text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#ff595e] active:scale-[0.98] disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center pt-4 border-t border-(--border)">
              <p className="text-sm text-(--muted)">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-(--primary) font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-(--dim) mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}