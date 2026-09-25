import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { EducationEntry } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface EducationTimelineProps {
  entries: EducationEntry[];
}

export const EducationTimeline: React.FC<EducationTimelineProps> = ({ entries }) => {
  const { language, t } = useLanguage();
  const te = t.education;

  return (
    <section
      id="education"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-[#D9D5CC]"
    >
      <SectionHeading
        japaneseTitle={te.japaneseTitle}
        englishTitle={te.englishTitle}
        subtitle={te.subtitle}
      />

      {/* Japanese Museum Exhibition Timeline */}
      <div className="relative pl-6 md:pl-10 border-l border-[#D9D5CC] ml-3 md:ml-6 space-y-12 md:space-y-16 py-2">
        {entries.map((entry, idx) => {
          const institution = language === 'ja' && entry.institutionJapanese ? entry.institutionJapanese : entry.institution;
          const field = language === 'ja' && entry.fieldJapanese ? entry.fieldJapanese : entry.field;
          const location = language === 'ja' && entry.locationJapanese ? entry.locationJapanese : entry.location;
          const notes = language === 'ja' && entry.notesJapanese ? entry.notesJapanese : entry.notes;
          const period = language === 'ja' && entry.periodJapanese ? entry.periodJapanese : entry.period;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group ${
                entry.isCurrent
                  ? 'p-6 sm:p-8 bg-[#EFEBE3]/70 border border-[#D9D5CC] rounded-[2px] shadow-sm hover:shadow-md transition-shadow'
                  : 'pt-1'
              }`}
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-2 flex items-center justify-center ${
                  entry.isCurrent ? 'w-4 h-4 -left-[33px] md:-left-[49px]' : 'w-2.5 h-2.5'
                }`}
              >
                {entry.isCurrent ? (
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B4473F] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#B4473F] ring-4 ring-[#F7F5F0]"></span>
                  </span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#263B50]/60 ring-4 ring-[#F7F5F0] group-hover:bg-[#263B50] transition-colors" />
                )}
              </div>

              {/* Content Block */}
              <div className="space-y-1.5">
                {/* Year / Period */}
                <div className="flex items-center gap-3">
                  <span
                    className={`font-serif text-xs md:text-sm tracking-[0.15em] ${
                      entry.isCurrent
                        ? 'text-[#B4473F] font-semibold'
                        : 'text-[#66645F]'
                    }`}
                  >
                    {period}
                  </span>
                  {entry.isCurrent && (
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#B4473F]/10 text-[#B4473F] text-[10px] uppercase font-sans tracking-widest font-medium">
                      {te.currentBadge}
                    </span>
                  )}
                </div>

                {/* Institution Name */}
                <h3
                  className={`font-serif text-xl sm:text-2xl ${
                    entry.isCurrent ? 'text-[#1C1C1C] font-semibold' : 'text-[#1C1C1C]'
                  }`}
                >
                  {institution}
                </h3>

                {/* Field & Location */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#66645F] font-sans">
                  <span>{field}</span>
                  {location && (
                    <>
                      <span className="text-[#D9D5CC]">·</span>
                      <span className="text-[#263B50]/80">{location}</span>
                    </>
                  )}
                </div>

                {notes && (
                  <p className="text-xs text-[#66645F]/90 font-sans italic pt-1">
                    {notes}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
