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
            {/* ... */}
          </div>

          {/* ... Rest of the component ... */}

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

        </div>
      </main>
    </ProtectedRoute>
  );
}