'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Mail, GraduationCap, Settings, Loader2, MapPin, CalendarDays, Globe, Shield, ArrowLeft, LogOut } from 'lucide-react';

// ── Info row helper ────────────────────────────────────────────────────────────
function InfoRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>
        {label}
      </p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color }}>
        {value}
      </p>
    </div>
  );
}

// ── Stat chip ─────────────────────────────────────────────────────────────────
function Chip({ label, value, bg, color }: { label: string; value: string; bg: string; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl px-5 py-4 gap-1 transform transition-transform hover:scale-[1.02]" style={{ background: bg, border: `1.5px solid ${color}30` }}>
      <span style={{ fontFamily: 'Lora, serif', fontSize: '22px', fontWeight: 700, color }}>{value}</span>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { user: authUser, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser?.id) {
      authService.getProfile(authUser.id)
        .then(data => setProfile(data))
        .catch(err => console.error('Failed to fetch profile:', err))
        .finally(() => setLoading(false));
    }
  }, [authUser]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
    </div>
  );

  const initials = `${profile?.firstName?.[0] ?? ''}${profile?.lastName?.[0] ?? ''}`;

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-28 pb-24 px-6 md:px-10" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto space-y-8">

          {/* ── Top Bar ── */}
          <div className="flex justify-between items-center px-2">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start">
            
            {/* ── Sidebar (Profile Info & Stats) ── */}
            <aside className="space-y-6">
              
              {/* Profile Card */}
              <div
                className="relative overflow-hidden rounded-[32px] p-8 text-center border shadow-sm"
                style={{ background: 'var(--tint-blue)', borderColor: 'var(--blue)' }}
              >
                {/* Pastel blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ background: 'var(--pink)' }} />
                
                <div
                  className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center relative shadow-md"
                  style={{ background: 'var(--blue)' }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="44" stroke="#5BAADC" strokeWidth="1" fill="none" strokeDasharray="3 5" />
                  </svg>
                  <span style={{ fontFamily: 'Lora, serif', fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
                    {initials}
                  </span>
                </div>

                <h1 style={{ fontFamily: 'Lora, serif', fontSize: '24px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                  {profile?.firstName}<br/>
                  <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{profile?.lastName}</em>
                </h1>
                <p className="mt-2 text-sm font-medium text-[var(--muted)] break-all px-2">
                  {profile?.email}
                </p>

                <div className="mt-8 pt-8 border-t border-[var(--blue)]/20 space-y-3">
                   <div className="flex items-center justify-between text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
                      <span>Status</span>
                      <span className="tag tag-green">Student</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
                      <span>Member since</span>
                      <span>Mar 2024</span>
                   </div>
                </div>
              </div>

              {/* Stats Chips (Vertical on sidebar) */}
              <div className="grid grid-cols-1 gap-3">
                 <Chip label="Orientation score"  value="85%"   bg="var(--tint-green)" color="var(--accent)"     />
                 <Chip label="Tests taken"       value={profile?.testCount ?? '0'} bg="var(--tint-pink)"   color="var(--secondary)" />
                 <Chip label="Personalized maps"  value="1"     bg="#fff"            color="var(--primary)"   />
              </div>

            </aside>

            {/* ── Main Content ── */}
            <div className="space-y-8">
              
              {/* Journey Card (Full width above info) */}
              <div
                className="rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border shadow-sm"
                style={{ background: 'var(--tint-yellow)', borderColor: 'var(--lemon)' }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm" style={{ background: 'var(--lemon)' }}>
                    🧭
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Lora, serif', fontSize: '22px', fontWeight: 700, color: 'var(--ink)' }}>
                      Your orientation journey
                    </h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--muted)', marginTop: '4px' }}>
                      {profile?.testCount ? `You've completed the orientation. Keep refining your path!` : 'You haven\'t taken the orientation test yet. Ready to start?'}
                    </p>
                  </div>
                </div>
                <Link href="/test" className="btn-primary px-10 whitespace-nowrap">
                  {profile?.testCount ? 'Retake Test' : 'Start the Test →'}
                </Link>
              </div>

              {/* Two Column Grid for Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Academic Card */}
                <div className="bg-white rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--tint-pink)] text-[var(--secondary)]"><GraduationCap size={20} /></div>
                    <h2 style={{ fontFamily: 'Lora, serif', fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>Academic Profile</h2>
                  </div>
                  <div className="space-y-6">
                    <InfoRow label="Education Level" value={profile?.educationLevel || 'Not specified'} color="var(--ink)" />
                    <div className="h-px bg-[var(--border)] opacity-50" />
                    <InfoRow label="Future Career Goal" value={profile?.goal || 'Discovering my path'} color="var(--secondary)" />
                  </div>
                </div>

                {/* Personal Card */}
                <div className="bg-white rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--tint-blue)] text-[var(--primary)]"><Settings size={20} /></div>
                    <h2 style={{ fontFamily: 'Lora, serif', fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>Identity & Location</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <InfoRow label="City" value={profile?.city || '—'} color="var(--ink)" />
                    <InfoRow label="Age Range" value={profile?.ageRange || '—'} color="var(--ink)" />
                    <InfoRow label="Language" value="English" color="var(--ink)" />
                    <InfoRow label="Account Role" value="Student" color="var(--accent)" />
                  </div>
                </div>

              </div>

              {/* Update & Security area */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
                   <div className="flex items-center gap-3 mb-4">
                      <Shield size={18} className="text-[var(--primary)]" />
                      <h3 className="font-bold text-[10px] uppercase tracking-widest text-[var(--dim)]">Security & Privacy</h3>
                   </div>
                   <p className="text-sm text-[var(--muted)] leading-relaxed">Your data is secured with AES-256 encryption. We only share it with orientation advisors after your explicit consent.</p>
                </div>
                
                <div className="flex items-center justify-center px-4">
                  <button
                    className="btn-ghost flex items-center gap-2 group whitespace-nowrap"
                    style={{ borderRadius: '16px' }}
                  >
                    <Settings size={18} className="group-hover:rotate-45 transition-transform" />
                    Update Profile Data
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}