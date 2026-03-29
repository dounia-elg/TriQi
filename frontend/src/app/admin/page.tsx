'use client';

import { useEffect, useState, useMemo } from 'react';
import { Users, HelpCircle, Map, School, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  adminService,
  AdminDashboardStats,
} from '@/services/admin.service';

const statConfig = [
  {
    key: 'totalUsers' as const,
    label: 'Total Users',
    icon: Users,
    color: '#8cc1e4',
  },
  {
    key: 'activeQuestions' as const,
    label: 'Active Questions',
    icon: HelpCircle,
    color: '#db81a2',
  },
  {
    key: 'definedDomains' as const,
    label: 'Defined Domains',
    icon: Map,
    color: '#79d384',
  },
  {
    key: 'eliteInstitutions' as const,
    label: 'Elite Institutions',
    icon: School,
    color: '#e6ca71',
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    adminService
      .getDashboardStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled)
          setStats({
            totalUsers: 0,
            activeQuestions: 0,
            definedDomains: 0,
            eliteInstitutions: 0,
          });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(
    () =>
      statConfig.map((s) => ({
        ...s,
        value: stats ? fmt(stats[s.key]) : '—',
      })),
    [stats],
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-(--border) relative overflow-hidden">
        <div className="relative z-10">
          <h1
            className="text-4xl font-bold text-[#1E293B] mb-4"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-[#57687f] text-lg max-w-xl">
            Manage the TriQi ecosystem with ease using the new tools.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ebf6fd] rounded-full -translate-x-1/4 -translate-y-1/2 blur-3xl opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-4xl border border-(--border) shadow-sm"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-bold text-[#8a9ab1] uppercase tracking-widest">
              {stat.label}
            </p>
            <p
              className="text-3xl font-black text-[#1E293B] mt-1 flex items-center gap-2 min-h-9"
              style={{ fontFamily: 'Lora, serif' }}
            >
              {loading ? (
                <Loader2 size={28} className="animate-spin text-[#1d638f]" />
              ) : (
                stat.value
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
