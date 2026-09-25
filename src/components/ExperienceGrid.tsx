import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ExperienceModal } from './ExperienceModal';
import { ExperienceEntry } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceGridProps {
  experiences: ExperienceEntry[];
}

/* ─── Auto-sliding Interactive Carousel ─── */
const AutoPhotoCarousel: React.FC<{ photos: string[]; alt: string }> = ({ photos, alt }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const go = (next: number, dir?: number) => {
    setDirection(dir !== undefined ? dir : next > current ? 1 : -1);
    setCurrent(next);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Auto-slide effect every 2 seconds
  useEffect(() => {
    if (isPaused || photos.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, isPaused, photos.length]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div
      className="relative my-3 rounded-[3px] overflow-hidden bg-[#EFEBE3] border border-[#D9D5CC] group/slider select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Photo Frame */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#263B50]/5">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={photos[current]}
            alt={`${alt} — Foto ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Ambient top/bottom gradient */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

        {/* Navigation Buttons (Fade in on hover) */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-[#263B50] flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 hover:scale-110 transition-all shadow-sm cursor-pointer z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-[#263B50] flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 hover:scale-110 transition-all shadow-sm cursor-pointer z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Badge: Counter only */}
        <div className="absolute top-2 right-2 pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-white text-[10px] font-sans tracking-wider tabular-nums font-medium">
            {current + 1} / {photos.length}
          </span>
        </div>

        {/* Interactive Dots on bottom of image */}
        {photos.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-10">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === current
                    ? 'w-4 h-1.5 bg-[#FFFFFF] shadow-sm'
                    : 'w-1.5 h-1.5 bg-[#FFFFFF]/50 hover:bg-[#FFFFFF]/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ExperienceGrid: React.FC<ExperienceGridProps> = ({ experiences }) => {
  const { language, t } = useLanguage();
  const te = t.experience;
  const [selectedExp, setSelectedExp] = useState<ExperienceEntry | null>(null);

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]"
    >
      <SectionHeading
        japaneseTitle={te.japaneseTitle}
        englishTitle={te.englishTitle}
        subtitle={te.subtitle}
      />

      {/* Editorial Magazine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {experiences.map((exp, idx) => {
          const displayTitle = language === 'ja' ? (exp.japaneseTitle || exp.title) : exp.title;
          const displaySubTitle = language === 'ja' ? exp.organizationJapanese : exp.organization;
          const displayShort = language === 'ja' && exp.shortDescriptionJapanese ? exp.shortDescriptionJapanese : exp.shortDescription;
          const displayOrg = language === 'ja' && exp.organizationJapanese ? exp.organizationJapanese : exp.organization;
          const hasPhotos = exp.photos && exp.photos.length > 0;

          return (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative flex flex-col justify-between p-7 bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] border border-[#D9D5CC] rounded-[2px] transition-all hover:border-[#263B50]/40 shadow-[0_2px_10px_-4px_rgba(38,59,80,0.03)] hover:shadow-[0_14px_34px_-8px_rgba(38,59,80,0.12)] ${
                hasPhotos ? 'border-[#263B50]/30 ring-1 ring-[#263B50]/10' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Year & Badge */}
                <div className="flex items-center justify-between border-b border-[#D9D5CC]/50 pb-3">
                  <span className="font-serif text-sm tracking-[0.2em] text-[#B4473F] font-semibold">
                    {exp.year}
                  </span>
                  {displayOrg && (
                    <span className="text-[10px] uppercase tracking-[0.15em] font-sans text-[#66645F] truncate max-w-[170px]" title={displayOrg}>
                      {displayOrg}
                    </span>
                  )}
                </div>

                {/* Title & subtitle */}
                <div>
                  <h3 className="font-serif text-xl text-[#1C1C1C] group-hover:text-[#263B50] transition-colors leading-snug">
                    {displayTitle}
                  </h3>
                  {displaySubTitle && (
                    <span className="font-serif text-[11px] text-[#263B50]/70 tracking-wider block mt-0.5">
                      {displaySubTitle}
                    </span>
                  )}
                </div>

                {/* Auto-sliding Carousel for Entries with Photos */}
                {hasPhotos && (
                  <AutoPhotoCarousel photos={exp.photos!} alt={displayTitle} />
                )}

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#66645F] font-sans leading-relaxed line-clamp-3">
                  {displayShort}
                </p>
              </div>

              {/* View Details Link */}
              <div className="pt-6 mt-4 border-t border-[#D9D5CC]/40">
                <button
                  type="button"
                  onClick={() => setSelectedExp(exp)}
                  className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.15em] text-[#263B50] hover:text-[#B4473F] font-medium transition-colors group/btn cursor-pointer"
                >
                  <span>{te.viewDetails}</span>
                  <span className="font-serif group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      <ExperienceModal experience={selectedExp} onClose={() => setSelectedExp(null)} />
    </section>
  );
};