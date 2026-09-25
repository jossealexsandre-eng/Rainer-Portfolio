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
          {/* Portrait frame — Full Screen photo inside frame */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[460px] xl:max-w-[490px]"
          >
            {/* Outer cream mat frame (Passe-partout) matching Gambar 2 */}
            <div className="relative p-4 sm:p-5 lg:p-6 bg-[#EBE5DC] border border-[#DDD6CB] shadow-[0_22px_55px_-16px_rgba(38,59,80,0.18),0_6px_20px_rgba(0,0,0,0.04)] rounded-[2px] transition-all duration-500">
              
              {/* Editorial Corner Crop Marks (L-brackets) at top-left and bottom-right */}
              <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 w-5 h-5 sm:w-6 sm:h-6 border-t-[2.5px] border-l-[2.5px] border-[#81929E] pointer-events-none z-10" />
              <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-5 h-5 sm:w-6 sm:h-6 border-b-[2.5px] border-r-[2.5px] border-[#81929E] pointer-events-none z-10" />

              {/* Middle thin border line enclosing balanced inner mat */}
              <div className="border border-[#CAC3B5] p-3 sm:p-4.5 bg-[#FAF8F4] rounded-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                {/* Photo container — 4:5 ratio with perfect edge-to-edge image fill */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white border border-[#E0D9CD] shadow-[0_2px_8px_rgba(0,0,0,0.06)] group">
                  {portraitSrc ? (
                    <img
                      src={portraitSrc}
                      alt={th.portraitAlt}
                      className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-[1.05] group-hover:scale-103 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#EFEBE3] flex items-center justify-center">
                      <span className="font-serif text-2xl text-[#263B50]/40">肖像</span>
                    </div>
                  )}
                </div>
              </div>
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