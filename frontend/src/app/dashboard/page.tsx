'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Compass, ArrowRight, BrainCircuit, Target, Sparkles, BookOpen, School } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-(--surface) rounded-4xl p-10 shadow-sm border border-(--border) relative overflow-hidden">
        {/* Colorful Abstract Orbs */}
        <div className="absolute -top-32 -right-10 w-80 h-80 bg-(--tint-pink) rounded-full blur-3xl opacity-80" />
        <div className="absolute -bottom-32 -left-10 w-80 h-80 bg-(--tint-lemon) rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-(--tint-blue) rounded-full blur-3xl opacity-60" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex gap-1.5 mb-5">
              {['var(--blue)','var(--pink)','var(--green)','var(--lemon)'].map(c => (
                <span key={c} className="h-1.5 w-8 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
              Your future starts here{user?.firstName ? `, ${user.firstName}` : ''}.
            </h1>
            <p className="text-(--text) text-lg leading-relaxed mb-6 font-medium">
              {user?.hasCompletedTest 
                ? "You've successfully completed the orientation test. Let's explore the career paths and institutions that align with your unique profile."
                : "The first step to finding your dream career is understanding yourself. Take our AI-powered orientation test to get personalized recommendations."}
            </p>
            
            {!user?.hasCompletedTest && (
              <Link href="/orientation-test" className="inline-flex items-center gap-2 bg-(--primary) text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-[0_8px_32px_rgba(91,170,220,0.4)] hover:-translate-y-1 transition-all">
                <Compass size={20} />
                Start My Orientation Test
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex relative">
             <div className="absolute inset-0 bg-linear-to-br from-(--blue) to-(--pink) rounded-3xl blur-xl opacity-40 animate-pulse" />
             <div className="relative w-32 h-32 rounded-3xl bg-white flex items-center justify-center border-2 border-(--tint-blue) shadow-xl rotate-3 hover:rotate-6 transition-transform">
               {user?.hasCompletedTest ? <Target size={56} className="text-(--accent)" /> : <BrainCircuit size={56} className="text-(--pink)" />}
             </div>
          </div>
        </div>
      </div>

      {user?.hasCompletedTest ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* US13.2 - Results Summary Widget */}
          <div className="bg-(--surface) p-8 rounded-4xl border border-(--border) shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-(--tint-blue) text-(--primary) flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>Your Top Paths</h2>
                  <p className="text-xs font-bold text-(--muted) uppercase tracking-widest mt-0.5">Test Results</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
               {/* 1st Place */}
               <div className="p-4 rounded-3xl bg-(--tint-green) border-2 border-(--green) flex items-center justify-between relative overflow-hidden group transition-colors cursor-default">
                 <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-(--accent) font-black text-lg">1</div>
                   <div>
                     <h3 className="font-bold text-(--ink) text-lg">Software Engineering</h3>
                     <p className="text-xs font-bold text-(--accent) uppercase tracking-wider mt-0.5">92% Match Score</p>
                   </div>
                 </div>
                 <div className="w-20 h-2 bg-white rounded-full overflow-hidden shadow-inner relative z-10">
                   <div className="h-full bg-(--accent) w-[92%]" />
                 </div>
               </div>

               {/* 2nd Place */}
               <div className="p-4 rounded-3xl bg-(--tint-yellow) border border-(--yellow) flex items-center justify-between hover:border-(--yellow) transition-colors cursor-default">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-(--yellow) font-bold text-sm shadow-sm">2</div>
                   <div>
                     <h3 className="font-bold text-(--ink)">Data Science</h3>
                     <p className="text-[10px] font-bold text-(--yellow) uppercase tracking-wider mt-0.5">85% Match Score</p>
                   </div>
                 </div>
                 <div className="w-14 h-1.5 bg-white rounded-full overflow-hidden shadow-inner">
                   <div className="h-full bg-(--yellow) w-[85%]" />
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            {/* Call to action for the next step */}
            <div className="flex-1 bg-(--tint-purple) p-8 rounded-4xl border border-(--purple) shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-(--purple) blur-3xl opacity-20 rounded-full" />
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-(--pink) blur-3xl opacity-20 rounded-full" />
              
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-(--purple) mb-5 relative z-10">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-(--ink) mb-2 relative z-10" style={{ fontFamily: 'Lora, serif' }}>Unlock Your Roadmap</h3>
              <p className="text-(--text) text-sm mb-6 max-w-xs leading-relaxed relative z-10">
                We've mapped out a personalized learning journey based on your top domain match.
              </p>
              <Link href="/dashboard/roadmap" className="relative z-10 bg-(--purple) text-white flex items-center gap-2 px-6 py-3 w-fit rounded-full font-bold shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
                <BookOpen size={18} /> View My Roadmap
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
           {/* Colorful Empty states for brand new users */}
           <div className="bg-(--tint-blue) p-8 rounded-4xl border-2 border-(--blue) shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-(--primary) mb-5">
                <Target size={32} />
              </div>
              <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>Results Summary</p>
              <p className="text-xs font-bold text-(--primary) uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full">Take test to unlock</p>
           </div>
           
           <div className="bg-(--tint-green) p-8 rounded-4xl border-2 border-(--green) shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-(--accent) mb-5">
                <BookOpen size={32} />
              </div>
              <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>Learning Roadmap</p>
              <p className="text-xs font-bold text-(--accent) uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full">Take test to unlock</p>
           </div>
           
           <div className="bg-(--tint-pink) p-8 rounded-4xl border-2 border-(--pink) shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-(--pink) mb-5">
                <School size={32} />
              </div>
              <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>Dream Institutions</p>
              <p className="text-xs font-bold text-(--secondary) uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full">Take test to unlock</p>
           </div>
        </div>
      )}
    </div>
  );
}
