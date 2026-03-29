'use client';

import { useEffect, useState } from 'react';
import { GraduationCap, Loader2, Mail, MapPin, Target, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  educationLevel?: string;
  ageRange?: string;
  city?: string;
  goal?: string;
  hasCompletedTest?: boolean;
};

export default function DashboardProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    authService
      .getProfile(user.id)
      .then((data) => setProfile(data))
      .catch(() => setProfile(user as ProfileData))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-(--primary)" size={34} />
      </div>
    );
  }

  const current = profile || (user as ProfileData | null);
  if (!current) return null;

  const initials = `${current.firstName?.[0] ?? ''}${current.lastName?.[0] ?? ''}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-4xl border border-(--border) p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-22 h-22 rounded-3xl bg-(--tint-blue) text-(--primary) flex items-center justify-center text-2xl font-black">
            {initials || <UserCircle2 size={28} />}
          </div>
          <div>
            <h1 className="text-3xl font-black text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
              {current.firstName} {current.lastName}
            </h1>
            <p className="text-(--muted) mt-1 inline-flex items-center gap-2">
              <Mail size={14} /> {current.email}
            </p>
            <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-(--dim)">
              Role: {current.role}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-4xl border border-(--border) p-7 shadow-sm">
          <h2 className="font-black text-(--ink) mb-5 inline-flex items-center gap-2">
            <GraduationCap size={18} /> Academic
          </h2>
          <div className="space-y-3 text-sm">
            <p><span className="text-(--dim) font-bold">Education:</span> {current.educationLevel || 'Not specified'}</p>
            <p><span className="text-(--dim) font-bold">Goal:</span> {current.goal || 'Not specified'}</p>
            <p><span className="text-(--dim) font-bold">Test Completed:</span> {current.hasCompletedTest ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="bg-white rounded-4xl border border-(--border) p-7 shadow-sm">
          <h2 className="font-black text-(--ink) mb-5 inline-flex items-center gap-2">
            <MapPin size={18} /> Personal
          </h2>
          <div className="space-y-3 text-sm">
            <p><span className="text-(--dim) font-bold">City:</span> {current.city || 'Not specified'}</p>
            <p><span className="text-(--dim) font-bold">Age range:</span> {current.ageRange || 'Not specified'}</p>
            <p className="inline-flex items-center gap-2 mt-2 text-(--accent) font-bold">
              <Target size={14} /> Keep progressing in your roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
