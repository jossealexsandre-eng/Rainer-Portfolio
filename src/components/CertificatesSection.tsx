import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { HankoSeal } from './HankoSeal';
import { CertificateItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  ShieldCheck,
  Check,
  Calendar,
  Building2,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
}

type CategoryFilter = 'all' | 'academic' | 'internship' | 'leadership';

interface CategoryOption {
  key: CategoryFilter;
  label: string;
  jp: string;
}

const CATEGORIES: CategoryOption[] = [
  { key: 'all', label: 'All Credentials', jp: 'すべて' },
  { key: 'academic', label: "Dean's List & Honors", jp: '学業優秀賞' },
  { key: 'internship', label: 'Internship & Global', jp: '実習・国際' },
  { key: 'leadership', label: 'Leadership & Service', jp: '組織・奉仕' },
];

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
}) => {
  const { language, t: fullT } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const t = fullT.certificates;

  const filteredCertificates = certificates.filter((cert) => {
    if (activeCategory === 'all') return true;
    return cert.category === activeCategory;
  });

  return (
    <section
      id="certificates"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC] relative"
    >
      <SectionHeading
        japaneseTitle={t.japaneseTitle}
        englishTitle={t.englishTitle}
        subtitle={t.subtitle}
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count =
            cat.key === 'all'
              ? certificates.length
              : certificates.filter((c) => c.category === cat.key).length;

          return (
            <motion.button
              key={cat.key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans rounded-[2px] transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#263B50] text-[#F7F5F0] shadow-sm font-medium'
                  : 'bg-[#EFEBE3]/70 text-[#66645F] hover:bg-[#EFEBE3] hover:text-[#1C1C1C] border border-[#D9D5CC]'
              }`}
            >
              <span className="font-serif text-[11px] font-semibold">
                {language === 'ja' ? cat.jp : cat.label}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-black/5 text-[#66645F]'
                }`}
              >
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Certificates Grid - 3 columns on desktop for balanced proportion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredCertificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer bg-[#FAF8F5] hover:bg-[#FFFFFF] border border-[#D9D5CC] hover:border-[#263B50]/60 rounded-[2px] transition-all shadow-xs hover:shadow-lg flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Certificate Thumbnail Image with Hover Preview */}
            <div className="relative aspect-[16/11] w-full bg-[#EFEBE3] overflow-hidden border-b border-[#D9D5CC] flex items-center justify-center">
              {cert.imageUrl ? (
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="p-8 text-center text-[#66645F]">
                  <ShieldCheck className="w-12 h-12 mx-auto text-[#263B50]/40 mb-2" />
                  <span className="text-xs uppercase tracking-wider font-mono">
                    {language === 'ja' ? '公式証明書' : 'Official Document'}
                  </span>
                </div>
              )}

              {/* Hover Overlay with Inspect Badge */}
              <div className="absolute inset-0 bg-[#263B50]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                <span className="p-2 rounded-full bg-white/20 backdrop-blur-xs border border-white/30">
                  <ZoomIn className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs uppercase tracking-widest font-sans font-medium">
                  {language === 'ja' ? '証明書を拡大表示' : 'Inspect Document'}
                </span>
              </div>

              {/* Top Badges */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-[10px] font-serif font-semibold tracking-wider px-2 py-0.5 bg-black/65 backdrop-blur-xs text-[#F7F5F0] rounded-[2px] border border-white/10">
                  {language === 'ja' ? cert.japaneseTitle : cert.title}
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-[#263B50] text-[#F7F5F0] rounded-[2px] font-semibold shadow-xs">
                  {cert.dateBadge}
                </span>
              </div>
            </div>

            {/* Card Information Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-lg text-[#1C1C1C] group-hover:text-[#263B50] transition-colors leading-snug line-clamp-2">
                  {language === 'ja' ? cert.japaneseTitle : cert.title}
                </h3>

                <div className="space-y-1.5 text-xs font-sans text-[#66645F] pt-1">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#263B50] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#1C1C1C] line-clamp-1">
                      {language === 'ja' ? cert.issuerJapanese : cert.issuer}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#66645F] shrink-0" />
                    <span>{cert.year}</span>
                    {cert.credentialId && (
                      <>
                        <span className="text-[#D9D5CC]">·</span>
                        <span className="font-mono text-[10px] text-[#263B50] font-medium truncate max-w-[140px]">
                          {cert.credentialId}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills badges */}
              <div className="pt-2 border-t border-[#D9D5CC]/60">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EFEBE3] text-[10px] font-sans text-[#1C1C1C] rounded-[2px]"
                    >
                      <Check className="w-2.5 h-2.5 text-[#B4473F]" />
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-sans text-[#66645F] bg-[#EFEBE3]/60 rounded-[2px]">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-[#D9D5CC]/40 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-[#263B50] group-hover:text-[#B4473F] transition-colors font-medium">
                    {t.viewCredential} →
                  </span>
                  <span className="text-[10px] font-mono text-[#66645F]">
                    {language === 'ja' ? '公式証明' : 'VERIFIED'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DETAILED CERTIFICATE INSPECTION MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1C1C]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl my-8 bg-[#F7F5F0] border-2 border-[#263B50] rounded-[2px] shadow-2xl overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Control Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9D5CC] bg-[#EFEBE3]">
                <div className="flex items-center gap-3">
                  <HankoSeal size="sm" />
                  <div>
                    <span className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1C1C1C] block">
                      {t.previewTitle}
                    </span>
                    <span className="text-[10px] text-[#66645F] font-sans">
                      {selectedCert.credentialId || (language === 'ja' ? '公式証明資料' : 'Verified Academic Credential')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-full hover:bg-[#D9D5CC]/60 text-[#1C1C1C] hover:text-[#B4473F] transition-colors cursor-pointer"
                  aria-label={t.closeModal}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Inner Container */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#B4473F] font-semibold block mb-1">
                    {language === 'ja' ? selectedCert.title : selectedCert.japaneseTitle}
                  </span>
                  <h3 id="cert-modal-title" className="font-serif text-2xl sm:text-3xl text-[#1C1C1C]">
                    {language === 'ja' ? selectedCert.japaneseTitle : selectedCert.title}
                  </h3>
                  <p className="text-xs font-sans text-[#66645F] mt-1">
                    {language === 'ja' ? selectedCert.issuerJapanese : selectedCert.issuer} · {selectedCert.year}
                  </p>
                </div>

                {/* Certificate Image Frame */}
                {selectedCert.imageUrl && (
                  <div className="relative aspect-[16/11] max-h-[460px] bg-white border border-[#D9D5CC] rounded-[2px] overflow-hidden flex items-center justify-center p-3 shadow-inner">
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Description & Details */}
                <div className="p-4 bg-[#EFEBE3]/60 border border-[#D9D5CC] rounded-[2px] space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-sans text-[#263B50] font-semibold">
                    {language === 'ja' ? '証明内容・実績詳細' : 'Credential Description'}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#1C1C1C] leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Skills verified */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-sans text-[#263B50] font-semibold">
                    {t.skillsVerified}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#D9D5CC] text-xs font-sans text-[#1C1C1C] rounded-[2px]"
                      >
                        <Check className="w-3 h-3 text-[#B4473F]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer link to view full size */}
                {selectedCert.imageUrl && (
                  <div className="pt-4 border-t border-[#D9D5CC] flex items-center justify-between text-xs font-sans">
                    <a
                      href={selectedCert.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#263B50] hover:text-[#B4473F] font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{language === 'ja' ? '新しいタブで原寸画像を開く' : 'Open full image in new tab'}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedCert(null)}
                      className="px-4 py-1.5 bg-[#263B50] text-[#F7F5F0] rounded-[2px] hover:bg-[#1C1C1C] transition-colors cursor-pointer"
                    >
                      {t.closeModal}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
