import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface SectionHeadingProps {
  japaneseTitle: string;
  englishTitle: string;
  subtitle?: string;
  tagJapanese?: string;
  tagEnglish?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  japaneseTitle,
  englishTitle,
  subtitle,
  tagJapanese,
  tagEnglish,
  align = 'left',
  className = '',
}) => {
  const { language } = useLanguage();

  const primaryTitle = language === 'ja' ? japaneseTitle : englishTitle;
  const secondaryTag = language === 'ja' ? (tagJapanese || '公式記録') : (tagEnglish || 'OVERVIEW');

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center items-center' : 'text-left items-start'
      } ${className}`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-2 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="font-serif text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#B4473F] font-semibold">
          {primaryTitle}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-px w-6 sm:w-8 bg-[#D9D5CC] origin-left"
        />
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-sans text-[#66645F]">
          {secondaryTag}
        </span>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-sm md:text-base text-[#66645F] max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
