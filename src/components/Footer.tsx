import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const tf = t.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayName = language === 'ja' ? 'ライナー・ジャコブ・ヤワン' : 'Rainer Jackob Yawan';

  return (
    <footer
      id="main-footer"
      className="border-t border-[#D9D5CC] bg-[#EFEBE3]/40 py-16 md:py-24 px-6 sm:px-8 lg:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto flex flex-col justify-between space-y-12"
      >
        {/* Top Row: Identity & Location */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1C] font-normal">
                {displayName}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] font-sans text-[#66645F] mt-1">
                {tf.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-sans tracking-[0.15em] text-[#66645F] uppercase">
            <span>{tf.locationBiak}</span>
            <span>·</span>
            <span>{tf.locationOsaka}</span>
            <motion.button
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-2.5 border border-[#D9D5CC] bg-white rounded-full text-[#1C1C1C] hover:text-[#263B50] hover:border-[#263B50] transition-colors shadow-xs hover:shadow cursor-pointer"
              aria-label={tf.scrollTop}
              title={tf.scrollTop}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Row: Copyright & Japanese Philosophy note */}
        <div className="border-t border-[#D9D5CC]/60 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#66645F] font-sans gap-4">
          <p>{tf.copyright}</p>
          <p className="font-serif text-[11px] text-[#263B50] tracking-widest">
            {tf.philosophy}
          </p>
        </div>
      </motion.div>
    </footer>
  );
};