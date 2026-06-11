// src/pages/Home.jsx
import { Suspense, lazy } from 'react'
import HeroSection from '../components/sections/HeroSection'

// Below-the-fold sections are lazy-loaded to reduce initial bundle size
const AboutSection       = lazy(() => import('../components/sections/AboutSection'))
const WhyChooseUsSection = lazy(() => import('../components/sections/WhyChooseUsSection'))
const ProcessSection     = lazy(() => import('../components/sections/ProcessSection'))
const ServicesSection    = lazy(() => import('../components/sections/ServicesSection'))
const ReviewsSection     = lazy(() => import('../components/sections/ReviewsSection'))
const ContactSection     = lazy(() => import('../components/sections/ContactSection'))
const Footer             = lazy(() => import('../components/Footer'))

// Lightweight fallback — matches bg so there's no flash
function SectionFallback() {
  return <div className="bg-dark-800" style={{ minHeight: '40vh' }} aria-hidden="true" />
}

export default function Home() {
  return (
    <main>
      {/* Hero loads eagerly — it's above the fold */}
      <HeroSection />

      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseUsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ReviewsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </main>
  )
}
