import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Calendar,
  Play,
  Pause,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import { InternshipImage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DailyLifeCarouselProps {
  items: InternshipImage[];
  gallery: InternshipImage[];
  onOpenLightbox: (index: number) => void;
}

export const DailyLifeCarousel: React.FC<DailyLifeCarouselProps> = ({
  items,
  gallery,
  onOpenLightbox,
}) => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const timerRef = useRef<number | null>(null);

  const total = items.length;
  const currentItem = items[current] || items[0];

  const go = (nextIdx: number, dir?: number) => {
    setDirection(dir !== undefined ? dir : nextIdx > current ? 1 : -1);
    setCurrent(nextIdx);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide continuously every 2 seconds (no pause)
  useEffect(() => {
    if (total <= 1 || viewMode === 'grid') return;

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, total, viewMode]);

  if (!items || items.length === 0) return null;

  const displayTitle = language === 'ja' ? (currentItem.japaneseTitle || currentItem.title) : currentItem.title;
  const displaySubtitle = language === 'ja'
    ? (currentItem.subtitleJapanese || '日本の日常・関西生活')
    : (currentItem.subtitle || 'DAILY LIFE IN JAPAN');
  const displayCaption = language === 'ja' && currentItem.captionJapanese ? currentItem.captionJapanese : currentItem.caption;
  const displayLocation = language === 'ja' && currentItem.locationJapanese ? currentItem.locationJapanese : currentItem.location;
  const displayDate = language === 'ja' && currentItem.dateJapanese ? currentItem.dateJapanese : currentItem.date;
  const originalIdx = gallery.findIndex((g) => g.id === currentItem.id);

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const textVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="space-y-4">
      {/* Subheader with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-serif tracking-[0.15em] sm:tracking-[0.2em] text-[#B4473F] uppercase font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#B4473F] shrink-0" />
          <span>
            {language === 'ja'
              ? '日本での日常生活と文化探訪（スライドショー）'
              : 'DAILY LIFE & CULTURAL IMMERSION IN JAPAN'}
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-0.5 rounded-[2px] bg-[#EFEBE3] border border-[#D9D5CC]">
          <button
            type="button"
            onClick={() => setViewMode('carousel')}
            className={`px-2.5 py-1 rounded-[2px] text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'carousel'
                ? 'bg-[#263B50] text-[#F7F5F0] font-medium shadow-xs'
                : 'text-[#66645F] hover:text-[#1C1C1C]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{language === 'ja' ? 'カルーセル' : 'Carousel'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-2.5 py-1 rounded-[2px] text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-[#263B50] text-[#F7F5F0] font-medium shadow-xs'
                : 'text-[#66645F] hover:text-[#1C1C1C]'
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>{language === 'ja' ? 'グリッド' : 'Grid'}</span>
          </button>
        </div>
      </div>

      {/* ═══ VIEW MODE: CAROUSEL ═══ */}
      {viewMode === 'carousel' ? (
        <div
          className="relative bg-[#FFFFFF] border border-[#D9D5CC] rounded-[3px] p-6 sm:p-8 shadow-[0_4px_20px_-8px_rgba(38,59,80,0.06)] hover:shadow-[0_12px_32px_-10px_rgba(38,59,80,0.12)] transition-shadow duration-300"
        >
          {/* Main Stage Grid: Photo on Left, Synchronized Narrative on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* LEFT: Portrait Photo Showcase */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-[2px] bg-[#EFEBE3] border border-[#D9D5CC] group/photo">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    key={currentItem.id}
                    src={currentItem.url}
                    alt={displayTitle}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ objectPosition: currentItem.objectPosition || 'center center' }}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    onClick={() => onOpenLightbox(originalIdx)}
                  />
                </AnimatePresence>

                {/* Ambient top/bottom gradient */}
                <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                {/* Category Badge & Enlarge Button */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 bg-[#1C1C1C]/80 backdrop-blur-sm text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase rounded-[2px]">
                    {language === 'ja' ? '日本の日常' : 'DAILY LIFE'}
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenLightbox(originalIdx)}
                    className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#263B50] backdrop-blur-sm transition-transform hover:scale-110 shadow-xs cursor-pointer"
                    title={language === 'ja' ? '高画質で拡大' : 'Enlarge Photo'}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Slide index badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-[2px] bg-black/60 backdrop-blur-sm text-white text-[11px] font-mono tracking-wider tabular-nums">
                    {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Synchronized Dynamic Description */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Top Subtitle */}
                  {displaySubtitle && (
                    <span className="font-serif text-xs sm:text-sm text-[#B4473F] font-semibold tracking-wider block">
                      {displaySubtitle}
                    </span>
                  )}

                  {/* Main Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] leading-snug font-normal">
                    {displayTitle}
                  </h3>

                  {/* Narrative Caption */}
                  <p className="font-sans text-sm sm:text-base text-[#66645F] leading-relaxed">
                    {displayCaption}
                  </p>

                  {/* Metadata Chips: Location & Date */}
                  <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-sans text-[#66645F] border-t border-[#D9D5CC]/70">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#263B50]" />
                      <span className="font-medium text-[#1C1C1C]/90">{displayLocation}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#B4473F]" />
                      <span>{displayDate}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls Bar */}
              <div className="pt-4 border-t border-[#D9D5CC]/60 flex flex-wrap items-center justify-end gap-4">
                {/* Prev & Next Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="p-2 rounded-[2px] bg-[#EFEBE3] hover:bg-[#263B50] hover:text-white text-[#263B50] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="p-2 rounded-[2px] bg-[#EFEBE3] hover:bg-[#263B50] hover:text-white text-[#263B50] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM: Miniature Thumbnail Navigator Strip */}
          <div className="mt-8 pt-6 border-t border-[#D9D5CC]">
            <div className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#66645F] mb-3">
              {language === 'ja' ? '写真一覧（クリックで選択）' : 'All Photos · Click to Jump'}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
              {items.map((item, idx) => {
                const isActive = idx === current;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(idx)}
                    className={`relative aspect-[3/4] rounded-[2px] overflow-hidden border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-[#263B50] ring-2 ring-[#263B50] scale-102 shadow-md'
                        : 'border-[#D9D5CC] opacity-60 hover:opacity-100 hover:border-[#263B50]/60'
                    }`}
                    title={item.title}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-[2px] bg-[#263B50] text-[#F7F5F0] text-[9px] font-mono leading-none">
                        {idx + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ═══ VIEW MODE: GRID ═══ */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => {
            const originalIndex = gallery.findIndex((g) => g.id === item.id);
            const itemTitle = language === 'ja' ? (item.japaneseTitle || item.title) : item.title;
            const itemSubtitle = language === 'ja'
              ? (item.subtitleJapanese || '日本の日常・関西生活')
              : (item.subtitle || 'DAILY LIFE IN JAPAN');
            const itemCaption = language === 'ja' && item.captionJapanese ? item.captionJapanese : item.caption;
            const itemLocation = language === 'ja' && item.locationJapanese ? item.locationJapanese : item.location;
            const itemDate = language === 'ja' && item.dateJapanese ? item.dateJapanese : item.date;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => onOpenLightbox(originalIndex)}
                className="group cursor-pointer bg-[#FFFFFF] border border-[#D9D5CC] hover:border-[#B4473F]/50 rounded-[2px] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EFEBE3]">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    style={{ objectPosition: item.objectPosition || 'center center' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#1C1C1C]/80 backdrop-blur-sm text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase rounded-[2px]">
                      {language === 'ja' ? '日本の日常' : 'DAILY LIFE'}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5 flex flex-col justify-between flex-1">
                  <div>
                    {itemSubtitle && (
                      <span className="font-serif text-[11px] text-[#B4473F] font-semibold tracking-wider block">
                        {itemSubtitle}
                      </span>
                    )}
                    <h4 className="font-serif text-base text-[#1C1C1C] group-hover:text-[#263B50] transition-colors leading-snug">
                      {itemTitle}
                    </h4>
                    <p className="font-sans text-xs text-[#66645F] leading-relaxed line-clamp-3 mt-1">
                      {itemCaption}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] font-sans text-[#66645F] border-t border-[#D9D5CC]/60 mt-2">
                    <span className="flex items-center gap-1 truncate max-w-[130px]">
                      <MapPin className="w-3 h-3 text-[#263B50] shrink-0" />
                      <span className="truncate">{itemLocation}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[9px] shrink-0">
                      <Calendar className="w-3 h-3 text-[#66645F]" />
                      {itemDate}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
