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
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';
import DeferredLandingExtras from '@/components/landing/DeferredLandingExtras';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AuthRedirect />
      <LandingNav />
      <LandingHero />
      <section className="deferred-section"><LandingLogos /></section>
      <section className="deferred-section"><LandingVoiceDemo /></section>
      <section className="deferred-section"><LandingFeatures /></section>
      <section className="deferred-section"><LandingTestimonials /></section>
      <section className="deferred-section"><LandingStats /></section>
      <section className="deferred-section"><LandingMetiers /></section>
      <section className="deferred-section"><LandingPricing /></section>
      <section className="deferred-section"><LandingFAQ /></section>
      <section className="deferred-section"><LandingCTA /></section>
      <LandingFooter />
      <DeferredLandingExtras />
    </main>
  );
}
