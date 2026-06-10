// src/pages/Home.jsx
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection'
import ProcessSection from '../components/sections/ProcessSection'
import ServicesSection from '../components/sections/ServicesSection'
import ReviewsSection from '../components/sections/ReviewsSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <ServicesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
