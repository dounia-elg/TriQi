'use client';

import { useState } from 'react';
import { Sparkles, MapPin, BookOpen, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { institutionsService } from '@/services/institutions.service';

export default function AISuggestInstitutions() {
  const [domain, setDomain] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !country.trim()) return;
    
    setLoading(true);
    setSuggestions([]);
    try {
      const results = await institutionsService.suggest(domain, country);
      setSuggestions(results);
    } catch (error) {
      alert('Failed to generate AI suggestions. Check your API key or backend logs.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-8 rounded-4xl border border-[var(--border)] shadow-sm relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#1d638f]/20 to-[#db81a2]/20 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1d638f] to-[#db81a2] flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>AI Institution Suggester</h1>
            <p className="text-[#57687f] text-sm">Discover top universities and schools instantly using AI.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form Column */}
        <div className="lg:col-span-1 bg-white p-6 rounded-4xl border border-[var(--border)] shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6 flex items-center gap-2">
            <Sparkles className="text-[#db81a2]" size={18} /> Generate Ideas
          </h2>
          
          <form onSubmit={handleSuggest} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#8a9ab1] uppercase tracking-widest mb-2 flex items-center gap-2">
                <BookOpen size={14} /> Career Domain
              </label>
              <input 
                required type="text" value={domain} onChange={e => setDomain(e.target.value)}
                placeholder="e.g. Data Science"
                className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8a9ab1] uppercase tracking-widest mb-2 flex items-center gap-2">
                <MapPin size={14} /> Country / Region
              </label>
              <input 
                required type="text" value={country} onChange={e => setCountry(e.target.value)}
                placeholder="e.g. France"
                className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] transition-colors"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !domain.trim() || !country.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold shadow-md hover:shadow-lg disabled:opacity-50 transition-all text-white bg-gradient-to-r from-[#1d638f] to-[#2ba88a] hover:scale-[1.02]"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles size={18} /> Generate Institutions</>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 bg-white p-6 rounded-4xl border border-[var(--border)] shadow-sm min-h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6 flex items-center gap-2">
            Results
          </h2>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#8a9ab1] animate-pulse">
              <Sparkles size={40} className="mb-4 text-[#db81a2]" />
              <p>AI is researching the best matching institutions...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-3">
              {suggestions.map((inst, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[#ebf6fd] bg-[#F9FAFB] hover:border-[#8cc1e4] transition-colors group">
                  <div className="font-bold text-[#1E293B] text-lg" style={{ fontFamily: 'Lora, serif' }}>
                    {inst.replace(/^\d+\.\s*/, '')}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(inst.replace(/^\d+\.\s*/, ''), idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all sm:opacity-0 sm:group-hover:opacity-100 ${
                      copiedIndex === idx 
                        ? 'bg-[#e2f8eb] text-[#2ba88a]'
                        : 'bg-white border border-[#ebf6fd] text-[#57687f] hover:bg-[#F0F8FF] hover:text-[#1d638f]'
                    }`}
                  >
                    {copiedIndex === idx ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy Name</>}
                  </button>
                </div>
              ))}
              <div className="mt-8 p-4 rounded-2xl bg-[#fff0e5] border border-[#ff8e3c]/20 flex gap-3 text-[#ff8e3c]">
                <BookOpen size={24} className="shrink-0" />
                <p className="text-sm font-medium">Use the <b>Copy Name</b> button to quickly transfer an institution to your Institutions Database!</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#8a9ab1] opacity-60">
              <div className="w-20 h-20 mb-4 rounded-full bg-[#F0F8FF] flex items-center justify-center">
                <Sparkles size={32} className="text-[#1d638f]" />
              </div>
              <p>Enter a Domain and Country to get AI suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
