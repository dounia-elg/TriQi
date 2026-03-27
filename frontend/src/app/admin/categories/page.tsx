'use client';

import { useState, useEffect } from 'react';
import { Layers, Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { categoriesService } from '@/services/categories.service';

interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Fetch data
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Handlers
  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingId(cat._id);
      setFormData({ name: cat.name, description: cat.description || '' });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await categoriesService.update(editingId, formData);
      } else {
        await categoriesService.create(formData);
      }
      closeModal();
      loadCategories(); 
    } catch (error) {
      console.error('Failed to save category', error);
      alert('Failed to save category. Make sure the name is unique.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the category "${name}"?`)) {
      try {
        await categoriesService.delete(id);
        loadCategories();
      } catch (error) {
        console.error('Failed to delete', error);
        alert('Failed to delete category.');
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
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-8 rounded-4xl border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ebf6fd] flex items-center justify-center text-[#1d638f]">
            <Layers size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>Category Management</h1>
            <p className="text-[#57687f] text-sm">Organize the orientation questions into logical groups.</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-4xl border border-[var(--border)] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F0F8FF] text-[#8a9ab1] text-xs uppercase tracking-widest border-b border-[var(--border)]">
              <th className="px-8 py-5 font-bold">Name</th>
              <th className="px-8 py-5 font-bold">Description</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-10 text-center text-[#57687f]">No categories found. Click 'Add Category' to create one.</td>
              </tr>
            ) : categories.map((cat) => (
              <tr key={cat._id} className="border-b border-[var(--border)] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                <td className="px-8 py-5 font-bold text-[#1E293B]">{cat.name}</td>
                <td className="px-8 py-5 text-[#57687f] text-sm max-w-md truncate">{cat.description || '—'}</td>
                <td className="px-8 py-5 text-right flex items-center justify-end gap-3">
                  <button 
                    onClick={() => handleOpenModal(cat)}
                    className="p-2 text-[#1d638f] bg-[#ebf6fd] hover:bg-[#8cc1e4] rounded-xl transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(cat._id, cat.name)}
                    className="p-2 text-[#db81a2] bg-[#fdf0f5] hover:bg-[#f9d5e3] rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-[#F0F8FF]">
              <h2 className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>
                {editingId ? 'Edit Category' : 'New Category'}
              </h2>
              <button onClick={closeModal} className="text-[#8a9ab1] hover:text-[#db81a2] transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase tracking-widest mb-2">Category Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Personality"
                  className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#8a9ab1] uppercase tracking-widest mb-2">Description <span className="text-[#8a9ab1] normal-case tracking-normal font-normal">(Optional)</span></label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What does this category measure?"
                  className="w-full rounded-2xl py-3 px-4 outline-none border-2 border-[#ebf6fd] focus:border-[#1d638f] transition-colors h-24 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-6 py-3 rounded-full font-bold text-[#57687f] hover:bg-[#F0F8FF] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving || !formData.name.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
