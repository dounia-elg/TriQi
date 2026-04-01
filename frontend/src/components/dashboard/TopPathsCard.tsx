import Link from 'next/link';
import { Target, Loader2 } from 'lucide-react';
import type { DomainScore } from '@/hooks/use-dashboard';

interface TopPathsCardProps {
  loadingExtras: boolean;
  topTwo: DomainScore[];
}

export function TopPathsCard({ loadingExtras, topTwo }: TopPathsCardProps) {
  return (
    <div className="bg-(--surface) p-8 rounded-4xl border border-(--border) shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-(--tint-blue) text-(--primary) flex items-center justify-center">
            <Target size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
              Your Top Paths
            </h2>
            <p className="text-xs font-bold text-(--muted) uppercase tracking-widest mt-0.5">
              Test Results
            </p>
          </div>
        </div>
        <Link href="/dashboard/results" className="text-xs font-bold text-(--primary) hover:underline">
          Details →
        </Link>
      </div>

      {loadingExtras && topTwo.length === 0 ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-(--primary)" size={32} />
        </div>
      ) : topTwo.length === 0 ? (
        <p className="text-sm text-(--muted)">No scores yet — open results to refresh.</p>
      ) : (
        <div className="space-y-4">
          {topTwo.map((d, idx) => {
            const pct = Math.min(100, Math.round(Number(d.score) || 0));
            const isFirst = idx === 0;
            return (
              <div
                key={`${d.domainName}-${idx}`}
                className={
                  isFirst
                    ? 'p-4 rounded-3xl bg-(--tint-green) border-2 border-(--green) flex items-center justify-between relative overflow-hidden group transition-colors cursor-default'
                    : 'p-4 rounded-3xl bg-(--tint-yellow) border border-(--yellow) flex items-center justify-between hover:border-(--yellow) transition-colors cursor-default'
                }
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={
                      isFirst
                        ? 'w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-(--accent) font-black text-lg'
                        : 'w-10 h-10 rounded-full bg-white flex items-center justify-center text-(--yellow) font-bold text-sm shadow-sm'
                    }
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-(--ink) text-lg">{d.domainName}</h3>
                    <p
                      className={
                        isFirst
                          ? 'text-xs font-bold text-(--accent) uppercase tracking-wider mt-0.5'
                          : 'text-[10px] font-bold text-(--yellow) uppercase tracking-wider mt-0.5'
                      }
                    >
                      {pct}% match
                    </p>
                  </div>
                </div>
                <div
                  className={
                    isFirst
                      ? 'w-20 h-2 bg-white rounded-full overflow-hidden shadow-inner relative z-10'
                      : 'w-14 h-1.5 bg-white rounded-full overflow-hidden shadow-inner'
                  }
                >
                  <div
                    className={isFirst ? 'h-full bg-(--accent)' : 'h-full bg-(--yellow)'}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
