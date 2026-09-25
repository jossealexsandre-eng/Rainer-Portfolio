import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Upload, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const getEmbedInfo = (src: string) => {
  if (!src) return { type: 'none' as const };

  const trimmed = src.trim();

  // Instagram Reel or Post
  const igMatch = trimmed.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/i);
  if (igMatch && igMatch[1]) {
    return {
      type: 'instagram' as const,
      embedUrl: `https://www.instagram.com/reel/${igMatch[1]}/embed/`,
      originalUrl: trimmed,
    };
  }

  // YouTube Shorts or standard video
  const ytShorts = trimmed.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]+)/i);
  if (ytShorts && ytShorts[1]) {
    return {
      type: 'youtube' as const,
      embedUrl: `https://www.youtube.com/embed/${ytShorts[1]}?autoplay=0&rel=0`,
      originalUrl: trimmed,
    };
  }

  const ytWatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/i);
  if (ytWatch && ytWatch[1]) {
    return {
      type: 'youtube' as const,
      embedUrl: `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=0&rel=0`,
      originalUrl: trimmed,
    };
  }

  // Native HTML5 video file or blob
  return {
    type: 'video' as const,
    src: trimmed,
  };
};

interface VideoShowcaseProps {
  videoData: {
    title: string;
    titleJapanese?: string;
    url?: string;
    leftUrl?: string;
    rightUrl?: string;
    description: string;
    descriptionJapanese?: string;
    notes: string;
  };
}

type SlotKey = 'left' | 'center' | 'right';

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videoData }) => {
  const { language, t: fullT } = useLanguage();
  const t = fullT.internship;

  const [videoSources, setVideoSources] = useState<{ [key in SlotKey]: string }>({
    left: videoData.leftUrl || '',
    center: videoData.url || '',
    right: videoData.rightUrl || '',
  });
  const [activeSlotForModal, setActiveSlotForModal] = useState<SlotKey>('center');
  const [showInputModal, setShowInputModal] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  React.useEffect(() => {
    setVideoSources({
      left: videoData.leftUrl || '',
      center: videoData.url || '',
      right: videoData.rightUrl || '',
    });
  }, [videoData.url, videoData.leftUrl, videoData.rightUrl]);

  const slots = [
    {
      key: 'left' as SlotKey,
      label: t.slotReel1,
      sublabel: t.slotReel1Sub,
      isCenter: false,
    },
    {
      key: 'center' as SlotKey,
      label: t.slotMain,
      sublabel: t.slotMainSub,
      isCenter: true,
    },
    {
      key: 'right' as SlotKey,
      label: t.slotReel2,
      sublabel: t.slotReel2Sub,
      isCenter: false,
    },
  ];

  const handleVideoUpload = (slot: SlotKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSources((prev) => ({ ...prev, [slot]: url }));
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setVideoSources((prev) => ({ ...prev, [activeSlotForModal]: customUrl.trim() }));
      setCustomUrl('');
      setShowInputModal(false);
    }
  };

  const displayDescription =
    language === 'ja'
      ? '名門大阪ゴルフクラブでのコース業務、乗用カート運行、プレイヤーとのスポーツ敬語対話、そして神戸・大阪での生活を収めたショート動画記録。'
      : videoData.description;

  const displayNotes =
    language === 'ja'
      ? '大阪ゴルフクラブ実習・日本生活記録ショート動画'
      : videoData.notes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pt-12 border-t border-[#D9D5CC]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif text-sm tracking-[0.2em] text-[#B4473F] font-semibold">
            {t.videoTitle}
          </span>
          <span className="h-px w-6 bg-[#D9D5CC]" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#66645F]">
            {t.videoArchiveTag}
          </span>
        </div>
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowInputModal(!showInputModal)}
          className="text-xs text-[#263B50] hover:text-[#B4473F] font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{t.setVideoSource}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showInputModal && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleUrlSubmit}
            className="p-4 bg-[#EFEBE3] border border-[#D9D5CC] rounded-[2px] flex flex-col gap-3 max-w-2xl mx-auto overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D9D5CC] pb-2">
              <span className="text-xs uppercase tracking-wider font-sans text-[#263B50] font-semibold">
                {t.selectVideoSlot}
              </span>
              <div className="flex items-center gap-1.5">
                {slots.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActiveSlotForModal(s.key)}
                    className={`px-2.5 py-1 text-[11px] font-sans uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer ${
                      activeSlotForModal === s.key
                        ? 'bg-[#263B50] text-[#F7F5F0] font-medium'
                        : 'bg-white text-[#66645F] border border-[#D9D5CC] hover:bg-[#F7F5F0]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="url"
                placeholder={language === 'ja' ? '動画の直接リンクURLを入力してください...' : `Paste video URL for ${activeSlotForModal.toUpperCase()}...`}
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full text-xs font-sans px-3 py-2 bg-white border border-[#D9D5CC] rounded-[2px] focus:outline-none focus:border-[#263B50]"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#263B50] text-[#F7F5F0] text-xs font-sans uppercase tracking-wider rounded-[2px] cursor-pointer"
                >
                  {t.saveUrl}
                </button>
                <label className="cursor-pointer px-3 py-2 border border-[#D9D5CC] bg-white text-xs text-[#1C1C1C] rounded-[2px] flex items-center gap-1 hover:bg-[#FAF8F5] transition-colors">
                  <Upload className="w-3 h-3" />
                  <span>{language === 'ja' ? 'アップロード' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => handleVideoUpload(activeSlotForModal, e)}
                  />
                </label>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 3 Video Cards Showcase Container (Portrait 9:16) */}
      <div className="w-full flex flex-row items-center justify-start md:justify-center gap-4 sm:gap-6 lg:gap-8 pt-4 pb-4 overflow-x-auto no-scrollbar px-2 sm:px-0">
        {slots.map((slot, idx) => {
          const src = videoSources[slot.key];
          const isCenter = slot.isCenter;

          return (
            <motion.div
              key={slot.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className={`group relative aspect-[9/16] shrink-0 bg-[#1C1C1C] rounded-[8px] overflow-hidden transition-all flex flex-col items-center justify-center ${
                isCenter
                  ? 'w-[280px] sm:w-[310px] md:w-[330px] lg:w-[350px] border-2 border-[#263B50]/40 shadow-2xl z-10'
                  : 'w-[220px] sm:w-[240px] md:w-[255px] lg:w-[275px] border border-[#D9D5CC] shadow-lg opacity-95 hover:opacity-100 hover:border-[#263B50]/50'
              }`}
            >
              {/* Slot Indicator Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/15 text-[10px] tracking-wider text-[#F7F5F0] font-sans">
                <span className="font-serif text-[#B4473F] font-semibold">{slot.label}</span>
                <span className="text-white/40">·</span>
                <span className="text-[9px] uppercase">{language === 'ja' ? '縦型9:16' : '9:16 REEL'}</span>
              </div>

              {/* Upload/Change Button when video is loaded */}
              {src && (
                <label
                  title={t.replaceVideo}
                  className="absolute top-3 right-3 z-20 cursor-pointer p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus-within:opacity-100 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => handleVideoUpload(slot.key, e)}
                  />
                </label>
              )}

              {(() => {
                const embed = getEmbedInfo(src);

                if (embed.type === 'instagram') {
                  return (
                    <div className="w-full h-full relative bg-black flex items-center justify-center">
                      <iframe
                        src={embed.embedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title={slot.label}
                      />
                      <a
                        href={embed.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 z-20 px-2.5 py-1 bg-black/80 hover:bg-black text-[#F7F5F0] text-[10px] font-sans rounded-full flex items-center gap-1.5 border border-white/20 transition-all opacity-85 hover:opacity-100 shadow-md"
                        title="Buka di Instagram"
                      >
                        <ExternalLink className="w-3 h-3 text-[#B4473F]" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  );
                }

                if (embed.type === 'youtube') {
                  return (
                    <iframe
                      src={embed.embedUrl}
                      className="w-full h-full border-0 bg-black"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      title={slot.label}
                    />
                  );
                }

                if (embed.type === 'video') {
                  return (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    >
                      <source src={embed.src} type="video/mp4" />
                      Your browser does not support HTML5 video playback.
                    </video>
                  );
                }

                return (
                  /* Editorial Video Placeholder */
                  <div className="p-6 text-center text-[#F7F5F0] flex flex-col items-center justify-center space-y-3.5 w-full">
                    <div
                      className={`rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[#F7F5F0] ${
                        isCenter ? 'w-14 h-14' : 'w-11 h-11'
                      }`}
                    >
                      <Film className={isCenter ? 'w-6 h-6 text-[#B4473F]' : 'w-5 h-5 text-[#B4473F]'} />
                    </div>

                    <div className="space-y-1">
                      <span className="font-serif tracking-[0.2em] text-[11px] sm:text-xs uppercase text-[#EFEBE3] block font-semibold">
                        {slot.sublabel}
                      </span>
                      <p className="text-[11px] text-[#D8D0C3]/75 font-sans line-clamp-2 px-2">
                        {isCenter ? displayNotes : (language === 'ja' ? '9:16縦型動画を追加' : 'Add 9:16 portrait video')}
                      </p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] tracking-widest uppercase font-mono bg-white/10 text-[#D8D0C3] rounded-full border border-white/10">
                        {language === 'ja' ? '9:16 縦型動画' : '9:16 Portrait'}
                      </span>
                    </div>

                    <div className="pt-1">
                      <label className="cursor-pointer px-3.5 py-1.5 bg-[#F7F5F0] text-[#1C1C1C] text-[11px] uppercase tracking-wider font-sans rounded-[2px] hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm font-medium">
                        <Upload className="w-3 h-3" />
                        <span>{t.uploadMp4}</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm"
                          className="hidden"
                          onChange={(e) => handleVideoUpload(slot.key, e)}
                        />
                      </label>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          );
        })}
      </div>

      {/* Video Description below player */}
      <div className="max-w-2xl mx-auto text-center pt-2">
        <p className="text-xs sm:text-sm text-[#66645F] font-sans italic leading-relaxed">
          {displayDescription}
        </p>
      </div>
    </motion.div>
  );
};
