import Link from 'next/link';
import { School } from 'lucide-react';
import type { Institution } from '@/hooks/use-dashboard';

interface InstitutionsCardProps {
  institutions: Institution[];
}

export function InstitutionsCard({ institutions }: InstitutionsCardProps) {
  return (
    <div className="bg-(--surface) p-8 rounded-4xl border border-(--border) shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--tint-pink) text-(--pink) flex items-center justify-center">
            <School size={20} />
          </div>
          <h3 className="font-bold text-(--ink)">Dream Institutions</h3>
        </div>
        <Link href="/dashboard/institutions" className="text-xs font-bold text-(--primary) hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {institutions.length === 0 ? (
          <div className="col-span-2 text-sm text-(--muted) py-4 text-center">
            <Link href="/dashboard/institutions" className="text-(--primary) font-bold">
              Browse recommended schools →
            </Link>
          </div>
        ) : (
          institutions.map((i) => (
            <Link
              key={i._id}
              href="/dashboard/institutions"
              className="p-4 rounded-3xl bg-(--bg) border border-(--border) text-center hover:border-(--pink) transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white mx-auto mb-3 flex items-center justify-center shadow-sm text-(--pink) font-bold text-xs ring-4 ring-(--tint-pink)">
                {i.name.slice(0, 4).toUpperCase()}
              </div>
              <p className="text-xs font-bold text-(--ink) line-clamp-1">{i.name}</p>
              <p className="text-[10px] font-bold text-(--dim) mt-1">{i.city || '—'}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
