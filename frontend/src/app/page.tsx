import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const revalidate = 3600;

const HeroSection = dynamic(() => import('@/components/HeroSection'));
const HowItWorks = dynamic(() => import('@/components/how-it-works'));
const Features = dynamic(() => import('@/components/Features'));
const RoadmapPreview = dynamic(() => import('@/components/RoadmapPreview'));
const InstitutionsPreview = dynamic(() => import('@/components/InstitutionsPreview'));
const WhyTriQi = dynamic(() => import('@/components/WhyTriQi'));
const CtaSection = dynamic(() =>
  import('@/components/CtaSection').then((mod) => mod.CtaSection),
);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <RoadmapPreview />
        <InstitutionsPreview />
        <WhyTriQi />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
