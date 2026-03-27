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
      <div className="flex items-center justify-between bg-[var(--surface)] p-8 rounded-4xl border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--tint-purple)] flex items-center justify-center text-[var(--purple)]">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: 'Lora, serif' }}>AI Institution Suggester</h1>
            <p className="text-[var(--muted)] text-sm">Discover top universities and schools instantly using AI.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form Column */}
        <div className="lg:col-span-1 bg-[var(--surface)] p-6 rounded-4xl border border-[var(--border)] shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[var(--ink)] mb-6 flex items-center gap-2">
            <Sparkles className="text-[var(--purple)]" size={18} /> Generate Ideas
          </h2>
          
          <form onSubmit={handleSuggest} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[var(--dim)] uppercase tracking-widest mb-2 flex items-center gap-2">
                <BookOpen size={14} /> Career Domain
              </label>
              <input 
                required type="text" value={domain} onChange={e => setDomain(e.target.value)}
                placeholder="e.g. Data Science"
                className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[var(--tint-blue)] focus:border-[var(--primary)] transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--dim)] uppercase tracking-widest mb-2 flex items-center gap-2">
                <MapPin size={14} /> Country / Region
              </label>
              <input 
                required type="text" value={country} onChange={e => setCountry(e.target.value)}
                placeholder="e.g. France"
                className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[var(--tint-blue)] focus:border-[var(--primary)] transition-colors"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !domain.trim() || !country.trim()}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 rounded-2xl shadow-md hover:scale-[1.02] disabled:opacity-50 transition-all"
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
        <div className="lg:col-span-2 bg-[var(--surface)] p-6 rounded-4xl border border-[var(--border)] shadow-sm min-h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-[var(--ink)] mb-6 flex items-center gap-2">
            Results
          </h2>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--dim)] animate-pulse">
              <Sparkles size={40} className="mb-4 text-[var(--purple)]" />
              <p>AI is researching the best matching institutions...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-3">
              {suggestions.map((inst, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[var(--tint-blue)] bg-[var(--bg)] hover:border-[var(--blue)] transition-colors group">
                  <div className="font-bold text-[var(--ink)] text-lg" style={{ fontFamily: 'Lora, serif' }}>
                    {inst.replace(/^\d+\.\s*/, '')}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(inst.replace(/^\d+\.\s*/, ''), idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all sm:opacity-0 sm:group-hover:opacity-100 ${
                      copiedIndex === idx 
                        ? 'bg-[var(--tint-green)] text-[var(--accent)]'
                        : 'bg-white border border-[var(--tint-blue)] text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)]'
                    }`}
                  >
                    {copiedIndex === idx ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy Name</>}
                  </button>
                </div>
              ))}
              <div className="mt-8 p-4 rounded-2xl bg-[var(--tint-yellow)] border border-[var(--yellow)]/20 flex gap-3 text-[var(--yellow)]">
                <BookOpen size={24} className="shrink-0" />
                <p className="text-sm font-medium">Use the <b>Copy Name</b> button to quickly transfer an institution to your Institutions Database!</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--dim)] opacity-60">
              <div className="w-20 h-20 mb-4 rounded-full bg-[var(--bg)] flex items-center justify-center">
                <Sparkles size={32} className="text-[var(--primary)]" />
              </div>
              <p>Enter a Domain and Country to get AI suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
