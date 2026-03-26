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
    <div className="flex flex-col items-center justify-center rounded-2xl px-5 py-4 gap-1" style={{ background: bg, border: `1.5px solid ${color}30` }}>
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
      <Loader2 className="animate-spin" size={36} style={{ color: 'var(--primary)' }} />
    </div>
  );

  const initials = `${profile?.firstName?.[0] ?? ''}${profile?.lastName?.[0] ?? ''}`;

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-28 pb-24 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto space-y-5">

          {/* ── Top Navigation ── */}
          <div className="flex justify-between items-center mb-2 px-2">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

          {/* ── Hero card ─────────────────────────────────────────────────── */}
          <div
            className="relative overflow-hidden rounded-[28px] p-8 md:p-10"
            style={{ background: 'var(--tint-blue)', border: '1.5px solid var(--blue)' }}
          >
            {/* Pastel blobs */}
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: 'var(--pink)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: 'var(--lemon)' }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-7">

              {/* Avatar — compass-inspired */}
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 relative"
                style={{ background: 'var(--blue)', boxShadow: '0 4px 20px rgba(91,170,220,0.25)' }}
              >
                {/* Mini compass ring */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="44" stroke="#5BAADC" strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
                </svg>
                <span style={{ fontFamily: 'Lora, serif', fontSize: '30px', fontWeight: 700, color: 'var(--primary)', position: 'relative', zIndex: 1 }}>
                  {initials}
                </span>
              </div>

              {/* Name & email */}
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <span className="section-label self-center sm:self-start">Student Profile</span>
                <h1 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(26px,4vw,36px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {profile?.firstName}{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{profile?.lastName}</em>
                </h1>
                <p className="flex items-center justify-center sm:justify-start gap-2" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>
                  <Mail size={14} style={{ color: 'var(--primary)' }} />
                  {profile?.email}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="relative z-10 grid grid-cols-3 gap-3 mt-8">
              <Chip label="Domains"     value="50+"  bg="#fff" color="var(--primary)"   />
              <Chip label="Test taken"  value={profile?.testCount ?? '0'} bg="var(--tint-pink)"   color="var(--secondary)" />
              <Chip label="Tasks done"  value={profile?.tasksDone ?? '0'} bg="var(--tint-green)"  color="var(--accent)"    />
            </div>
          </div>

          {/* ── Two-column cards ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Education card */}
            <div
              className="rounded-[24px] p-7"
              style={{ background: 'var(--tint-pink)', border: '1.5px solid var(--pink)' }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--pink)', color: 'var(--secondary)' }}>
                  <GraduationCap size={18} />
                </div>
                <h2 style={{ fontFamily: 'Lora, serif', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>
                  Education & Goals
                </h2>
              </div>

              <div className="space-y-5">
                <InfoRow
                  label="Education Level"
                  value={profile?.educationLevel || 'Not specified'}
                  color="var(--ink)"
                />
                <div className="h-px" style={{ background: 'var(--pink)' }} />
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>
                    Current Goal
                  </p>
                  <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '15px', color: 'var(--secondary)' }}>
                    "{profile?.goal || 'Discovering my path'}"
                  </p>
                </div>
              </div>
            </div>

            {/* Personal details card */}
            <div
              className="rounded-[24px] p-7"
              style={{ background: 'var(--tint-green)', border: '1.5px solid var(--green)' }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--green)', color: 'var(--accent)' }}>
                  <Settings size={18} />
                </div>
                <h2 style={{ fontFamily: 'Lora, serif', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>
                  Personal Details
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <InfoRow label="City"       value={profile?.city      || '—'} color="var(--ink)"  />
                <InfoRow label="Age Range"  value={profile?.ageRange  || '—'} color="var(--ink)"  />
                <InfoRow label="Language"   value="English"                    color="var(--ink)"  />
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>
                    Role
                  </p>
                  <span className="tag tag-green self-start">Student</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Journey card ──────────────────────────────────────────────── */}
          <div
            className="rounded-[24px] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'var(--tint-yellow)', border: '1.5px solid var(--lemon)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'var(--lemon)' }}>
                🧭
              </div>
              <div>
                <h3 style={{ fontFamily: 'Lora, serif', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>
                  Your orientation journey
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
                  {profile?.testCount ? `You've taken ${profile.testCount} test(s). Keep going!` : 'You haven\'t taken the test yet. Ready to start?'}
                </p>
              </div>
            </div>
            <a href="/test" className="btn-primary btn-sm whitespace-nowrap shrink-0">
              {profile?.testCount ? 'Retake the Test →' : 'Start the Test →'}
            </a>
          </div>

          {/* ── Action buttons ─────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 border-t border-[var(--border)]">
            <button
              className="btn-ghost flex items-center gap-2 px-6"
              style={{ borderRadius: '14px' }}
            >
              <Settings size={16} />
              Update Information
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all active:scale-95"
              style={{ borderRadius: '14px' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

            </div>
      </main>
    </ProtectedRoute>
  );
}