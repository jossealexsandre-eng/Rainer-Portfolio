import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { HankoSeal } from './HankoSeal';
import { SkillItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Award, Users, Compass, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  skills: {
    linguistic: SkillItem[];
    professional: SkillItem[];
  };
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const { language, t: fullT } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'linguistic' | 'professional'>('all');
  const t = fullT.skills;

  const filteredSkills = {
    linguistic: activeTab === 'professional' ? [] : skills.linguistic,
    professional: activeTab === 'linguistic' ? [] : skills.professional,
  };

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC] relative"
    >
      <SectionHeading
        japaneseTitle={t.japaneseTitle}
        englishTitle={t.englishTitle}
        subtitle={t.subtitle}
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#263B50] text-[#F7F5F0] shadow-sm'
              : 'bg-[#EFEBE3] text-[#66645F] hover:bg-[#E5DFD5]'
          }`}
        >
          {t.allTab}
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab('linguistic')}
          className={`px-4 py-2 rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'linguistic'
              ? 'bg-[#263B50] text-[#F7F5F0] shadow-sm'
              : 'bg-[#EFEBE3] text-[#66645F] hover:bg-[#E5DFD5]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.linguisticTab}</span>
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab('professional')}
          className={`px-4 py-2 rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'professional'
              ? 'bg-[#263B50] text-[#F7F5F0] shadow-sm'
              : 'bg-[#EFEBE3] text-[#66645F] hover:bg-[#E5DFD5]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{t.professionalTab}</span>
        </motion.button>
      </div>

      {/* Two Column Architectural Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* LINGUISTIC COMPETENCIES */}
        {filteredSkills.linguistic.length > 0 && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#263B50]/40">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-[#263B50] font-semibold">言</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1C]">
                  {t.linguisticTab}
                </h3>
              </div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#263B50] bg-[#263B50]/10 px-2 py-0.5 rounded-[2px]">
                {skills.linguistic.length} {language === 'ja' ? '言語' : 'LANGUAGES'}
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {filteredSkills.linguistic.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-5 sm:p-6 bg-[#EFEBE3]/60 border rounded-[2px] transition-all hover:bg-[#EFEBE3] group ${
                    skill.highlight ? 'border-[#263B50]/30 shadow-sm' : 'border-[#D9D5CC]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif text-xs text-[#263B50] tracking-widest font-semibold">
                          {language === 'ja' ? skill.name : skill.japaneseName}
                        </span>
                        {skill.highlight && (
                          <Sparkles className="w-3 h-3 text-[#263B50]" />
                        )}
                      </div>
                      <h4 className="font-serif text-base sm:text-lg text-[#1C1C1C] font-medium group-hover:text-[#263B50] transition-colors">
                        {language === 'ja' ? skill.japaneseName : skill.name}
                      </h4>
                    </div>

                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#263B50] text-[#F7F5F0]">
                      {skill.proficiencyBadge}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#66645F] leading-relaxed">
                    {language === 'ja' && skill.descriptionJapanese ? skill.descriptionJapanese : skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* PROFESSIONAL & SOFT SKILLS */}
        {filteredSkills.professional.length > 0 && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#263B50]/40">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-[#263B50] font-semibold">実</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1C]">
                  {t.professionalTab}
                </h3>
              </div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#263B50] bg-[#263B50]/10 px-2 py-0.5 rounded-[2px]">
                {skills.professional.length} {language === 'ja' ? '項目' : 'SKILLS'}
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {filteredSkills.professional.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-5 sm:p-6 bg-[#EFEBE3]/60 border rounded-[2px] transition-all hover:bg-[#EFEBE3] group ${
                    skill.highlight ? 'border-[#263B50]/30 shadow-sm' : 'border-[#D9D5CC]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif text-xs text-[#263B50] tracking-widest font-semibold">
                          {language === 'ja' ? skill.name : skill.japaneseName}
                        </span>
                        {skill.highlight && (
                          <Sparkles className="w-3 h-3 text-[#263B50]" />
                        )}
                      </div>
                      <h4 className="font-serif text-base sm:text-lg text-[#1C1C1C] font-medium group-hover:text-[#263B50] transition-colors">
                        {language === 'ja' ? skill.japaneseName : skill.name}
                      </h4>
                    </div>

                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#263B50] text-[#F7F5F0]">
                      {skill.proficiencyBadge}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#66645F] leading-relaxed">
                    {language === 'ja' && skill.descriptionJapanese ? skill.descriptionJapanese : skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Omotenashi Reflection Banner */}
      <div className="mt-14 p-6 sm:p-8 bg-[#F7F5F0] border border-[#D9D5CC] rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B4473F]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#B4473F] font-semibold">
              {language === 'ja' ? 'おもてなし・礼儀の実践哲学' : 'Hospitality & Etiquette Philosophy'}
            </span>
          </div>
          <p className="font-serif text-base sm:text-lg text-[#1C1C1C] italic">
            {language === 'ja'
              ? '「敬語とおもてなしは単なる形式的な規則ではなく、相手を尊重し、真心と細やかな気配りを届ける意志の表れです。」'
              : '"Keigo and Omotenashi are not mechanical rules; they are the intentional expression of empathy, dignity, and mindfulness for another person."'}
          </p>
        </div>
        <div className="shrink-0">
          <HankoSeal text="和" size="md" />
        </div>
      </div>
    </section>
  );
};
