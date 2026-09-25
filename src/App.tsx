import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyMap } from './components/JourneyMap';
import { EducationTimeline } from './components/EducationTimeline';
import { ExperienceGrid } from './components/ExperienceGrid';
import { SkillsSection } from './components/SkillsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { InternshipSection } from './components/InternshipSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WashiBackground } from './components/WashiBackground';
import { CvModal } from './components/CvModal';
import { portfolioData } from './data/portfolioData';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#F7F5F0] text-[#1C1C1C] overflow-x-hidden selection:bg-[#263B50] selection:text-[#F7F5F0]">
        {/* Authentic Washi Texture & Enso Watermark */}
        <WashiBackground />

        {/* Sticky Minimal Navigation with Language Toggle */}
        <Navbar
          onOpenCvModal={() => setCvModalOpen(true)}
        />

        {/* Main Editorial Story Flow */}
        <main className="relative z-10">
          {/* 1. HERO */}
          <Hero data={portfolioData.profile} />

          {/* 2. ABOUT */}
          <About data={portfolioData.profile} />

          {/* 3. CULTURAL JOURNEY MAP */}
          <JourneyMap journey={portfolioData.journey} />

          {/* 4. EDUCATION */}
          <EducationTimeline entries={portfolioData.education} />

          {/* 5. EXPERIENCE */}
          <ExperienceGrid experiences={portfolioData.experiences} />

          {/* 6. SKILLS & COMPETENCIES */}
          <SkillsSection skills={portfolioData.skills} />

          {/* 7. CERTIFICATES & ACHIEVEMENTS */}
          <CertificatesSection certificates={portfolioData.certificates} />

          {/* 9. INTERNSHIP */}
          <InternshipSection data={portfolioData.internship} />

          {/* 11. CONTACT */}
          <Contact
            contactData={portfolioData.contact}
            onOpenCvModal={() => setCvModalOpen(true)}
          />
        </main>

        {/* Minimal Footer with Hanko Signature */}
        <Footer />

        {/* Printable Editorial Curriculum Vitae Modal */}
        <CvModal
          isOpen={cvModalOpen}
          onClose={() => setCvModalOpen(false)}
          data={portfolioData}
        />
      </div>
    </LanguageProvider>
  );
}