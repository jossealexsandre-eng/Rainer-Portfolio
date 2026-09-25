import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  data: PortfolioData['profile'];
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { language, t } = useLanguage();
  const th = t.hero;
  const portraitSrc = data.portraitUrl || '';
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const displayName = language === 'ja' ? data.japaneseName : data.fullName;
  const displayHometown = language === 'ja' ? 'インドネシア・パプア州ビアク' : data.hometown;
  const displaySubheadline =
    language === 'ja'
      ? '言語 · 文化 · 国際実習経験'
      : data.subheadline;
  const displaySummary =
    language === 'ja'
      ? 'マラナタキリスト教大学日本文学科在学中。2025年より名門大阪ゴルフクラブにて国際キャディ実習を行い、実践的な敬語運用とおもてなし精神を体得。東南アジアと日本を繋ぐ架け橋となるべく研鑽を重ねています。'
      : data.summary;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start relative z-10"
        >
          {/* Vertical Japanese/English Label & Small Metadata */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-start gap-5 mb-6"
          >
            <div
              className="writing-vertical-rl font-serif text-sm tracking-[0.35em] text-[#B4473F] select-none py-1 border-r border-[#D9D5CC]/80 pr-3 font-semibold"
              title={th.storyLabel}
            >
              {language === 'ja' ? 'ポートフォリオ' : 'PORTFOLIO'}
            </div>
            <div className="flex flex-col text-xs font-sans tracking-[0.2em] text-[#66645F] uppercase space-y-1">
              <span>{displayHometown}</span>
              <span className="text-[#263B50] font-medium">{th.estLabel}</span>
            </div>
          </motion.div>

          {/* Large Editorial Name */}
          <motion.h1
            id="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-[#1C1C1C] font-normal leading-[1.08] tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] mb-5 break-words max-w-full"
          >
            {displayName}
          </motion.h1>

          {/* Subtitle & Focus */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2 mb-6"
          >
            <h2 className="font-serif text-xl sm:text-2xl text-[#263B50] italic">
              {th.title}
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#66645F] font-sans font-medium">
              {displaySubheadline}
            </p>
          </motion.div>

          {/* Concise Narrative Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg text-[#66645F] leading-relaxed max-w-xl font-sans mb-8"
          >
            {displaySummary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.button
              id="hero-cta-internship"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('internship')}
              className="px-6 py-3 rounded-[2px] bg-[#263B50] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#1a2938] transition-all flex items-center gap-2 group shadow-sm hover:shadow cursor-pointer"
            >
              <span>{th.ctaInternship}</span>
              <span className="font-serif text-sm text-[#F7F5F0]/80 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </motion.button>

            <motion.button
              id="hero-cta-about"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 rounded-[2px] border border-[#D9D5CC] bg-transparent text-[#1C1C1C] text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#EFEBE3] transition-all cursor-pointer"
            >
              {th.ctaAbout}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Editorial Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          {/* Portrait frame — Full Screen photo inside frame */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[460px] xl:max-w-[490px]"
          >
            {/* Outer cream mat frame (Passe-partout) */}
            <div className="relative p-3 sm:p-4 bg-[#EBE5DC] border border-[#DDD6CB] shadow-[0_22px_55px_-16px_rgba(38,59,80,0.18),0_6px_20px_rgba(0,0,0,0.04)] rounded-[2px] transition-all duration-500">
              
              {/* Editorial Corner Crop Marks (L-brackets) at top-left and bottom-right */}
              <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 w-5 h-5 sm:w-6 sm:h-6 border-t-[2.5px] border-l-[2.5px] border-[#81929E] pointer-events-none z-10" />
              <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-5 h-5 sm:w-6 sm:h-6 border-b-[2.5px] border-r-[2.5px] border-[#81929E] pointer-events-none z-10" />

              {/* Photo container — fills inner frame full-screen, click to open full-screen modal */}
              <div 
                onClick={() => setIsFullscreen(true)}
                className="relative border border-[#CAC3B5] overflow-hidden bg-white rounded-[1px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] group cursor-pointer"
                title="Klik untuk melihat foto full screen"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {portraitSrc ? (
                    <img
                      src={portraitSrc}
                      alt={th.portraitAlt}
                      className="w-full h-full object-cover object-top grayscale contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#EFEBE3] flex items-center justify-center">
                      <span className="font-serif text-2xl text-[#263B50]/40">肖像</span>
                    </div>
                  )}

                  {/* Hover Fullscreen Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded bg-[#1C1C1C]/75 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase font-sans flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>Full Screen</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full flex flex-col items-center bg-[#EBE5DC] p-3 sm:p-5 rounded-md border border-[#DDD6CB] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center text-sm font-bold shadow-lg hover:bg-[#B4473F] transition-colors cursor-pointer z-10"
                aria-label="Close fullscreen"
              >
                ✕
              </button>

              {/* Fullscreen Photo View */}
              <div className="relative overflow-hidden rounded bg-white border border-[#CAC3B5] max-h-[75vh] w-full flex items-center justify-center">
                <img
                  src={portraitSrc}
                  alt={th.portraitAlt}
                  className="w-auto h-auto max-h-[75vh] max-w-full object-contain grayscale contrast-[1.05]"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <p className="font-serif text-lg sm:text-xl text-[#1C1C1C] tracking-wide font-medium">{displayName}</p>
                <p className="text-xs text-[#66645F] tracking-widest uppercase font-sans mt-0.5">{displaySubheadline}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center pt-8 select-none">
        <motion.button
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] font-sans uppercase text-[#66645F] hover:text-[#263B50] transition-colors cursor-pointer"
        >
          <span>{th.scrollLabel}</span>
          <span className="w-px h-10 bg-gradient-to-b from-[#263B50] to-transparent" />
        </motion.button>
      </div>
    </section>
  );
};