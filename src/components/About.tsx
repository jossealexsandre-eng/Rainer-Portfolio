import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  data: PortfolioData['profile'];
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const { t, language } = useLanguage();
  const ta = t.about;

  const infoItems = [
    { label: ta.labels.name, value: ta.values.name },
    { label: ta.labels.born, value: ta.values.born },
    { label: ta.labels.birthplace, value: ta.values.birthplace },
    { label: ta.labels.field, value: ta.values.field },
    { label: ta.labels.university, value: ta.values.university },
    { label: ta.labels.interest, value: ta.values.interest },
  ];

  const personalStatement =
    language === 'ja'
      ? '「言語は単なる伝達手段ではありません。人と場所、そして文化の本質を深く理解するための鍵です。」'
      : data.personalStatement;

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]"
    >
      {/* Split Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT COLUMN: Large Typography */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col items-start"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#66645F]">
              {ta.heading}
            </span>
            <span className="h-px w-6 bg-[#D9D5CC]" />
          </div>
          <h2
            id="about-japanese-heading"
            className="font-serif text-5xl sm:text-6xl text-[#1C1C1C] font-normal tracking-tight mb-6"
          >
            {language === 'ja' ? '自己紹介' : 'About Me'}
          </h2>
          <p className="text-xs font-serif text-[#263B50] tracking-[0.25em] uppercase">
            {ta.route}
          </p>

          {/* Subtle vertical accent characters */}
          <div className="hidden lg:block mt-16 pl-2 border-l border-[#D9D5CC]/80">
            <span className="writing-vertical-rl font-serif text-xs tracking-[0.4em] text-[#66645F]/60">
              {ta.tagline}
            </span>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Biography Narrative & Minimalist Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 space-y-12"
        >
          {/* Biography Text */}
          <div className="space-y-5 text-base sm:text-lg text-[#1C1C1C] font-sans leading-relaxed">
            <p>{ta.bio1}</p>
            <p className="text-[#66645F]">{ta.bio2}</p>
          </div>

          {/* Minimalist Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-[#D9D5CC]">
            {infoItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.05 }}
                className="border-b border-[#D9D5CC]/60 pb-3"
              >
                <span className="block text-[11px] uppercase tracking-[0.2em] font-sans text-[#66645F] mb-1">
                  {item.label}
                </span>
                <span className="font-serif text-base sm:text-lg text-[#1C1C1C]">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Personal Statement Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8"
          >
            <div className="relative p-8 md:p-10 bg-[#EFEBE3]/60 border-l-2 border-[#B4473F] rounded-r-[2px] shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute top-4 left-4 font-serif text-3xl text-[#B4473F]/30 leading-none">
                "
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl md:text-[1.7rem] text-[#1C1C1C] leading-snug italic relative z-10 pl-4">
                {personalStatement}
              </blockquote>
              <div className="mt-4 pl-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#263B50]/30" />
                <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#263B50]">
                  {ta.quoteCredit}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};