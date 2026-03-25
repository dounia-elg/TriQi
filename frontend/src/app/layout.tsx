import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'TriQi — Know Yourself. Choose Wisely.',
  description:
    'TriQi helps young Moroccans discover their academic and professional path through a smart orientation test, personalized roadmaps, and AI-powered guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
