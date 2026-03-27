'use client';

import { useState, useEffect } from 'react';
import { Map, Plus, Pencil, Trash2, X, Loader2, Check, X as XIcon } from 'lucide-react';
import { domainsService } from '@/services/domains.service';
import { categoriesService } from '@/services/categories.service';

interface Category {
  _id: string;
  name: string;
}

interface Domain {
  _id: string;
  name: string;
  description: string;
  categoryId: Category | string;
  skills: string[];
  isActive: boolean;
}

export default function DomainsManagement() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    skillsString: '',
    isActive: true
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [domData, catData] = await Promise.all([
        domainsService.getAll(),
        categoriesService.getAll()
      ]);
      setDomains(domData);
      setCategories(catData);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenModal = (dom?: Domain) => {
    if (dom) {
      setEditingId(dom._id);
      setFormData({ 
        name: dom.name, 
        description: dom.description,
        categoryId: typeof dom.categoryId === 'string' ? dom.categoryId : dom.categoryId._id,
        skillsString: dom.skills?.join(', ') || '',
        isActive: dom.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', categoryId: categories[0]?._id || '', skillsString: '', isActive: true });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return alert("Please select a Category first.");
    setSaving(true);
    
    // Convert skills string back to array, breaking by comma
    const skillsArray = formData.skillsString.split(',').map(s => s.trim()).filter(Boolean);
    
    const payload = {
      name: formData.name,
      description: formData.description,
      categoryId: formData.categoryId,
      skills: skillsArray,
      isActive: formData.isActive
    };

    try {
      if (editingId) {
        await domainsService.update(editingId, payload);
      } else {
        await domainsService.create(payload);
      }
      closeModal();
      loadData();
    } catch (error) {
      console.error('Failed to save', error);
      alert('Failed to save domain.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete the domain "${name}"?`)) {
      try {
        await domainsService.delete(id);
        loadData();
      } catch (error) {
        alert('Failed to delete domain.');
      }
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1d638f]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-8 rounded-4xl border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#effcfa] flex items-center justify-center text-[#2ba88a]">
            <Map size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>Domains Management</h1>
            <p className="text-[#57687f] text-sm">Define specific career domains logically linked to Categories.</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 text-white"
        >
          <Plus size={18} /> Add Domain
        </button>
      </div>

      <div className="bg-white rounded-4xl border border-[var(--border)] shadow-sm overflow-hidden auto-x-scroll">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F0F8FF] text-[#8a9ab1] text-xs uppercase tracking-widest border-b border-[var(--border)]">
              <th className="px-6 py-5 font-bold">Name</th>
              <th className="px-6 py-5 font-bold">Category</th>
              <th className="px-6 py-5 font-bold">Skills</th>
              <th className="px-6 py-5 font-bold text-center">Status</th>
              <th className="px-6 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {domains.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-[#57687f]">No domains registered yet.</td></tr>
            ) : domains.map((dom) => (
              <tr key={dom._id} className="border-b border-[var(--border)] last:border-0 hover:bg-[#F9FAFB]">
                <td className="px-6 py-4 font-bold text-[#1E293B]">{dom.name}</td>
                <td className="px-6 py-4 text-[#57687f]">
                  {typeof dom.categoryId === 'object' 
                    ? dom.categoryId.name 
                    : categories.find(c => c._id === dom.categoryId)?.name || 'Unknown'}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {dom.skills?.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-[#F0F8FF] text-[#1d638f] text-[10px] font-bold uppercase rounded-md">{s}</span>
                    ))}
                    {(dom.skills?.length || 0) > 3 && <span className="text-xs text-[#8a9ab1] ml-1">+{dom.skills.length - 3}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center justify-center p-1 rounded-full ${dom.isActive ? 'bg-[#e2f8eb] text-[#2ba88a]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                    {dom.isActive ? <Check size={14} /> : <XIcon size={14} />}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <button onClick={() => handleOpenModal(dom)} className="p-2 text-[#1d638f] bg-[#ebf6fd] hover:bg-[#8cc1e4] rounded-xl"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(dom._id, dom.name)} className="p-2 text-[#db81a2] bg-[#fdf0f5] hover:bg-[#f9d5e3] rounded-xl"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between p-6 border-b border-[var(--border)] bg-[#F0F8FF]">
              <h2 className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>{editingId ? 'Edit Domain' : 'New Domain'}</h2>
              <button onClick={closeModal} className="text-[#8a9ab1] hover:text-[#db81a2]"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Domain Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Category Mapping</label>
                <select required value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] bg-white transition-colors">
                  <option value="" disabled>Select a parent category...</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] h-20 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Key Skills <span className="text-[#8a9ab1] normal-case tracking-normal font-normal">(Comma separated)</span></label>
                <input type="text" value={formData.skillsString} onChange={e => setFormData({ ...formData, skillsString: e.target.value })} placeholder="e.g. Logic, Creativity, Analytics"
                  className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] transition-colors" />
              </div>

              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[#1d638f] text-[#1d638f] focus:ring-[#1d638f]" />
                <label htmlFor="isActive" className="text-sm font-bold text-[#1E293B] cursor-pointer">Active Domain</label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border)] mt-4">
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-full font-bold text-[#57687f] hover:bg-[#F0F8FF]">Cancel</button>
                <button type="submit" disabled={saving || !formData.name || !formData.categoryId} className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-md text-white">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : 'Save Domain'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
