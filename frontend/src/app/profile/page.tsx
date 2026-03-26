'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import ProtectedRoute from '@/components/ProtectedRoute';
import { User as UserIcon, Mail, MapPin, GraduationCap, Target, Calendar, Settings, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user: authUser } = useAuth();
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

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-32 pb-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          
          {/* ── Header Card ── */}
          <div className="relative bg-white rounded-[40px] p-8 md:p-12 mb-8 border border-[var(--border)] shadow-sm overflow-hidden">
            {/* Design elements from Home Page */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--tint-blue)] rounded-full blur-3xl opacity-60 -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--tint-pink)] rounded-full blur-3xl opacity-40 -ml-24 -mb-24" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[var(--blue)] flex items-center justify-center text-[var(--primary)] text-4xl font-serif font-bold shadow-inner">
                {profile?.firstName?.[0]}
              </div>
              <div className="text-center md:text-left">
                <span className="section-label mb-3">Student Profile</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
                  {profile?.firstName} <span className="text-[var(--primary)]">{profile?.lastName}</span>
                </h1>
                <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium">
                  <Mail size={16} /> {profile?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Info */}
            <div className="bg-white rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
              <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-3">
                <div className="icon-badge"><GraduationCap size={20} /></div>
                Education & Goals
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">Education Level</p>
                  <p className="text-lg font-medium">{profile?.educationLevel || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">Current Goal</p>
                  <p className="text-lg font-medium italic text-[var(--primary)]">"{profile?.goal || 'Discovering my path'}"</p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
              <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-3">
                <div className="icon-badge"><Settings size={20} /></div>
                Personal Details
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">City</p>
                  <p className="font-semibold">{profile?.city || 'Add city'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">Age Range</p>
                  <p className="font-semibold">{profile?.ageRange || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Language</p>
                  <p className="font-semibold">English</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Role</p>
                  <div className="tag tag-green">STUDENT</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
             <button className="btn-primary">Update Profile Information</button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
