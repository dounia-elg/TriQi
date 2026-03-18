import Navbar      from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks  from '@/components/HowItWorks';
import Features    from '@/components/Features';
import WhyTriQi    from '@/components/WhyTriQi';
import CtaSection  from '@/components/CtaSection';
import Footer      from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <WhyTriQi />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
