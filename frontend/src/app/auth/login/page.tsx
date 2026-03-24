'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(formData);
    
      login(response.token, response.user);
      setShowSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      const message = err.response?.data?.message;
      setError(message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="relative min-h-screen flex overflow-hidden">
      {/* Left side - Video & Content (consistent with Register) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#6a4c93]/20 to-[#ff595e]/20">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/hero.mp4"
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
              <p className="text-sm font-semibold tracking-wider text-[#ffca3a]">WELCOME BACK</p>
              <h2 className="text-4xl font-bold leading-tight">
                Continue your journey to clarity
              </h2>
              <p className="text-white/80 text-lg">
                Your progress is saved and waiting for you. Log in to resume your orientation or view your roadmap.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="italic text-white/90">
                "Finding my path was the best thing I ever did for my career. TriQi made it so much easier."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffca3a] flex items-center justify-center text-[#6a4c93] font-bold text-xs">S</div>
                <span className="text-sm font-semibold">Sara K., ENSIAS Student</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-white/60">
            ✨ Part of the Moroccan Student community
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#fff4d7] relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff595e] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6a4c93] opacity-5 rounded-full blur-3xl" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-3xl transition-transform group-hover:rotate-12">🧭</span>
              <span className="text-2xl font-bold text-(--text)">TriQi</span>
            </Link>
          </div>
          
          {/* Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-(--border)">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-(--text) mb-2">Welcome back</h1>
              <p className="text-(--muted)">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                  <AlertCircle size={18} />
                  <p>{error}</p>
                </div>
              )}

              {showSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-600 rounded-xl text-sm border border-green-100">
                  <CheckCircle size={18} />
                  <p>Welcome back! Redirecting...</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dim) group-focus-within:text-(--primary) transition-colors" />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-3 pl-12 pr-4 outline-none transition-all placeholder:text-(--dim)"
                    onChange={handleChange}
                  />
                </div>

                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dim) group-focus-within:text-(--primary) transition-colors" />
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    className="w-full bg-[#faf8f4] border border-(--border) focus:border-(--primary) rounded-xl py-3 pl-12 pr-4 outline-none transition-all placeholder:text-(--dim)"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link href="#" className="text-xs font-semibold text-(--primary) hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                disabled={isLoading || showSuccess}
                className="w-full bg-(--primary) text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#ff595e] active:scale-[0.98] disabled:opacity-70 mt-2 shadow-md shadow-(--primary)/20"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-(--border)">
              <p className="text-(--muted) text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-(--primary) font-bold hover:underline">
                  Sign up free
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-(--dim) mt-6">
            Help & Support • Privacy Policy • Terms of Use
          </p>
        </div>
      </div>
    </main>
  );
}
