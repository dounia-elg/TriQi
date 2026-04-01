'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Layers, Map, HelpCircle,
  FileText, School, Sparkles, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import ProtectedRoute from '@/components/ProtectedRoute';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Categories', href: '/admin/categories', icon: Layers },
  { label: 'Domains', href: '/admin/domains', icon: Map },
  { label: 'Questions', href: '/admin/questions', icon: HelpCircle },
  { label: 'Roadmap Templates', href: '/admin/roadmaps', icon: FileText },
  { label: 'Institutions', href: '/admin/institutions', icon: School },
  { label: 'AI Suggest', href: '/admin/ai-suggest', icon: Sparkles },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex bg-[#F0F8FF]">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-(--border) flex flex-col fixed inset-y-0 z-50">
          <div className="p-8">
            <Logo size="md" />
            <p className="text-[10px] font-bold text-[#1d638f] uppercase tracking-widest mt-2 opacity-60">Admin Dashboard</p>
          </div>

          <nav className="flex-1 px-6 space-y-2 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group
                    ${isActive ? 'bg-[#ebf6fd] text-[#1d638f] font-bold' : 'text-[#57687f] hover:bg-[#F0F8FF] hover:text-[#1E293B]'}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={isActive ? 'text-[#1d638f]' : 'text-[#8a9ab1]'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-(--border)">
            <button onClick={logout} className="flex items-center gap-4 w-full p-4 text-[#57687f] hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl">
              <LogOut size={20} />
              <span className="text-sm font-bold">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-80 min-h-screen flex flex-col">
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-(--border) flex items-center justify-between px-10 sticky top-0 z-40">
            <h2 className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: 'Lora, serif' }}>
              {navItems.find(item => pathname === item.href)?.label || 'Administration'}
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#1E293B]">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#1d638f] font-bold">System Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ebf6fd] flex items-center justify-center text-[#1d638f] font-bold border border-[#1d638f]/10">
                {user?.firstName?.[0]}
              </div>
            </div>
          </header>

          <section className="p-10 flex-1">{children}</section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
