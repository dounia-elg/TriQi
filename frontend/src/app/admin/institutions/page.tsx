'use client';

import { useState, useEffect } from 'react';
import { School, Plus, Pencil, Trash2, X, Loader2, Check, X as XIcon, MapPin, Globe } from 'lucide-react';
import { institutionsService } from '@/services/institutions.service';
import { domainsService } from '@/services/domains.service';

interface Domain { _id: string; name: string; }

interface Institution {
  _id: string; name: string; type: string; country: string; city: string;
  website: string; description: string; domainIds: any[]; programs: string[]; isActive: boolean;
}

export default function InstitutionsManagement() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string; type: string; country: string; city: string; website: string; description: string; domainIds: string[]; programsStr: string; isActive: boolean;
  }>({ name: '', type: 'university', country: '', city: '', website: '', description: '', domainIds: [], programsStr: '', isActive: true });

  const loadData = async () => {
    try {
      setLoading(true);
      const [iData, dData] = await Promise.all([ institutionsService.getAll(), domainsService.getAll() ]);
      setInstitutions(iData); setDomains(dData);
    } catch (error) { console.error('Data error', error); } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenModal = (inst?: Institution) => {
    if (inst) {
      setEditingId(inst._id);
      setFormData({
        name: inst.name, type: inst.type, country: inst.country, city: inst.city, website: inst.website || '', description: inst.description || '',
        domainIds: inst.domainIds.map(d => typeof d === 'string' ? d : d._id),
        programsStr: inst.programs?.join(', ') || '', isActive: inst.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', type: 'university', country: '', city: '', website: '', description: '', domainIds: [], programsStr: '', isActive: true });
    }
    setIsModalOpen(true);
  };

  const toggleDomain = (dId: string) => {
    setFormData(prev => {
      const active = prev.domainIds.includes(dId) ? prev.domainIds.filter(id => id !== dId) : [...prev.domainIds, dId];
      return { ...prev, domainIds: active };
    });
  };

  const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const programsArray = formData.programsStr.split(',').map(s => s.trim()).filter(Boolean);
    
    const { programsStr, ...restFormData } = formData;
    
    const payload: any = { ...restFormData, programs: programsArray };
    
    if (!payload.website) {
      delete payload.website;
    }
    if (!payload.description) {
      delete payload.description;
    }

    try {
      if (editingId) await institutionsService.update(editingId, payload);
      else await institutionsService.create(payload);
      closeModal(); loadData();
    } catch (error: any) { 
      alert('Failed to save: ' + JSON.stringify(error.response?.data?.message || error.message)); 
    } finally { setSaving(false); }
  };


  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete the institution "${name}"?`)) {
      try { await institutionsService.delete(id); loadData(); } catch (error) { alert('Failed to delete.'); }
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-[#1d638f]" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-8 rounded-4xl border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fff0e5] flex items-center justify-center text-[#ff8e3c]"><School size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>Institutions Database</h1>
            <p className="text-[#57687f] text-sm">Manage universities, schools, and recommended learning centers.</p>
          </div>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 text-white">
          <Plus size={18} /> Add Institution
        </button>
      </div>

      <div className="bg-white rounded-4xl border border-[var(--border)] shadow-sm overflow-hidden auto-x-scroll">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F0F8FF] text-[#8a9ab1] text-xs uppercase tracking-widest border-b border-[var(--border)]">
              <th className="px-6 py-5 font-bold">Institution Name</th>
              <th className="px-6 py-5 font-bold">Location</th>
              <th className="px-6 py-5 font-bold">Type</th>
              <th className="px-6 py-5 font-bold text-center">Domains</th>
              <th className="px-6 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutions.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-[#57687f]">No institutions recorded.</td></tr>
            ) : institutions.map((inst) => (
              <tr key={inst._id} className="border-b border-[var(--border)] last:border-0 hover:bg-[#F9FAFB]">
                <td className="px-6 py-4 font-bold text-[#1E293B]">
                  {inst.name}
                  <div className="text-xs font-normal text-[#8a9ab1] mt-1 truncate max-w-[200px]">{inst.website || 'No website'}</div>
                </td>
                <td className="px-6 py-4 text-[#57687f] flex items-center gap-2 mt-2"><MapPin size={14}/> {inst.city}, {inst.country}</td>
                <td className="px-6 py-4 text-[#57687f] capitalize">{inst.type}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-[#fff0e5] text-[#ff8e3c] text-xs font-bold rounded-full">{inst.domainIds.length} Linked</span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3 mt-1">
                  <button onClick={() => handleOpenModal(inst)} className="p-2 text-[#1d638f] bg-[#ebf6fd] hover:bg-[#8cc1e4] rounded-xl"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(inst._id, inst.name)} className="p-2 text-[#db81a2] bg-[#fdf0f5] hover:bg-[#f9d5e3] rounded-xl"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between p-6 border-b border-[var(--border)] bg-[#F0F8FF]">
              <h2 className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>{editingId ? 'Edit Institution' : 'New Institution'}</h2>
              <button type="button" onClick={closeModal} className="text-[#8a9ab1] hover:text-[#db81a2]"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Type</label>
                  <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] bg-white">
                    <option value="university">University</option>
                    <option value="school">School / Institute</option>
                    <option value="center">Training Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Country</label>
                  <input required type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">City</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f]" />
                </div>
                <div className="md:col-span-2 flex items-center gap-3 bg-[#F9FAFB] p-4 rounded-2xl border border-[var(--border)]">
                  <Globe className="text-[#8a9ab1]" />
                  <input type="url" placeholder="Website URL (Optional)" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-transparent outline-none text-[#1E293B]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Description / About</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] h-20 resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Available Programs <span className="normal-case font-normal">(Comma separated)</span></label>
                  <input type="text" value={formData.programsStr} onChange={e => setFormData({...formData, programsStr: e.target.value})} placeholder="e.g. BS Computer Science, MS AI" className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f]" />
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-3">Linked Career Domains</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {domains.map(dom => (
                    <label key={dom._id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${formData.domainIds.includes(dom._id) ? 'border-[#1d638f] bg-[#ebf6fd]' : 'border-transparent bg-[#F9FAFB] hover:border-[#ebf6fd]'}`}>
                      <input type="checkbox" checked={formData.domainIds.includes(dom._id)} onChange={() => toggleDomain(dom._id)} className="w-4 h-4 rounded text-[#1d638f] focus:ring-[#1d638f]" />
                      <span className="text-sm font-bold text-[#1E293B] truncate">{dom.name}</span>
                    </label>
                  ))}
                </div>
                {domains.length === 0 && <p className="text-sm text-[#db81a2]">No domains available. Create domains first.</p>}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="isActiveI" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 rounded border-2" />
                <label htmlFor="isActiveI" className="text-sm font-bold text-[#1E293B]">Active Institution</label>
              </div>
            </form>
            
            <div className="p-6 border-t border-[var(--border)] bg-[#F0F8FF] flex justify-end gap-3 rounded-b-4xl">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-full font-bold text-[#57687f]">Cancel</button>
              <button type="submit" onClick={handleSubmit} disabled={saving || !formData.name || !formData.country || !formData.city} className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-md text-white disabled:opacity-50">
                {saving ? <Loader2 className="animate-spin" size={18} /> : 'Save Institution'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
