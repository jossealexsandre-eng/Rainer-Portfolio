import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  data: PortfolioData['profile'];
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { language, t } = useLanguage();
  const th = t.hero;
  const [portraitSrc, setPortraitSrc] = useState<string>(data.portraitUrl || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPortraitSrc(url);
    }
  };

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
              {language === 'ja' ? '私の物語' : 'MY STORY'}
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
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] bg-[#EFEBE3] border border-[#D9D5CC] p-4 shadow-[0_12px_40px_-15px_rgba(38,59,80,0.08)] hover:shadow-[0_18px_50px_-15px_rgba(38,59,80,0.15)] transition-shadow"
          >
            {/* Inner frame */}
            <div className="relative w-full h-full border border-[#D9D5CC]/80 bg-[#F7F5F0] overflow-hidden flex flex-col items-center justify-center text-center p-6 group">
              {portraitSrc ? (
                <img
                  src={portraitSrc}
                  alt={th.portraitAlt}
                  className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:scale-102 transition-transform duration-700"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-xs p-4">
                  <div className="w-12 h-12 rounded-full border border-[#D9D5CC] flex items-center justify-center text-[#263B50]/60">
                    <span className="font-serif text-lg">肖像</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-serif tracking-[0.2em] text-xs uppercase text-[#263B50] block font-semibold">
                      {language === 'ja' ? '写真' : 'PORTRAIT IMAGE'}
                    </span>
                    <p className="text-xs text-[#66645F] font-sans leading-relaxed">
                      {language === 'ja' ? 'プロフィール写真をアップロード' : 'Replace with professional portrait photograph'}
                    </p>
                  </div>

                  <label
                    htmlFor="portrait-upload"
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#D9D5CC] rounded-[2px] text-[11px] font-sans text-[#263B50] cursor-pointer hover:bg-[#EFEBE3] transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{language === 'ja' ? '写真を変更' : 'Upload Portrait'}</span>
                    <input
                      id="portrait-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

            </div>

            {/* Corner aesthetic registration lines */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#263B50]/40" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#263B50]/40" />
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