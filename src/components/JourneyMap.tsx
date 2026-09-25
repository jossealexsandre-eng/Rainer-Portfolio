import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { JourneyMilestone } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Sparkles } from 'lucide-react';

interface JourneyMapProps {
  journey: JourneyMilestone[];
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ journey }) => {
  const { language, t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(4); // Default to Osaka
  const tj = t.journey;

  const currentMilestone = journey.find((m) => m.step === activeStep) || journey[3];

  const milestoneTitle =
    language === 'ja'
      ? currentMilestone.titleJapanese
      : currentMilestone.title;

  const milestoneSubTitle =
    language === 'ja'
      ? currentMilestone.title
      : currentMilestone.titleJapanese;

  const milestoneLocation =
    language === 'ja'
      ? currentMilestone.locationJapanese
      : currentMilestone.location;

  const milestoneDescription =
    language === 'ja' && currentMilestone.descriptionJapanese
      ? currentMilestone.descriptionJapanese
      : currentMilestone.description;

  const milestoneTag =
    language === 'ja' && currentMilestone.tagJapanese
      ? currentMilestone.tagJapanese
      : currentMilestone.tag;

  const milestonePeriod =
    language === 'ja' && currentMilestone.periodJapanese
      ? currentMilestone.periodJapanese
      : currentMilestone.period;

  const milestoneHighlight =
    language === 'ja' && currentMilestone.highlightNotesJapanese
      ? currentMilestone.highlightNotesJapanese
      : currentMilestone.highlightNotes;

  return (
    <section
      id="journey"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC] relative"
    >
      <SectionHeading
        japaneseTitle={tj.japaneseTitle}
        englishTitle={tj.englishTitle}
        tagJapanese={tj.tag}
        tagEnglish={tj.tag}
        subtitle={tj.subtitle}
      />

      {/* TOP JOURNEY TRACK / STEPPER */}
      <div className="relative mb-14">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-[2px] bg-[#D9D5CC] z-0">
          {/* Active progress fill */}
          <div
            className="h-full bg-[#263B50] transition-all duration-500 ease-out"
            style={{ width: `${((activeStep - 1) / (journey.length - 1)) * 100}%` }}
          />
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {journey.map((milestone, idx) => {
            const isSelected = milestone.step === activeStep;
            const isPassed = milestone.step <= activeStep;
            const locName = language === 'ja' ? milestone.locationJapanese : milestone.location;
            const tagText = language === 'ja' && milestone.tagJapanese ? milestone.tagJapanese : milestone.tag;
            const periodText = language === 'ja' && milestone.periodJapanese ? milestone.periodJapanese : milestone.period;

            return (
              <motion.button
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(milestone.step)}
                className={`text-left p-4 md:p-5 rounded-[2px] transition-all border group flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#263B50] text-[#F7F5F0] border-[#263B50] shadow-md'
                    : isPassed
                    ? 'bg-[#EFEBE3] text-[#1C1C1C] border-[#D9D5CC] hover:border-[#263B50]/50'
                    : 'bg-[#F7F5F0] text-[#66645F] border-[#D9D5CC]'
                }`}
              >
                {/* Node number & Kanji */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#B4473F] text-white'
                        : isPassed
                        ? 'bg-[#263B50] text-[#F7F5F0]'
                        : 'bg-[#D9D5CC] text-[#66645F]'
                    }`}
                  >
                    0{milestone.step}
                  </span>
                  <span
                    className={`font-serif text-sm font-semibold tracking-wider ${
                      isSelected ? 'text-[#F7F5F0]/90' : 'text-[#B4473F]'
                    }`}
                  >
                    {milestone.kanjiTheme}
                  </span>
                </div>

                {/* Location Name */}
                <div>
                  <span
                    className={`block text-[10px] font-sans uppercase tracking-[0.2em] mb-1 ${
                      isSelected ? 'text-[#F7F5F0]/70' : 'text-[#66645F]'
                    }`}
                  >
                    {periodText}
                  </span>
                  <h4
                    className={`font-serif text-base sm:text-lg leading-snug font-medium ${
                      isSelected ? 'text-[#F7F5F0]' : 'text-[#1C1C1C]'
                    }`}
                  >
                    {locName}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-current/20 flex items-center justify-between text-[11px] font-sans">
                  <span className="opacity-80">{tagText}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* SELECTED MILESTONE SPOTLIGHT CARD */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#EFEBE3]/70 border border-[#D9D5CC] rounded-[2px] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden"
      >
        {/* Subtle Watermark Kanji in background */}
        <div
          className="absolute right-4 top-4 select-none pointer-events-none opacity-10 text-[#263B50] font-serif text-9xl"
          aria-hidden="true"
        >
          {currentMilestone.kanjiTheme}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Milestone Metadata */}
          <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-[#D9D5CC] pb-6 lg:pb-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#263B50] text-[#F7F5F0] rounded-[2px] text-[11px] font-sans tracking-[0.2em] uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>
                {tj.stepLabel} 0{currentMilestone.step} · {milestoneTag}
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-xs text-[#B4473F] tracking-widest block font-semibold">
                {language === 'ja' ? currentMilestone.location : currentMilestone.locationJapanese}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-normal">
                {milestoneLocation}
              </h3>
              <p className="font-mono text-xs text-[#66645F] tracking-wider">
                {milestonePeriod}
              </p>
            </div>

            {milestoneHighlight && (
              <div className="p-3 bg-[#F7F5F0] border border-[#D9D5CC] rounded-[2px] text-xs font-sans text-[#263B50] font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B4473F] shrink-0" />
                <span>{milestoneHighlight}</span>
              </div>
            )}
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#B4473F] font-semibold block">
                {milestoneSubTitle}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C]">
                {milestoneTitle}
              </h4>
            </div>

            <p className="font-sans text-base sm:text-lg text-[#1C1C1C] leading-relaxed">
              {milestoneDescription}
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs font-serif text-[#263B50] tracking-[0.2em] uppercase font-semibold">
              <span>{language === 'ja' ? 'ビアク島' : 'BIAK'}</span>
              <span className="text-[#B4473F]">→</span>
              <span>{language === 'ja' ? 'ジャカルタ' : 'JAKARTA'}</span>
              <span className="text-[#B4473F]">→</span>
              <span>{language === 'ja' ? 'バンドン' : 'BANDUNG'}</span>
              <span className="text-[#B4473F]">→</span>
              <span className="font-bold text-[#1C1C1C]">{language === 'ja' ? '大阪' : 'OSAKA'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
