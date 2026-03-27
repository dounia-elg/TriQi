'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Map, School, Settings, LogOut, Bell, UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isLoading && !user) router.push('/auth/login');
  }, [user, isLoading, router]);

  if (!mounted || isLoading || !user) return null;

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Roadmap', href: '/dashboard/roadmap', icon: Map },
    { label: 'Dream Institutions', href: '/dashboard/institutions', icon: School },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg) font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-(--surface) border-r border-(--border) flex flex-col justify-between shadow-sm relative z-20">
        <div className="p-8">
          <Link href="/" className="inline-block transform transition-transform hover:scale-105">
            <Logo />
          </Link>
          
          <div className="mt-12 flex flex-col gap-2">
            <p className="text-xs font-bold text-(--dim) uppercase tracking-widest pl-4 mb-4">My Journey</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                    isActive
                      ? 'bg-(--tint-blue) text-(--primary)'
                      : 'text-(--muted) hover:bg-(--bg) hover:text-(--primary)'
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-(--primary)" : "text-(--dim)"} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-8 border-t border-(--border)">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-2xl font-bold text-(--muted) hover:bg-(--tint-pink) hover:text-(--pink) transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-(--bg) relative overflow-y-auto">
        
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-(--bg)/80 backdrop-blur-md border-b border-(--border) px-10 py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
             Welcome back, {user.firstName}! 👋
          </h2>
          
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-(--muted) hover:text-(--primary) transition-colors bg-(--surface) rounded-full shadow-sm border border-(--border)">
              <Bell size={20} />
              {/* Notification dot */}
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-(--pink) rounded-full border-2 border-(--surface)"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-(--border)">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-(--ink)">{user.firstName} {user.lastName}</p>
                <p className="text-xs font-medium text-(--dim) capitalize">Future Student</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-(--tint-blue) text-(--primary) flex items-center justify-center font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Injection */}
        <div className="p-10 flex-1">
          {children}
        </div>
      </main>

    </div>
  );
}
