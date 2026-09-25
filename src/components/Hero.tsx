import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  data: PortfolioData['profile'];
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { language, t } = useLanguage();
  const th = t.hero;
  const portraitSrc = data.portraitUrl || '';

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
          {/* Outer decorative border wrapper */}
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]"
          >
            {/* Outer frame: thick navy border */}
            <div className="relative p-[6px] bg-[#263B50] shadow-[0_20px_50px_-12px_rgba(38,59,80,0.35)] hover:shadow-[0_28px_60px_-12px_rgba(38,59,80,0.45)] transition-all duration-500 rounded-[3px]">
              {/* Inner cream mat */}
              <div className="p-[5px] bg-[#F7F5F0]">
                {/* Photo container — 9:16 */}
                <div className="relative aspect-[9/16] overflow-hidden bg-[#EFEBE3] group">
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
                  {/* Subtle bottom gradient for depth */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#263B50]/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Corner accent marks (outside inner mat) */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-[2px] border-l-[2px] border-[#F7F5F0]/60" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-[2px] border-r-[2px] border-[#F7F5F0]/60" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-[2px] border-l-[2px] border-[#F7F5F0]/60" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-[2px] border-r-[2px] border-[#F7F5F0]/60" />
            </div>

            {/* Decorative side label */}
            <div className="absolute -right-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 select-none hidden lg:flex">
              <span className="w-px h-10 bg-gradient-to-b from-[#263B50]/60 to-transparent" />
              <span className="writing-vertical-rl font-serif text-[9px] tracking-[0.3em] text-[#263B50]/50 uppercase font-semibold">Portrait</span>
              <span className="w-px h-10 bg-gradient-to-t from-[#263B50]/60 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>

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