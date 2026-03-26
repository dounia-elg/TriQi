import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import RoadmapPreview from '@/components/RoadmapPreview';
import InstitutionsPreview from '@/components/InstitutionsPreview';
import WhyTriQi from '@/components/WhyTriQi';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';

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
