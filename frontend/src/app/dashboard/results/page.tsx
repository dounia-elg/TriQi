'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resultsService } from '@/services/results.service';
import { 
  Trophy, Sparkles, BookOpen, GraduationCap, 
  ArrowRight, RefreshCcw, Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const data = await resultsService.getLatest();
        if (!data) router.push('/dashboard');
        else setResult(data);
      } catch (err) {
        console.error("Failed to load results:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [router]);

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-(--primary)" size={48} />
    </div>
  );

  if (!result) return null;

  const topDomains = result.domainScores.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      
      {/* Mini Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
              <h1 className="text-4xl font-black text-(--ink) mb-2" style={{ fontFamily: 'Lora, serif' }}>Your Career Roadmap</h1>
              <p className="text-(--text) font-medium">Deep analysis of your profile and potential pathways.</p>
          </div>
          <Link href="/orientation-test" className="btn-ghost flex items-center gap-2 self-start">
              <RefreshCcw size={16} /> Retake Test
          </Link>
      </div>

      {/* Top Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topDomains.map((d: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-[32px] border border-(--border) shadow-sm hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-(--dim)">Match Level</span>
                      <Trophy size={20} className="text-(--yellow)" />
                  </div>
                  <p className="text-4xl font-black text-(--primary) mb-2">{Math.round(d.score)}%</p>
                  <h3 className="text-xl font-bold text-(--ink) mb-6" style={{ fontFamily: 'Lora, serif' }}>{d.domainName}</h3>
                  <div className="h-1.5 w-full bg-(--bg) rounded-full overflow-hidden">
                      <div className="h-full bg-(--primary) rounded-full" style={{ width: `${d.score}%` }} />
                  </div>
              </div>
          ))}
      </div>

      {/* Explanations Section */}
      <div className="bg-white/40 border border-white rounded-[40px] p-8 md:p-12">
          <div className="flex items-center gap-3 mb-10">
              <Sparkles size={24} className="text-(--pink)" />
              <h2 className="text-2xl font-bold text-(--ink)">AI Career Insights</h2>
          </div>

          <div className="space-y-4">
              {result.explanations.map((exp: any, idx: number) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-(--border) hover:border-(--pink) transition-colors">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>{exp.domainName}</h3>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              exp.intensity === 'high' ? "bg-(--tint-pink) text-(--pink)" : "bg-(--tint-blue) text-(--primary)"
                          }`}>
                              {exp.intensity} match
                          </span>
                      </div>
                      <p className="text-(--text) leading-relaxed">{exp.text}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Final Call to Action */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard" className="bg-(--ink) text-white p-8 rounded-[32px] flex items-center justify-between group hover:scale-[1.02] transition-all">
              <div>
                  <h4 className="font-bold text-lg mb-1">Explore Full Roadmap</h4>
                  <p className="text-slate-400 text-sm">Step-by-step interactive path</p>
              </div>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link href="/institutions" className="bg-white border border-(--border) p-8 rounded-[32px] flex items-center justify-between group hover:scale-[1.02] transition-all">
              <div>
                  <h4 className="font-bold text-lg mb-1 text-(--ink)">Matching Institutions</h4>
                  <p className="text-(--dim) text-sm">Schools & Universities for you</p>
              </div>
              <ArrowRight className="text-(--primary) group-hover:translate-x-2 transition-transform" />
          </Link>
      </div>
    </div>
  );
}
