'use client';

import { useState, useEffect } from 'react';
import { institutionsService } from '@/services/institutions.service';
import { 
  School, MapPin, Globe, Sparkles, MessageSquare, 
  Search, Loader2, GraduationCap, ChevronRight, Filter
} from 'lucide-react';
import Link from 'next/link';

export default function RecommendedInstitutionsPage() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ country: 'Morocco', city: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecommended = async () => {
    setLoading(true);
    try {
      const data = await institutionsService.getRecommended({
        country: filters.country,
        city: filters.city
      });
      setInstitutions(data);
    } catch (err) {
      console.error("Failed to load institutions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommended();
  }, [filters]);

  const filteredInstitutions = institutions.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-20">
      
      {/*Header Section */}
      <div className="mb-12 relative overflow-hidden bg-white rounded-[40px] p-10 border border-(--border) shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-(--tint-pink) rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--tint-pink) text-(--secondary) text-[10px] font-black uppercase tracking-widest mb-4">
                  <GraduationCap size={14} /> Education Pathways
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-(--ink) mb-4">Dream Institutions</h1>
              <p className="text-(--muted) text-lg max-w-2xl leading-relaxed">
                  Discover elite universities and schools in Morocco and beyond, specifically selected based on your orientation test results.
              </p>
          </div>
      </div>

      {/*Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dim)" size={18} />
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-(--border) bg-white focus:border-(--primary) outline-hidden transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex flex-1 md:flex-none items-center gap-2 px-4 py-4 rounded-2xl border border-(--border) bg-white min-w-37.5">
                  <MapPin size={18} className="text-(--primary)" />
                  <select 
                    className="bg-transparent border-none outline-hidden text-sm font-bold w-full"
                    value={filters.city}
                    onChange={(e) => setFilters({...filters, city: (e.target.value)})}
                  >
                      <option value="">All Cities</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tangier">Tangier</option>
                      <option value="Fes">Fes</option>
                  </select>
              </div>
              <button className="p-4 rounded-2xl bg-(--primary) text-white hover:bg-opacity-90 transition-all shadow-lg shadow-blue-500/10">
                  <Filter size={18} />
              </button>
          </div>
      </div>

      {/*Institutions Grid */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-(--primary)" size={32} />
            <p className="text-(--dim) text-xs font-black uppercase tracking-widest">Matching your profile...</p>
        </div>
      ) : filteredInstitutions.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredInstitutions.map((inst, idx) => (
                <div key={idx} className="bg-white rounded-4xl border border-(--border) hover:border-(--primary) transition-all p-8 flex flex-col group shadow-sm hover:shadow-xl">
                    
                    <div className="flex items-start justify-between gap-6 mb-8">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-(--tint-blue) flex items-center justify-center text-(--primary) shrink-0 border border-blue-100">
                                <School size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-(--ink) leading-tight mb-2 group-hover:text-(--primary) transition-colors">{inst.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--tint-green) text-(--accent) text-[10px] font-black uppercase tracking-widest">
                                        <Globe size={12} /> {inst.city}, {inst.country}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--tint-purple) text-(--lavender) text-[10px] font-black uppercase tracking-widest">
                                        {inst.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-(--muted) text-sm leading-relaxed mb-8 line-clamp-3">
                        {inst.description || "Leading institution offering world-class education in Morocco with a focus on student excellence and career readiness."}
                    </p>

                    {/* AI Section */}
                    <div className="mt-auto space-y-4">
                        <div className="bg-(--tint-blue) p-5 rounded-2xl border border-blue-100/50">
                            <div className="flex items-center gap-2 mb-2 text-(--primary)">
                                <Sparkles size={14} className="fill-(--primary)" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Why it matches?</span>
                            </div>
                            <p className="text-xs text-(--text) font-medium leading-relaxed">
                                {inst.aiExplanation || "This institution has a highly-ranked program in your top orientaton domain."}
                            </p>
                        </div>

                        <div className="bg-(--tint-yellow) p-5 rounded-2xl border border-yellow-100/50">
                            <div className="flex items-center gap-2 mb-2 text-(--yellow)">
                                <MessageSquare size={14} className="fill-(--yellow)" />
                                <span className="text-[10px] font-black uppercase tracking-widest">AI Expert Advice</span>
                            </div>
                            <p className="text-xs text-(--text) font-medium leading-relaxed italic">
                                "{inst.aiAdvice || "Focus on building a strong portfolio of projects to stand out in the application process."}"
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-(--border) flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-(--dim)">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                            <div className="pl-4 text-[10px] font-black text-(--dim) uppercase tracking-widest">Top Programs</div>
                        </div>
                        <a 
                          href={inst.website} 
                          target="_blank" 
                          className="flex items-center gap-2 text-(--primary) font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-all"
                        >
                            Visit Website <ChevronRight size={14} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="bg-white rounded-4xl p-20 text-center border border-(--border) border-dashed">
            <div className="w-20 h-20 bg-(--tint-blue) rounded-full flex items-center justify-center mx-auto mb-6 text-(--primary)">
                <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No institutions found</h3>
            <p className="text-(--muted) mb-8">Try adjusting your filters or complete your orientation test first.</p>
            <button 
              onClick={() => {setFilters({country: 'Morocco', city: ''}); setSearchTerm('')}}
              className="btn-ghost"
            >
                Reset Filters
            </button>
        </div>
      )}

    </div>
  );
}
