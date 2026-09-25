import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, MapPin, Calendar, Flag, Sparkles, Star } from 'lucide-react';
import { Lightbox } from './Lightbox';
import { DailyLifeCarousel } from './DailyLifeCarousel';
import { ActivityCarousel } from './ActivityCarousel';
import { InternshipImage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface InternshipGalleryProps {
  gallery: InternshipImage[];
}

type FilterCategory = 'all' | 'caddy' | 'daily' | 'activity';

export const InternshipGallery: React.FC<InternshipGalleryProps> = ({ gallery }) => {
  const { language, t: fullT } = useLanguage();
  const t = fullT.internship;
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = gallery.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const caddyItems    = gallery.filter((item) => item.category === 'caddy');
  const dailyItems    = gallery.filter((item) => item.category === 'daily');
  const activityItems = gallery.filter((item) => item.category === 'activity');

  /* ── Hover overlay ─────────────────────────────────── */
  const HoverOverlay = () => (
    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-[#F7F5F0]">
      <span className="text-xs font-sans tracking-wider uppercase font-medium">
        {language === 'ja' ? 'クリックして拡大' : 'Click to Enlarge'}
      </span>
      <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
        <Maximize2 className="w-4 h-4" />
      </span>
    </div>
  );

  /* ── Caption bar ───────────────────────────────────── */
  const CaptionBar = ({ item, compact = false }: { item: InternshipImage; compact?: boolean }) => {
    const displayTitle = language === 'ja' ? (item.japaneseTitle || item.title) : item.title;
    const defaultSub = item.category === 'activity'
      ? (language === 'ja' ? '学内活動・文化発信' : 'CAMPUS ACTIVITY')
      : item.category === 'daily'
      ? (language === 'ja' ? '日本の日常・関西生活' : 'DAILY LIFE')
      : (language === 'ja' ? 'キャディ実習' : 'CADDY INTERNSHIP');
    const displaySubtitle = language === 'ja'
      ? (item.subtitleJapanese || defaultSub)
      : (item.subtitle || defaultSub);
    const displayCaption = language === 'ja' && item.captionJapanese ? item.captionJapanese : item.caption;
    const displayLocation = language === 'ja' && item.locationJapanese ? item.locationJapanese : item.location;
    const displayDate = language === 'ja' && item.dateJapanese ? item.dateJapanese : item.date;

    return (
      <div className="p-5 space-y-2">
        {displaySubtitle && (
          <span className="font-serif text-xs text-[#B4473F] font-semibold tracking-wider block">
            {displaySubtitle}
          </span>
        )}
        <h4 className={`font-serif ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} text-[#1C1C1C] group-hover:text-[#263B50] transition-colors leading-snug`}>
          {displayTitle}
        </h4>
        <p className="font-sans text-xs text-[#66645F] leading-relaxed">{displayCaption}</p>
        <div className="pt-2 flex items-center justify-between text-[11px] font-sans text-[#66645F] border-t border-[#D9D5CC]/60">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-[#263B50] shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
            <Calendar className="w-3 h-3 text-[#66645F]" />
            {displayDate}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER & FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D5CC] pb-5"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-serif text-sm tracking-[0.25em] text-[#B4473F] font-semibold">
              {language === 'ja' ? '写真記録' : 'PHOTO JOURNAL'}
            </span>
            <span className="h-px w-6 bg-[#D9D5CC]" />
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#66645F]">
              {language === 'ja' ? 'VISUAL ARCHIVE' : '写真記録'}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-normal">
            {language === 'ja'
              ? '写真記録ギャラリー · 実習・生活・学術活動'
              : 'Photo Gallery · All Activities & Memories'}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-[#66645F] mt-1">
            {language === 'ja'
              ? '大阪ゴルフクラブ実習・日本生活・キャンパス活動の記録'
              : 'Visual documentation of caddy duties, Japanese daily life, and campus initiatives.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-[2px] text-xs font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#263B50] text-[#F7F5F0] font-medium shadow-sm'
                : 'bg-[#EFEBE3]/80 hover:bg-[#EFEBE3] text-[#66645F] hover:text-[#1C1C1C] border border-[#D9D5CC]'
            }`}
          >
            {t.filterAll} ({gallery.length})
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveFilter('caddy')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] text-xs font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === 'caddy'
                ? 'bg-[#263B50] text-[#F7F5F0] font-medium shadow-sm'
                : 'bg-[#EFEBE3]/80 hover:bg-[#EFEBE3] text-[#66645F] hover:text-[#1C1C1C] border border-[#D9D5CC]'
            }`}
          >
            <Flag className="w-3 h-3 text-[#B4473F]" />
            <span>{t.filterCaddy} ({caddyItems.length})</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveFilter('daily')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] text-xs font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === 'daily'
                ? 'bg-[#263B50] text-[#F7F5F0] font-medium shadow-sm'
                : 'bg-[#EFEBE3]/80 hover:bg-[#EFEBE3] text-[#66645F] hover:text-[#1C1C1C] border border-[#D9D5CC]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#B4473F]" />
            <span>{t.filterDaily} ({dailyItems.length})</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveFilter('activity')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] text-xs font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === 'activity'
                ? 'bg-[#B4473F] text-[#F7F5F0] font-medium shadow-sm'
                : 'bg-[#EFEBE3]/80 hover:bg-[#EFEBE3] text-[#66645F] hover:text-[#1C1C1C] border border-[#D9D5CC]'
            }`}
          >
            <Star className="w-3 h-3 text-[#B4473F]" />
            <span>{t.filterActivity} ({activityItems.length})</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ═══ FILTER CONTENT WITH ANIMATE PRESENCE ═══════════════════════════ */}
      <AnimatePresence mode="wait">
        {activeFilter === 'all' ? (
          <motion.div
            key="all-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="space-y-14"
          >
            {/* 1. CADDY INTERNSHIP - 2-col landscape */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif tracking-[0.2em] text-[#263B50] uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#263B50]" />
                <span>
                  {language === 'ja'
                    ? '大阪ゴルフクラブ・キャディ実務記録'
                    : 'OSAKA GOLF CLUB · CADDY ON-COURSE RECORD'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caddyItems.map((item, idx) => {
                  const originalIdx = gallery.findIndex((g) => g.id === item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      onClick={() => setLightboxIndex(originalIdx)}
                      className="group cursor-pointer bg-[#FFFFFF] border border-[#D9D5CC] hover:border-[#263B50]/50 rounded-[2px] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEBE3]">
                        <img
                          src={item.url}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <HoverOverlay />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-[#263B50]/90 backdrop-blur-sm text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase rounded-[2px]">
                            {language === 'ja' ? 'キャディ実習' : 'CADDY INTERNSHIP'}
                          </span>
                        </div>
                      </div>
                      <CaptionBar item={item} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 2. DAILY LIFE IN JAPAN - Animated Carousel with Synchronized Descriptions */}
            <div className="pt-4 border-t border-[#D9D5CC]">
              <DailyLifeCarousel
                items={dailyItems}
                gallery={gallery}
                onOpenLightbox={(idx) => setLightboxIndex(idx)}
              />
            </div>

            {/* 3. ACTIVITIES & CAMPUS - Carousel with Grid Toggle */}
            <div className="pt-4 border-t border-[#D9D5CC]">
              <ActivityCarousel
                items={activityItems}
                gallery={gallery}
                onOpenLightbox={(idx) => setLightboxIndex(idx)}
              />
            </div>
          </motion.div>
        ) : activeFilter === 'daily' ? (
          <motion.div
            key="daily-filtered-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <DailyLifeCarousel
              items={dailyItems}
              gallery={gallery}
              onOpenLightbox={(idx) => setLightboxIndex(idx)}
            />
          </motion.div>
        ) : activeFilter === 'activity' ? (
          <motion.div
            key="activity-filtered-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <ActivityCarousel
              items={activityItems}
              gallery={gallery}
              onOpenLightbox={(idx) => setLightboxIndex(idx)}
            />
          </motion.div>
        ) : (
          /* ═══ SINGLE CATEGORY FILTERED VIEW ════════════════════════════════ */
          <motion.div
            key={`category-${activeFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className={`grid gap-6 ${
              activeFilter === 'caddy'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredImages.map((item, idx) => {
              const originalIdx = gallery.findIndex((g) => g.id === item.id);
              const isCaddy    = item.category === 'caddy';
              const isActivity = item.category === 'activity';
              const isPortrait = item.aspect === 'vertical';
              const badgeLabel =
                language === 'ja'
                  ? (isCaddy ? 'キャディ実習' : isActivity ? '学内活動' : '日本の日常')
                  : (isCaddy ? 'CADDY INTERNSHIP' : isActivity ? 'ACTIVITY' : 'DAILY LIFE');
              const badgeColor = isCaddy ? 'bg-[#263B50]/90' : isActivity ? 'bg-[#66645F]/90' : 'bg-[#1C1C1C]/80';
              const aspectClass = isCaddy
                ? 'aspect-[16/10]'
                : isActivity && !isPortrait
                ? 'aspect-[16/10]'
                : 'aspect-[3/4]';
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => setLightboxIndex(originalIdx)}
                  className="group cursor-pointer bg-[#FFFFFF] border border-[#D9D5CC] hover:border-[#263B50]/50 rounded-[2px] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
                >
                  <div className={`relative overflow-hidden bg-[#EFEBE3] ${aspectClass}`}>
                    <img
                      src={item.url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <HoverOverlay />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 backdrop-blur-sm text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase rounded-[2px] ${badgeColor}`}>
                        {badgeLabel}
                      </span>
                    </div>
                  </div>
                  <CaptionBar item={item} compact={!isCaddy} />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <Lightbox
        images={gallery}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : gallery.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev! < gallery.length - 1 ? prev! + 1 : 0))}
      />
    </div>
  );
};
