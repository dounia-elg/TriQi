'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resultsService } from '@/services/results.service';
import { 
  Trophy, Sparkles, BookOpen, GraduationCap, 
  ArrowRight, RefreshCcw, Loader2, Star
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
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-(--primary)" size={40} />
      <p className="text-(--dim) font-black text-[10px] uppercase tracking-widest">Analyzing your profile...</p>
    </div>
  );

  if (!result) return null;

  const topMatch = result.domainScores[0];
  const otherMatches = result.domainScores.slice(1, 3);

  return (
    <div className="max-w-6xl mx-auto py-6">
      
      {/*  Compact Top Match Hero */}
      <div className="bg-white rounded-4xl p-8 border border-(--border) shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-(--tint-blue) rounded-full blur-3xl opacity-50 -translate-y-12 translate-x-12" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--tint-blue) text-(--primary) text-[10px] font-black uppercase tracking-widest mb-4">
                      <Star size={12} fill="currentColor" /> Top Career Path
                  </div>
                  <h1 className="text-4xl font-black text-(--ink) mb-3" style={{ fontFamily: 'Lora, serif' }}>{topMatch.domainName}</h1>
                  <p className="text-(--text) text-lg opacity-80 mb-6">Based on your results, you have a natural affinity for this field. This is your strongest matching pathway.</p>
                  <Link href="/orientation-test" className="text-(--dim) hover:text-(--primary) flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors justify-center md:justify-start">
                      <RefreshCcw size={14} /> Retake Test
                  </Link>
              </div>

              <div className="w-48 h-48 rounded-full border-10 border-(--tint-blue) flex flex-col items-center justify-center bg-white shadow-lg shrink-0">
                  <span className="text-4xl font-black text-(--ink)">{Math.round(topMatch.score)}%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-(--dim)">Match</span>
              </div>
          </div>
      </div>

      {/* 📊 Focused Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Detailed Explanations */}
          <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-(--pink)" />
                  <h2 className="text-xl font-bold text-(--ink)">Why these match you?</h2>
              </div>
              
              {result.explanations.map((exp: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-(--border) hover:border-(--primary) transition-all shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-(--ink) text-lg">{exp.domainName}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              exp.intensity === 'high' ? "bg-(--tint-pink) text-(--pink)" : "bg-(--tint-blue) text-(--primary)"
                          }`}>
                              {exp.intensity} alignment
                          </span>
                      </div>
                      <p className="text-(--text) text-sm leading-relaxed opacity-90">{exp.text}</p>
                  </div>
              ))}
          </div>

          {/* Sidebar: Next Best Matches */}
          <div className="space-y-6">
              <h2 className="text-xl font-bold text-(--ink) mb-2">Other Matches</h2>
              <div className="grid grid-cols-1 gap-4">
                  {otherMatches.map((d: any, idx: number) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-(--border) shadow-sm">
                          <h3 className="font-bold text-(--ink) mb-4 text-sm">{d.domainName}</h3>
                          <div className="flex items-end justify-between mb-2">
                              <span className="text-2xl font-black text-(--primary)">{Math.round(d.score)}%</span>
                              <Trophy size={16} className="text-(--yellow) mb-1" />
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-(--primary) rounded-full" style={{ width: `${d.score}%` }} />
                          </div>
                      </div>
                  ))}
              </div>

              {/* CTAs Sidebar Version */}
              <div className="mt-8 space-y-3">
                  <Link href="/dashboard" className="w-full bg-(--ink) text-white p-5 rounded-2xl flex items-center justify-between group hover:bg-slate-800 transition-all">
                      <span className="font-bold text-sm">View Roadmap</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/institutions" className="w-full bg-white border border-(--border) text-(--ink) p-5 rounded-2xl flex items-center justify-between group hover:border-(--primary) transition-all">
                      <span className="font-bold text-sm">Find Schools</span>
                      <ArrowRight size={18} className="text-(--primary) group-hover:translate-x-1 transition-transform" />
                  </Link>
              </div>
          </div>

      </div>
    </div>
  );
}
