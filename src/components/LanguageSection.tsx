import React from 'react';
import { SectionHeading } from './SectionHeading';
import { LanguageEntry } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSectionProps {
  languages: LanguageEntry[];
}

export const LanguageSection: React.FC<LanguageSectionProps> = ({ languages }) => {
  const { t } = useLanguage();
  const tl = t.languages;

  return (
    <section
      id="languages"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC] relative overflow-hidden"
    >
      {/* Subtle Japanese vertical character on right margin */}
      <div
        className="hidden xl:block absolute right-6 top-28 select-none pointer-events-none opacity-20"
        aria-hidden="true"
      >
        <span className="writing-vertical-rl font-serif text-5xl tracking-[0.5em] text-[#263B50]">
          言葉
        </span>
      </div>

      <SectionHeading
        japaneseTitle={tl.japaneseTitle}
        englishTitle={tl.englishTitle}
        subtitle={tl.subtitle}
      />

      {/* 3 Refined Typography Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="p-8 bg-[#EFEBE3]/50 border border-[#D9D5CC] rounded-[2px] flex flex-col justify-between space-y-6 hover:bg-[#FFFFFF] transition-all duration-300"
          >
            <div>
              {/* Native script display */}
              <span className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] block mb-1">
                {lang.nativeName}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#66645F] block">
                {lang.name}
              </span>
            </div>

            <div className="pt-4 border-t border-[#D9D5CC]/80 space-y-2">
              {/* Typographic Level Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#66645F]">
                  {tl.proficiencyLabel}
                </span>
                <span className="px-2.5 py-1 rounded-[2px] bg-[#263B50]/10 text-[#263B50] font-sans text-xs font-semibold tracking-wider">
                  {lang.levelBadge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#1C1C1C] font-sans">
                {lang.level}
              </p>

              {lang.note && (
                <p className="text-[11px] text-[#66645F] font-sans italic pt-1">
                  {lang.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};