'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Pencil, Trash2, X, Loader2, Check, X as XIcon, CalendarDays, ListChecks } from 'lucide-react';
import { roadmapsService } from '@/services/roadmaps.service';
import { categoriesService } from '@/services/categories.service';

interface Category { _id: string; name: string; }
interface TemplateTask { title: string; description: string; }
interface TemplateWeek { weekNumber: number; theme: string; tasks: TemplateTask[]; }
interface RoadmapTemplate { _id: string; categoryId: any; categoryName: string; durationMonths: number; weeks: TemplateWeek[]; isActive: boolean; }

export default function RoadmapTemplatesManagement() {
  const [templates, setTemplates] = useState<RoadmapTemplate[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    categoryId: string; categoryName: string; durationMonths: number; weeks: TemplateWeek[]; isActive: boolean;
  }>({ categoryId: '', categoryName: '', durationMonths: 3, weeks: [], isActive: true });

  const loadData = async () => {
    try {
      setLoading(true);
      const [tData, cData] = await Promise.all([ roadmapsService.getTemplates(), categoriesService.getAll() ]);
      setTemplates(tData); setCategories(cData);
    } catch (error) { console.error('Failed to load data', error); } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenModal = (t?: RoadmapTemplate) => {
    if (t) {
      setEditingId(t._id);
      setFormData({
        categoryId: typeof t.categoryId === 'string' ? t.categoryId : t.categoryId._id,
        categoryName: t.categoryName,
        durationMonths: t.durationMonths,
        weeks: JSON.parse(JSON.stringify(t.weeks)),
        isActive: t.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ categoryId: categories[0]?._id || '', categoryName: categories[0]?.name || '', durationMonths: 3, weeks: [{ weekNumber: 1, theme: '', tasks: [] }], isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleCategoryChange = (catId: string) => {
    const cat = categories.find(c => c._id === catId);
    setFormData(prev => ({ ...prev, categoryId: catId, categoryName: cat?.name || '' }));
  };

  // Weeks & Tasks Logic
  const addWeek = () => {
    setFormData(prev => ({ ...prev, weeks: [...prev.weeks, { weekNumber: prev.weeks.length + 1, theme: '', tasks: [{ title: '', description: '' }] }] }));
  };
  const removeWeek = (wIdx: number) => {
    setFormData(prev => {
      const newWeeks = prev.weeks.filter((_, i) => i !== wIdx).map((w, i) => ({ ...w, weekNumber: i + 1 }));
      return { ...prev, weeks: newWeeks };
    });
  };
  const updateWeekTheme = (wIdx: number, theme: string) => {
    const newWeeks = [...formData.weeks]; newWeeks[wIdx].theme = theme; setFormData(prev => ({ ...prev, weeks: newWeeks }));
  };
  const addTask = (wIdx: number) => {
    const newWeeks = [...formData.weeks]; newWeeks[wIdx].tasks.push({ title: '', description: '' }); setFormData(prev => ({ ...prev, weeks: newWeeks }));
  };
  const removeTask = (wIdx: number, tIdx: number) => {
    const newWeeks = [...formData.weeks]; newWeeks[wIdx].tasks.splice(tIdx, 1); setFormData(prev => ({ ...prev, weeks: newWeeks }));
  };
  const updateTask = (wIdx: number, tIdx: number, field: 'title'|'description', val: string) => {
    const newWeeks = [...formData.weeks]; newWeeks[wIdx].tasks[tIdx] = { ...newWeeks[wIdx].tasks[tIdx], [field]: val }; setFormData(prev => ({ ...prev, weeks: newWeeks }));
  };

  const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return alert("Select a Category.");
    setSaving(true);
    
    const cleanWeeks = formData.weeks.map(w => ({
      weekNumber: w.weekNumber,
      theme: w.theme,
      tasks: w.tasks.map(t => ({
        title: t.title,
        description: t.description
      }))
    }));

    const cleanData = { ...formData, weeks: cleanWeeks };

    try {
      if (editingId) await roadmapsService.updateTemplate(editingId, cleanData);
      else await roadmapsService.createTemplate(cleanData);
      closeModal(); loadData();
    } catch (error: any) { 
      alert('Failed to save template: ' + (error.response?.data?.message || error.message)); 
    } finally { setSaving(false); }
  };


  const handleDelete = async (id: string) => {
    if (confirm(`Delete this template?`)) {
      try { await roadmapsService.deleteTemplate(id); loadData(); } catch (error) { alert('Failed to delete.'); }
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-[#1d638f]" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-8 rounded-4xl border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f4f2ff] flex items-center justify-center text-[#8B5CF6]"><FileText size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>Roadmap Templates</h1>
            <p className="text-[#57687f] text-sm">Design structured learning paths mapped to student results.</p>
          </div>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 text-white">
          <Plus size={18} /> Add Template
        </button>
      </div>

      <div className="bg-white rounded-4xl border border-[var(--border)] shadow-sm overflow-hidden auto-x-scroll">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F0F8FF] text-[#8a9ab1] text-xs uppercase tracking-widest border-b border-[var(--border)]">
              <th className="px-6 py-5 font-bold">Category Match</th>
              <th className="px-6 py-5 font-bold">Duration</th>
              <th className="px-6 py-5 font-bold">Total Weeks</th>
              <th className="px-6 py-5 font-bold text-center">Status</th>
              <th className="px-6 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-[#57687f]">No templates created yet.</td></tr>
            ) : templates.map((t) => (
              <tr key={t._id} className="border-b border-[var(--border)] last:border-0 hover:bg-[#F9FAFB]">
                <td className="px-6 py-4 font-bold text-[#1E293B]">{t.categoryName}</td>
                <td className="px-6 py-4 text-[#57687f]">{t.durationMonths} Months</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-[#f4f2ff] text-[#8B5CF6] text-xs font-bold rounded-full">{t.weeks.length} Weeks</span></td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex p-1 rounded-full ${t.isActive ? 'bg-[#e2f8eb] text-[#2ba88a]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                    {t.isActive ? <Check size={14} /> : <XIcon size={14} />}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <button onClick={() => handleOpenModal(t)} className="p-2 text-[#1d638f] bg-[#ebf6fd] hover:bg-[#8cc1e4] rounded-xl"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 text-[#db81a2] bg-[#fdf0f5] hover:bg-[#f9d5e3] rounded-xl"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
            <div className="flex justify-between p-6 border-b border-[var(--border)] bg-[#F0F8FF]">
              <h2 className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>{editingId ? 'Edit Template' : 'New Template'}</h2>
              <button type="button" onClick={closeModal} className="text-[#8a9ab1] hover:text-[#db81a2]"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Target Category</label>
                  <select required value={formData.categoryId} onChange={e => handleCategoryChange(e.target.value)} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] bg-white">
                    <option value="" disabled>Select category...</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Duration</label>
                  <select required value={formData.durationMonths} onChange={e => setFormData({...formData, durationMonths: Number(e.target.value)})} className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] bg-white">
                    <option value={3}>3 Months Quick Path</option>
                    <option value={6}>6 Months Deep Path</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 md:mt-8">
                  <input type="checkbox" id="isActiveR" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 rounded border-2" />
                  <label htmlFor="isActiveR" className="text-sm font-bold text-[#1E293B]">Template Active</label>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#1E293B] text-lg" style={{ fontFamily: 'Lora, serif' }}>Roadmap Timeline</h3>
                  <button type="button" onClick={addWeek} className="btn-primary text-white text-sm flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-md"><Plus size={16}/> Add Week</button>
                </div>
                
                <div className="space-y-6">
                  {formData.weeks.map((week, wIdx) => (
                    <div key={wIdx} className="p-6 rounded-3xl border border-[#ebf6fd] bg-white shadow-sm relative group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#ebf6fd] flex items-center justify-center text-[#1d638f] font-black text-lg">{week.weekNumber}</div>
                        <input required type="text" value={week.theme} onChange={e => updateWeekTheme(wIdx, e.target.value)} placeholder="Week Theme (e.g. Introduction & Setup)" className="flex-1 rounded-xl py-2 px-4 outline-none border-2 border-transparent focus:border-[#1d638f] bg-[#F9FAFB] font-bold text-[#1E293B]" />
                        <button type="button" onClick={() => removeWeek(wIdx)} className="text-[#db81a2] hover:bg-[#fdf0f5] p-2 rounded-xl h-fit"><Trash2 size={18} /></button>
                      </div>

                      <div className="pl-4 ml-5 border-l-2 border-[#ebf6fd] space-y-3">
                        {week.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="p-4 rounded-2xl bg-[#F9FAFB] border border-transparent hover:border-[#ebf6fd] flex gap-4 transition-colors">
                            <ListChecks className="text-[#8a9ab1] mt-1" size={18} />
                            <div className="flex-1 space-y-2">
                              <input required type="text" value={task.title} onChange={e => updateTask(wIdx, tIdx, 'title', e.target.value)} placeholder="Task Title (e.g. Install Python)" className="w-full rounded-lg py-1 px-3 outline-none border border-transparent focus:border-[#1d638f] bg-white" />
                              <textarea required value={task.description} onChange={e => updateTask(wIdx, tIdx, 'description', e.target.value)} placeholder="Detailed instructions or resources..." className="w-full rounded-lg py-1 px-3 outline-none border border-transparent focus:border-[#1d638f] bg-white text-sm h-16 resize-none" />
                            </div>
                            <button type="button" onClick={() => removeTask(wIdx, tIdx)} className="text-[#8a9ab1] hover:text-[#db81a2] h-fit p-1"><X size={16}/></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addTask(wIdx)} className="text-sm font-bold text-[#57687f] hover:text-[#1d638f] flex items-center gap-1 mt-2 pl-2"><Plus size={14}/> Add Task</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            
            <div className="p-6 border-t border-[var(--border)] bg-[#F0F8FF] flex justify-end gap-3 rounded-b-4xl">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-full font-bold text-[#57687f]">Cancel</button>
              <button type="submit" onClick={handleSubmit} disabled={saving || formData.weeks.length === 0 || !formData.categoryId} className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-md text-white disabled:opacity-50">
                {saving ? <Loader2 className="animate-spin" size={18} /> : 'Save Template'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
