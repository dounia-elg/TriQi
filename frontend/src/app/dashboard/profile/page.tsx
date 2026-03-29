'use client';

import { useEffect, useState } from 'react';
import {
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Target,
  UserCircle2,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';

type ProfileData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  educationLevel?: string;
  ageRange?: string;
  city?: string;
  goal?: string;
  language?: string;
  hasCompletedTest?: boolean;
};

type EditForm = {
  firstName: string;
  lastName: string;
  educationLevel: string;
  ageRange: string;
  city: string;
  goal: string;
  language: string;
};

function toForm(p: ProfileData): EditForm {
  return {
    firstName: p.firstName ?? '',
    lastName: p.lastName ?? '',
    educationLevel: p.educationLevel ?? '',
    ageRange: p.ageRange ?? '',
    city: p.city ?? '',
    goal: p.goal ?? '',
    language: p.language ?? 'fr',
  };
}

export default function DashboardProfilePage() {
  const { user, mergeUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<EditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    authService
      .getProfile(user.id)
      .then((data) => setProfile(normalizeProfile(data, user)))
      .catch(() => setProfile(normalizeProfile(user, user)))
      .finally(() => setLoading(false));
  }, [user]);

  const current = profile || (user ? normalizeProfile(user, user as ProfileData) : null);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-(--primary)" size={34} />
      </div>
    );
  }

  if (!current) return null;

  const initials = `${current.firstName?.[0] ?? ''}${current.lastName?.[0] ?? ''}`;

  const startEdit = () => {
    setError(null);
    setForm(toForm(current));
    setEditing(true);
  };

  const cancelEdit = () => {
    setError(null);
    setEditing(false);
    setForm(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await authService.updateProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        educationLevel: form.educationLevel.trim(),
        ageRange: form.ageRange.trim(),
        city: form.city.trim() || undefined,
        goal: form.goal.trim() || undefined,
        language: form.language.trim() || 'fr',
      });
      const next = normalizeProfile(updated, user!);
      mergeUser({
        firstName: next.firstName,
        lastName: next.lastName,
        email: next.email,
        role: next.role,
        educationLevel: next.educationLevel,
        ageRange: next.ageRange,
        city: next.city,
        goal: next.goal,
        language: next.language,
        hasCompletedTest: next.hasCompletedTest,
      });
      setProfile(next);
      setEditing(false);
      setForm(null);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string | string[] } } })?.response?.data
          ?.message;
      setError(
        Array.isArray(message) ? message[0] : message || 'Could not save profile.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-4xl border border-(--border) p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-22 h-22 rounded-3xl bg-(--tint-blue) text-(--primary) flex items-center justify-center text-2xl font-black shrink-0">
              {initials || <UserCircle2 size={28} />}
            </div>
            <div>
              <h1
                className="text-3xl font-black text-(--ink)"
                style={{ fontFamily: 'Lora, serif' }}
              >
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
          {!editing ? (
            <button type="button" onClick={startEdit} className="btn-ghost btn-sm gap-2">
              <Pencil size={16} /> Edit profile
            </button>
          ) : (
            <button type="button" onClick={cancelEdit} className="btn-ghost btn-sm gap-2">
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {editing && form ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-4xl border border-(--border) p-7 shadow-sm space-y-5"
        >
          <h2 className="font-black text-(--ink)">Update your details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block text-sm font-bold text-(--muted)">
              First name
              <input
                required
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary)"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold text-(--muted)">
              Last name
              <input
                required
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary)"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold text-(--muted)">
              Education level
              <input
                required
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary)"
                value={form.educationLevel}
                onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold text-(--muted)">
              Age range
              <input
                required
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary)"
                value={form.ageRange}
                onChange={(e) => setForm({ ...form, ageRange: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold text-(--muted)">
              City
              <input
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary)"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold text-(--muted)">
              Language
              <select
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary) bg-white"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="md:col-span-2 block text-sm font-bold text-(--muted)">
              Career goal
              <input
                className="mt-1 w-full rounded-2xl border border-(--border) px-4 py-3 text-(--ink) outline-none focus:border-(--primary)"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
              />
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={cancelEdit} className="btn-ghost btn-sm" disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn-primary btn-sm" disabled={saving}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-4xl border border-(--border) p-7 shadow-sm">
            <h2 className="font-black text-(--ink) mb-5 inline-flex items-center gap-2">
              <GraduationCap size={18} /> Academic
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-(--dim) font-bold">Education:</span>{' '}
                {current.educationLevel || 'Not specified'}
              </p>
              <p>
                <span className="text-(--dim) font-bold">Goal:</span>{' '}
                {current.goal || 'Not specified'}
              </p>
              <p>
                <span className="text-(--dim) font-bold">Language:</span>{' '}
                {current.language === 'en' ? 'English' : 'Français'}
              </p>
              <p>
                <span className="text-(--dim) font-bold">Test Completed:</span>{' '}
                {current.hasCompletedTest ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-4xl border border-(--border) p-7 shadow-sm">
            <h2 className="font-black text-(--ink) mb-5 inline-flex items-center gap-2">
              <MapPin size={18} /> Personal
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-(--dim) font-bold">City:</span>{' '}
                {current.city || 'Not specified'}
              </p>
              <p>
                <span className="text-(--dim) font-bold">Age range:</span>{' '}
                {current.ageRange || 'Not specified'}
              </p>
              <p className="inline-flex items-center gap-2 mt-2 text-(--accent) font-bold">
                <Target size={14} /> Keep progressing in your roadmap.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function normalizeProfile(raw: unknown, fallback: ProfileData): ProfileData {
  const r = raw as Record<string, unknown>;
  const id = String(r.id ?? r._id ?? fallback.id);
  const roleRaw = r.role;
  const role: ProfileData['role'] =
    roleRaw === 'ADMIN' || roleRaw === 'USER' ? roleRaw : fallback.role;
  return {
    id,
    firstName: String(r.firstName ?? fallback.firstName),
    lastName: String(r.lastName ?? fallback.lastName),
    email: String(r.email ?? fallback.email),
    role,
    educationLevel: (r.educationLevel as string) ?? fallback.educationLevel,
    ageRange: (r.ageRange as string) ?? fallback.ageRange,
    city: (r.city as string) ?? fallback.city,
    goal: (r.goal as string) ?? fallback.goal,
    language: (r.language as string) ?? fallback.language,
    hasCompletedTest: Boolean(r.hasCompletedTest ?? fallback.hasCompletedTest),
  };
}
