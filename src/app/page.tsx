import AuthRedirect from '@/components/landing/AuthRedirect';
import LandingNav from '@/components/landing/LandingNav';
import LandingHero from '@/components/landing/LandingHero';
import LandingLogos from '@/components/landing/LandingLogos';
import LandingVoiceDemo from '@/components/landing/LandingVoiceDemo';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingStats from '@/components/landing/LandingStats';
import LandingMetiers from '@/components/landing/LandingMetiers';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';
import StickyCTA from '@/components/landing/StickyCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AuthRedirect />
      <LandingNav />
      <LandingHero />
      <LandingLogos />
      <LandingVoiceDemo />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingStats />
      <LandingMetiers />
      <LandingPricing />
      <LandingCTA />
      <LandingFooter />
      <StickyCTA />
    </main>
  );
}
