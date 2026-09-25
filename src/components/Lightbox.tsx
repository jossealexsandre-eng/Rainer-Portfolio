import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { InternshipImage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LightboxProps {
  images: InternshipImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  const { language } = useLanguage();
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentImage) return null;

  const displayTitle = language === 'ja' ? (currentImage.japaneseTitle || currentImage.title) : currentImage.title;
  const displayCaption = language === 'ja' && currentImage.captionJapanese ? currentImage.captionJapanese : currentImage.caption;
  const displayLocation = language === 'ja' && currentImage.locationJapanese ? currentImage.locationJapanese : currentImage.location;
  const displayDate = language === 'ja' && currentImage.dateJapanese ? currentImage.dateJapanese : currentImage.date;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1C]/92 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-[#F7F5F0]">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-sans">
          <span className="text-[#B4473F] font-semibold">{displayDate}</span>
          <span>·</span>
          <span>{displayLocation}</span>
        </div>

        <button
          onClick={onClose}
          aria-label={language === 'ja' ? '閉じる' : 'Close lightbox'}
          className="p-2 text-[#F7F5F0]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label={language === 'ja' ? '前の写真' : 'Previous photograph'}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-[#F7F5F0]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label={language === 'ja' ? '次の写真' : 'Next photograph'}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-[#F7F5F0]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      {/* Image / Content Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden max-h-[70vh] rounded-[2px] bg-[#263B50]/30 border border-white/10">
          {currentImage.url ? (
            <img
              src={currentImage.url}
              alt={displayTitle}
              className="max-h-[70vh] w-auto object-contain mx-auto"
            />
          ) : (
            <div className="w-[85vw] max-w-3xl aspect-[16/10] bg-[#263B50]/20 flex flex-col items-center justify-center p-8 text-center text-[#F7F5F0]">
              <span className="font-serif text-2xl mb-2 text-[#EFEBE3]">
                {displayTitle}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B4473F] mb-4">
                {displayDate} - {displayLocation}
              </span>
              <p className="max-w-md text-sm text-[#D8D0C3] font-sans leading-relaxed">
                {displayCaption}
              </p>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl text-[#F7F5F0]">
          <h4 className="font-serif text-lg text-[#F7F5F0]">{displayTitle}</h4>
          <p className="text-xs text-[#D8D0C3] font-sans mt-1">
            {displayCaption}
          </p>
          <span className="text-[10px] text-[#A69E90] uppercase tracking-widest block mt-2">
            {language === 'ja'
              ? `${images.length}枚中 ${currentIndex + 1}枚目`
              : `${currentIndex + 1} of ${images.length}`}
          </span>
        </div>
      </div>
    </div>
  );
};
