import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperienceEntry } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceModalProps {
  experience: ExperienceEntry | null;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose }) => {
  const { language } = useLanguage();
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (experience) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setPhotoIndex(0);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose]);

  if (!experience) return null;

  const displayTitle = language === 'ja' ? (experience.japaneseTitle || experience.title) : experience.title;
  const displaySubTitle = language === 'ja' ? experience.organizationJapanese : experience.organization;
  const displayOrg = language === 'ja' && experience.organizationJapanese ? experience.organizationJapanese : experience.organization;
  const displayShort = language === 'ja' && experience.shortDescriptionJapanese ? experience.shortDescriptionJapanese : experience.shortDescription;
  const displayDetails = language === 'ja' && experience.detailsJapanese ? experience.detailsJapanese : experience.details;
  const photos = experience.photos || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1C1C]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#F7F5F0] border border-[#D9D5CC] p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-start justify-between border-b border-[#D9D5CC] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-serif text-sm tracking-[0.2em] text-[#B4473F] font-semibold">
                {experience.year}
              </span>
              {displayOrg && (
                <>
                  <span className="h-px w-4 bg-[#D9D5CC]" />
                  <span className="text-[11px] uppercase tracking-[0.15em] font-sans text-[#66645F]">
                    {displayOrg}
                  </span>
                </>
              )}
            </div>
            <h3 id="exp-modal-title" className="font-serif text-2xl text-[#1C1C1C]">
              {displayTitle}
            </h3>
            {displaySubTitle && (
              <p className="font-serif text-xs text-[#263B50] tracking-widest">
                {displaySubTitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-1.5 text-[#66645F] hover:text-[#1C1C1C] rounded-[2px] hover:bg-[#EFEBE3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Gallery if available */}
        {photos.length > 0 && (
          <div className="space-y-2">
            <div className="relative w-full aspect-[16/10] rounded-[3px] overflow-hidden bg-[#EFEBE3] border border-[#D9D5CC]">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={photoIndex}
                  src={photos[photoIndex]}
                  alt={`${displayTitle} - ${photoIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#263B50] flex items-center justify-center backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPhotoIndex((prev) => (prev + 1) % photos.length)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#263B50] flex items-center justify-center backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-sans">
                {photoIndex + 1} / {photos.length}
              </span>
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 justify-center pt-1">
                {photos.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPhotoIndex(idx)}
                    className={`relative w-16 h-11 rounded-[2px] overflow-hidden border transition-all cursor-pointer ${
                      idx === photoIndex ? 'border-[#263B50] ring-1 ring-[#263B50]' : 'border-[#D9D5CC] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Narrative & Authentic Details */}
        <div className="space-y-4 font-sans text-sm sm:text-base text-[#1C1C1C] leading-relaxed">
          <p className="text-[#66645F]">
            {displayShort}
          </p>
          {displayDetails && (
            <div className="p-4 bg-[#EFEBE3]/60 border-l-2 border-[#263B50] rounded-r-[2px]">
              <span className="block text-[11px] uppercase tracking-[0.15em] text-[#263B50] font-semibold mb-1">
                {language === 'ja' ? '活動詳細・補足コンテクスト' : 'Context & Activity Note'}
              </span>
              <p className="text-xs sm:text-sm text-[#1C1C1C] leading-relaxed">
                {displayDetails}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#D9D5CC] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#263B50] text-[#F7F5F0] text-xs uppercase tracking-[0.15em] font-sans rounded-[2px] hover:bg-[#1a2938] transition-colors cursor-pointer"
          >
            {language === 'ja' ? '閉じる' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
