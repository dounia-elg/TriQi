import Link from 'next/link';
import { X } from 'lucide-react';
import Logo from '@/components/Logo';

export default function OrientationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-(--bg)">
      {/* Mini Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <Logo size="sm" />
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-(--muted) hover:text-(--pink) transition-colors"
        >
          <X size={20} /> Exit Test
        </Link>
      </header>
      
      <main>{children}</main>
    </div>
  );
}
