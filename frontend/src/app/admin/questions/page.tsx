'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, Plus, Pencil, Trash2, X, Loader2, Check, X as XIcon, Settings2 } from 'lucide-react';
import { questionsService } from '@/services/questions.service';
import { domainsService } from '@/services/domains.service';

interface Domain {
  _id: string;
  name: string;
}

interface DomainWeight {
  domainId: string;
  weight: number;
}

interface Choice {
  text: string;
  weights: DomainWeight[];
}

interface Question {
  _id: string;
  text: string;
  category: 'interests' | 'personality' | 'abilities';
  choices: Choice[];
  isActive: boolean;
}

export default function QuestionsManagement() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    text: string;
    category: 'interests' | 'personality' | 'abilities';
    choices: Choice[];
    isActive: boolean;
  }>({
    text: '',
    category: 'personality',
    choices: [],
    isActive: true
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [qData, dData] = await Promise.all([
        questionsService.getAllAdmin(),
        domainsService.getAll()
      ]);
      setQuestions(qData);
      setDomains(dData);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenModal = (q?: Question) => {
    if (q) {
      setEditingId(q._id);
      setFormData({ 
        text: q.text, 
        category: q.category,
        choices: JSON.parse(JSON.stringify(q.choices)), 
        isActive: q.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ 
        text: '', 
        category: 'personality', 
        choices: [{ text: '', weights: [] }], 
        isActive: true 
      });
    }
    setIsModalOpen(true);
  };

  const addChoice = () => {
    setFormData(prev => ({ ...prev, choices: [...prev.choices, { text: '', weights: [] }] }));
  };

  const removeChoice = (cIdx: number) => {
    setFormData(prev => ({ ...prev, choices: prev.choices.filter((_, i) => i !== cIdx) }));
  };

  const updateChoiceText = (cIdx: number, text: string) => {
    const newChoices = [...formData.choices];
    newChoices[cIdx].text = text;
    setFormData(prev => ({ ...prev, choices: newChoices }));
  };

  const addWeight = (cIdx: number) => {
    const newChoices = [...formData.choices];
    newChoices[cIdx].weights.push({ domainId: domains[0]?._id || '', weight: 1 });
    setFormData(prev => ({ ...prev, choices: newChoices }));
  };

  const removeWeight = (cIdx: number, wIdx: number) => {
    const newChoices = [...formData.choices];
    newChoices[cIdx].weights.splice(wIdx, 1);
    setFormData(prev => ({ ...prev, choices: newChoices }));
  };

  const updateWeight = (cIdx: number, wIdx: number, field: 'domainId'|'weight', val: any) => {
    const newChoices = [...formData.choices];
    newChoices[cIdx].weights[wIdx] = { ...newChoices[cIdx].weights[wIdx], [field]: val };
    setFormData(prev => ({ ...prev, choices: newChoices }));
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await questionsService.update(editingId, formData);
      } else {
        await questionsService.create(formData);
      }
      closeModal();
      loadData();
    } catch (error) {
       alert('Failed to save question.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Delete this question?`)) {
      try {
        await questionsService.delete(id);
        loadData();
      } catch (error) {
        alert('Failed to delete.');
      }
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-[#1d638f]" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-8 rounded-4xl border border-(--border) shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fdf0f5] flex items-center justify-center text-[#db81a2]"><HelpCircle size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>Questions Management</h1>
            <p className="text-[#57687f] text-sm">Design the orientation test questions, choices, and scoring logic.</p>
          </div>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Question
        </button>
      </div>

      <div className="bg-white rounded-4xl border border-(--border) shadow-sm overflow-hidden auto-x-scroll">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F0F8FF] text-[#8a9ab1] text-xs uppercase tracking-widest border-b border-(--border)">
              <th className="px-6 py-5 font-bold">Question Text</th>
              <th className="px-6 py-5 font-bold">Category</th>
              <th className="px-6 py-5 font-bold">Choices</th>
              <th className="px-6 py-5 font-bold text-center">Status</th>
              <th className="px-6 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-[#57687f]">No questions created yet.</td></tr>
            ) : questions.map((q) => (
              <tr key={q._id} className="border-b border-(--border) last:border-0 hover:bg-[#F9FAFB]">
                <td className="px-6 py-4 font-bold text-[#1E293B] max-w-sm truncate">{q.text}</td>
                <td className="px-6 py-4 text-[#57687f] capitalize">{q.category}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#ebf6fd] text-[#1d638f] text-xs font-bold rounded-full">{q.choices.length} Options</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex p-1 rounded-full ${q.isActive ? 'bg-[#e2f8eb] text-[#2ba88a]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                    {q.isActive ? <Check size={14} /> : <XIcon size={14} />}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <button onClick={() => handleOpenModal(q)} className="p-2 text-[#1d638f] bg-[#ebf6fd] hover:bg-[#8cc1e4] rounded-xl"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(q._id)} className="p-2 text-[#db81a2] bg-[#fdf0f5] hover:bg-[#f9d5e3] rounded-xl"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between p-6 border-b border-(--border) bg-[#F0F8FF]">
              <h2 className="text-xl font-bold text-[#1E293B]">{editingId ? 'Edit Question' : 'New Question'}</h2>
              <button type="button" onClick={closeModal} className="text-[#8a9ab1] hover:text-[#db81a2]"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Question Text</label>
                  <textarea required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} 
                    className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] h-24 resize-none" placeholder="e.g. How do you prefer to learn?" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8a9ab1] uppercase mb-2">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} 
                    className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] bg-white mb-4">
                    <option value="interests">Interests</option>
                    <option value="personality">Personality</option>
                    <option value="abilities">Abilities</option>
                  </select>
                  
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="isActiveQ" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 rounded border-2" />
                    <label htmlFor="isActiveQ" className="text-sm font-bold text-[#1E293B]">Question is Active</label>
                  </div>
                </div>
              </div>

              <div className="border-t border-(--border) pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#1E293B]">Choices & Scoring</h3>
                  <button type="button" onClick={addChoice} className="text-sm font-bold text-[#1d638f] flex items-center gap-1 hover:bg-[#ebf6fd] px-3 py-1.5 rounded-full"><Plus size={16}/> Add Choice</button>
                </div>
                
                <div className="space-y-4">
                  {formData.choices.map((choice, cIdx) => (
                    <div key={cIdx} className="p-5 rounded-2xl border border-(--border) bg-[#F9FAFB]">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <input required type="text" value={choice.text} onChange={e => updateChoiceText(cIdx, e.target.value)} placeholder={`Choice ${cIdx + 1} text (use Title | Description for icons)`} 
                            className="w-full rounded-xl py-2 px-3 outline-none border-2 border-transparent focus:border-[#1d638f]" />
                        </div>
                        <button type="button" onClick={() => removeChoice(cIdx)} className="text-[#db81a2] hover:bg-[#fdf0f5] p-2 rounded-lg h-fit"><Trash2 size={18} /></button>
                      </div>
                      
                      {/* Weights Array */}
                      <div className="pl-4 border-l-2 border-[#ebf6fd] space-y-2">
                        {choice.weights.map((w, wIdx) => (
                          <div key={wIdx} className="flex gap-2 items-center">
                            <Settings2 size={14} className="text-[#8a9ab1]"/>
                            <select value={w.domainId} onChange={e => updateWeight(cIdx, wIdx, 'domainId', e.target.value)} className="rounded-lg py-1 px-2 border outline-none text-sm min-w-37.5">
                              {domains.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                            </select>
                            <span className="text-xs font-bold text-[#8a9ab1]">Weight:</span>
                            <input type="number" min="0" max="5" value={w.weight} onChange={e => updateWeight(cIdx, wIdx, 'weight', Number(e.target.value))} className="w-16 rounded-lg py-1 px-2 border outline-none text-sm text-center" />
                            <button type="button" onClick={() => removeWeight(cIdx, wIdx)} className="text-red-400 hover:text-red-600 ml-2"><X size={14}/></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addWeight(cIdx)} className="text-xs font-bold text-[#57687f] hover:text-[#1d638f] flex items-center gap-1 mt-2">
                          <Plus size={12}/> Link to Domain
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            
            <div className="p-6 border-t border-(--border) bg-[#F0F8FF] flex justify-end gap-3 rounded-b-4xl">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-full font-bold text-[#57687f]">Cancel</button>
              <button type="submit" onClick={handleSubmit} disabled={saving || formData.choices.length === 0} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 className="animate-spin" size={18} /> : 'Save Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
