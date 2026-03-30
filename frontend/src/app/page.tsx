import dynamic from 'next/dynamic';
import Navbar from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';

export const revalidate = 3600;

const HeroSection = dynamic(() => import('@/components/home/HeroSection'));
const HowItWorks = dynamic(() => import('@/components/home/how-it-works'));
const Features = dynamic(() => import('@/components/home/Features'));
const RoadmapPreview = dynamic(() => import('@/components/home/RoadmapPreview'));
const InstitutionsPreview = dynamic(() => import('@/components/home/InstitutionsPreview'));
const WhyTriQi = dynamic(() => import('@/components/home/WhyTriQi'));
const CtaSection = dynamic(() =>
  import('@/components/home/CtaSection').then((mod) => mod.CtaSection),
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
