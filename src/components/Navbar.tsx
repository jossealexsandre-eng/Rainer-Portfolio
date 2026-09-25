import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, FileText } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SiteLanguage } from '../types';

interface NavbarProps {
  onOpenCvModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCvModal,
}) => {
  const { language, setLanguage, t: fullT } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const t = fullT.nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        'hero',
        'journey',
        'about',
        'education',
        'experience',
        'skills',
        'certificates',
        'internship',
        'contact',
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.about, href: '#about', id: 'about' },
    { label: t.journey, href: '#journey', id: 'journey' },
    { label: t.education, href: '#education', id: 'education' },
    { label: t.experience, href: '#experience', id: 'experience' },
    { label: t.skills, href: '#skills', id: 'skills' },
    { label: t.certificates, href: '#certificates', id: 'certificates' },
    { label: t.internship, href: '#internship', id: 'internship' },
    { label: t.contact, href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const languages: { code: SiteLanguage; label: string }[] = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#D9D5CC]/80 py-3 shadow-[0_4px_20px_-10px_rgba(38,59,80,0.05)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Aesthetic Editorial Serif Wordmark Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-baseline text-inherit no-underline select-none py-1 focus:outline-none"
            aria-label="Rainer Jackob Yawan - Return to top"
          >
            <span className="font-serif tracking-[0.35em] text-sm sm:text-base font-medium text-[#1C1C1C] group-hover:text-[#263B50] transition-colors duration-300">
              RAINER
            </span>
            <span className="font-serif text-sm sm:text-base font-bold text-[#B4473F] transition-transform duration-300 group-hover:translate-x-0.5">
              .
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-[11px] tracking-wider uppercase font-sans">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-[#263B50] font-medium' : 'text-[#66645F] hover:text-[#1C1C1C]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B4473F] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Far Right Actions: Language Switcher & CV button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-[#EFEBE3] border border-[#D9D5CC] rounded-full p-0.5 text-[11px] font-sans">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    language === lang.code
                      ? 'bg-[#263B50] text-[#F7F5F0] font-medium shadow-xs'
                      : 'text-[#66645F] hover:text-[#1C1C1C]'
                  }`}
                  title={`Switch language to ${lang.label}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* CV Modal Action */}
            {onOpenCvModal && (
              <button
                onClick={onOpenCvModal}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-[#263B50]/30 bg-[#FFFFFF]/80 hover:bg-[#263B50] hover:text-white text-xs font-sans tracking-wider text-[#263B50] transition-all"
                title="Curriculum Vitae"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.cvButton}</span>
              </button>
            )}
          </div>

          {/* Mobile Actions (Language pill + Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center bg-[#EFEBE3] border border-[#D9D5CC] rounded-full p-0.5 text-[10px] font-sans sm:hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    language === lang.code
                      ? 'bg-[#263B50] text-[#F7F5F0] font-medium'
                      : 'text-[#66645F]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-[#1C1C1C] hover:text-[#263B50] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Interactive Scroll Reading Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#263B50] via-[#B4473F] to-[#263B50] origin-left z-50 pointer-events-none"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          className="fixed inset-0 z-50 bg-[#F7F5F0] flex flex-col justify-between p-8 lg:hidden animate-in fade-in duration-300 overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-[#D9D5CC] pb-6">
            <div className="flex items-baseline select-none">
              <span className="font-serif tracking-[0.35em] text-base font-medium text-[#1C1C1C]">
                RAINER
              </span>
              <span className="font-serif text-base font-bold text-[#B4473F]">
                .
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#66645F] hover:text-[#1C1C1C]"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Language Switcher in Mobile Menu */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#66645F] flex items-center gap-1 font-sans">
              <Globe className="w-3.5 h-3.5" /> Language:
            </span>
            <div className="flex items-center bg-[#EFEBE3] border border-[#D9D5CC] rounded-full p-0.5 text-xs font-sans">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-full transition-all ${
                    language === lang.code
                      ? 'bg-[#263B50] text-[#F7F5F0] font-medium'
                      : 'text-[#66645F]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-4 my-auto text-left py-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl sm:text-3xl font-serif text-[#1C1C1C] hover:text-[#263B50] transition-colors flex items-center justify-between py-1 border-b border-[#D9D5CC]/40"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans tracking-widest text-[#B4473F] uppercase">
                  →
                </span>
              </a>
            ))}

            {onOpenCvModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full mt-4 py-3 bg-[#263B50] text-white text-xs uppercase tracking-[0.2em] font-sans rounded-[2px]"
              >
                {t.cvButton}
              </button>
            )}
          </nav>

          <div className="border-t border-[#D9D5CC] pt-6 flex items-center justify-between text-xs text-[#66645F] font-sans">
            <span>Biak → Bandung → Osaka</span>
            <span className="font-serif text-[#B4473F]">日本での経験</span>
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 bg-[#263B50] hover:bg-[#1a2938] text-[#F7F5F0] rounded-[2px] shadow-lg border border-[#D9D5CC]/30 transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-serif text-[11px] leading-none text-[#F7F5F0]/90 tracking-widest">
              上へ
            </span>
            <span className="text-xs font-serif group-hover:-translate-y-0.5 transition-transform">
              ↑
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
