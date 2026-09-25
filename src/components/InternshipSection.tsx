import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Compass,
  Award,
  Flag,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { HankoSeal } from './HankoSeal';
import { InternshipGallery } from './InternshipGallery';
import { VideoShowcase } from './VideoShowcase';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface InternshipSectionProps {
  data: PortfolioData['internship'];
}

export const InternshipSection: React.FC<InternshipSectionProps> = ({ data }) => {
  const { language, t: fullT } = useLanguage();
  const t = fullT.internship;
  const heroImageSrc = data.heroImage || '';
  const [narrativeTab, setNarrativeTab] = useState<'experience' | 'learning' | 'reflection'>('experience');

  const facts = [
    { label: t.facts.organizationLabel, value: t.facts.organizationValue, sub: t.facts.organizationSub },
    { label: t.facts.roleLabel, value: t.facts.roleValue, sub: t.facts.roleSub },
    { label: t.facts.locationLabel, value: t.facts.locationValue, sub: t.facts.locationSub },
    { label: t.facts.periodLabel, value: t.facts.periodValue, sub: t.facts.periodSub },
  ];

  const caddyDuties = [
    {
      title: language === 'ja' ? '傾斜・芝目・海風の読み' : 'Green Reading & Course Topography',
      sub: language === 'ja' ? 'Green Reading & Topography' : '傾斜・芝目・海風の読み',
      description:
        language === 'ja'
          ? '海風による風向きの急変や起伏に富んだ高速グリーンの芝目を正確に読み、プレイヤーの正確なパッティングラインを支援。'
          : 'Understanding complex undulations, coastal wind shifts, and turf grain on the seaside greens to assist golfers with accurate putting lines.',
    },
    {
      title: language === 'ja' ? '距離測定と番手選定サポート' : 'Yardage & Club Recommendation',
      sub: language === 'ja' ? 'Yardage & Club Recommendation' : '距離測定と番手選定サポート',
      description:
        language === 'ja'
          ? 'ハザードやピンまでの残りヤードを瞬時に算出し、風とライに応じた最適なクラブ選択を敬語でスムーズに助言。'
          : 'Calculating distances to hazards and pins, advising players on appropriate iron and wood choices with polite Japanese timing.',
    },
    {
      title: language === 'ja' ? '乗用カート運行管理・安全進行' : 'Golf Cart Navigation & Pace of Play',
      sub: language === 'ja' ? 'Cart Navigation & Safety' : '乗用カート運行管理・安全進行',
      description:
        language === 'ja'
          ? '起伏のあるシーサイドコースを電動カートで安全に運行し、後続組との間隔やプレーペースを常に最適に維持。'
          : 'Operating electric golf carts safely across rolling terrain while maintaining optimal course rhythm and group pace of play.',
    },
    {
      title: language === 'ja' ? 'おもてなし精神と現場敬語' : 'Omotenashi & Sports Keigo',
      sub: language === 'ja' ? 'Hospitality & Keigo Standard' : 'おもてなし精神と現場敬語',
      description:
        language === 'ja'
          ? 'クラブの迅速な清掃、先回りの配慮、18ホールを通じた礼儀正しいコミュニケーションで心地よいラウンドを提供。'
          : 'Practicing refined Japanese hospitality-cleaning clubs promptly, anticipating player needs, and delivering courteous communication throughout all 18 holes.',
    },
  ];

  const dailyLifeAspects = [
    {
      title: language === 'ja' ? '神戸・北野異人館街の散策' : 'Kitano Ijinkan & Heritage Walk',
      sub: language === 'ja' ? 'Kitano Heritage Walk' : '神戸・北野異人館街の散策',
      description:
        language === 'ja'
          ? '休日に神戸北野の歴史的な洋風建築や異人館街を巡り、日本の近代国際交流の歴史と街並みを探訪。'
          : 'Exploring Western merchant residences, international cultural heritage, and historic streets in Kobe on off-duty days.',
    },
    {
      title: language === 'ja' ? '日本の四季・鮮やかな紅葉と冬' : 'Kansai Autumn & Winter Seasons',
      sub: language === 'ja' ? 'Kansai Autumn & Winter' : '日本の四季・鮮やかな紅葉と冬',
      description:
        language === 'ja'
          ? '常夏のパプアとは異なる、燃えるような朱色の紅葉（モミジ）や凛とした冬の冷気など、日本の豊かな四季を五感で実感。'
          : 'Experiencing Japan’s dramatic seasonal transitions, from amber-crimson Momiji foliage to crisp winter morning temperatures.',
    },
    {
      title: language === 'ja' ? '自立した生活と生活習慣の適応' : 'Independent Living & Resilience',
      sub: language === 'ja' ? 'Independent Living' : '自立した生活と生活習慣の適応',
      description:
        language === 'ja'
          ? '電車の乗り継ぎ通勤、食材の買い出し、自炊生活など、故郷ビアク島から遠く離れた異国の地で高い自立心を確立。'
          : 'Navigating daily commuting, grocery shopping, regional culinary culture, and independent living far from home in Biak, Papua.',
    },
    {
      title: language === 'ja' ? '指導員や仲間との心温まる交流' : 'Camaraderie with Mentors & Team',
      sub: language === 'ja' ? 'Camaraderie & Mentorship' : '指導員や仲間との心温まる交流',
      description:
        language === 'ja'
          ? 'コース内外で親身に支えてくださる先輩キャディやマネージャー、実習生仲間との間に確固たる信頼と友情を構築。'
          : 'Building deep mutual trust and friendship with Japanese senior colleagues, management mentors, and fellow international interns.',
    },
  ];

  const narrativeIntro =
    language === 'ja'
      ? '1937年開場の名門・大阪ゴルフクラブにて、プロのキャディとして現場に立ちながら、日本の生活様式や文化的習慣に深く浸る日々。スポーツ現場でのリアルタイムな敬語運用、細やかな気配り、そして関西での一人暮らしを通じた精神的成長の全記録。'
      : data.storyIntro;

  const narrativeHeadline =
    language === 'ja'
      ? 'グリーン上の奮闘と、日本での温かい日常'
      : data.storyHeadline;

  const narrativeExperience =
    language === 'ja'
      ? '大阪ゴルフクラブは日本有数のシーサイドリンクスコースであり、早朝からの準備が求められます。ゴルフバッグや電動カートの運行管理から、傾斜・海風・芝目の正確な読み、プレイヤーへの的確な番手アドバイスに至るまで、熟練の先輩キャディと連携しながら最高水準のサポートを提供しています。'
      : data.narratives.experience;

  const narrativeLearning =
    language === 'ja'
      ? '教科書では決して学べない「現場のスポーツ敬語（尊敬語・謙譲語）」を徹底的に体得しました。プレイヤーの要望を先回りして察知するおもてなし精神、高価な用具の丁寧な扱い、そして厳しい天候下でも礼儀正しく落ち着いた接客を維持するプロの態度を身につけました。'
      : data.narratives.learning;

  const narrativeReflection =
    language === 'ja'
      ? 'ゴルフ場を離れた神戸・北野異人館の散策や、息をのむような秋の紅葉、自炊生活など、日本での毎日は私の視野を大きく広げました。インドネシア・パプア州ビアク島から来日し、日本のプロフェッショナル社会で信頼を築けた経験は、誠意と敬意がすべての国境を越えることを証明してくれました。'
      : data.narratives.reflection;

  return (
    <section
      id="internship"
      className="py-24 md:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t-2 border-[#263B50]/15 relative"
    >
      {/* Subtle Japanese vertical background kanji */}
      <div
        className="hidden xl:block absolute left-4 top-36 select-none pointer-events-none opacity-15"
        aria-hidden="true"
      >
        <span className="writing-vertical-rl font-serif text-5xl tracking-[0.5em] text-[#263B50]">
          実地
        </span>
      </div>

      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="font-serif text-sm tracking-[0.3em] text-[#B4473F] font-semibold">
            {t.japaneseTitle}
          </span>
          <span className="h-px w-8 bg-[#D9D5CC]" />
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#66645F]">
            {t.englishTitle}
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1C1C] font-normal tracking-tight mb-4">
          {language === 'ja' ? '大阪ゴルフクラブ実習・日本生活' : data.title}
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#66645F] max-w-2xl mx-auto leading-relaxed mb-6">
          {t.subtitle}
        </p>

        <div className="inline-flex items-center justify-center gap-3 text-xs font-sans tracking-[0.2em] uppercase text-[#263B50] bg-[#EFEBE3]/80 px-4 py-2 rounded-[2px] border border-[#D9D5CC]">
          <Flag className="w-3.5 h-3.5 text-[#B4473F]" />
          <span>
            {language === 'ja'
              ? '国際キャディ実習 · 関西での日常体験'
              : 'Professional Caddy Internship · Kansai Daily Immersion'}
          </span>
          <HankoSeal size="sm" className="ml-1" />
        </div>
      </motion.div>

      {/* CULTURAL ROUTE MOTIF */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-serif text-[#263B50] tracking-[0.15em] sm:tracking-[0.25em] uppercase mb-12 sm:mb-16 select-none max-w-full px-2"
      >
        <span className="px-2.5 sm:px-3 py-1 bg-white border border-[#D9D5CC] rounded-[2px] shadow-2xs whitespace-nowrap">
          {language === 'ja' ? 'パプア州ビアク' : 'BIAK, PAPUA'}
        </span>
        <span className="text-[#B4473F] font-bold select-none text-xs">→</span>
        <span className="px-2.5 sm:px-3 py-1 bg-white border border-[#D9D5CC] rounded-[2px] shadow-2xs whitespace-nowrap">
          {language === 'ja' ? 'ジャカルタ' : 'JAKARTA'}
        </span>
        <span className="text-[#B4473F] font-bold select-none text-xs">→</span>
        <span className="px-2.5 sm:px-3 py-1 bg-white border border-[#D9D5CC] rounded-[2px] shadow-2xs whitespace-nowrap">
          {language === 'ja' ? 'バンドン' : 'BANDUNG'}
        </span>
        <span className="text-[#B4473F] font-bold select-none text-xs">→</span>
        <span className="px-3 sm:px-3.5 py-1 bg-[#263B50] text-[#F7F5F0] rounded-[2px] font-semibold shadow-xs whitespace-nowrap">
          {language === 'ja' ? '日本・大阪' : 'OSAKA, JAPAN'}
        </span>
      </motion.div>

      {/* METRIC / FACT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {facts.map((fact, idx) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-5 bg-white border border-[#D9D5CC] rounded-[2px] shadow-xs flex flex-col justify-between"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#66645F] mb-1">
              {fact.label}
            </span>
            <p className="font-serif text-lg text-[#1C1C1C] font-medium leading-snug">
              {fact.value}
            </p>
            <span className="text-[11px] font-sans text-[#263B50] mt-2 block">
              {fact.sub}
            </span>
          </motion.div>
        ))}
      </div>

      {/* HERO IMAGE BANNER */}
      <div className="mb-24 space-y-4">
        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-w-4xl mx-auto bg-[#1C1C1C] border-2 border-[#263B50]/30 rounded-[2px] overflow-hidden shadow-md">
          {heroImageSrc ? (
            <img
              src={heroImageSrc}
              alt="Osaka Golf Club Caddy Team"
              style={{ objectPosition: 'center 85%' }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#F7F5F0] to-[#EFEBE3]">
              <Flag className="w-10 h-10 text-[#B4473F] mb-3" />
              <span className="font-serif tracking-[0.25em] text-sm uppercase text-[#263B50] font-semibold">
                OSAKA GOLF CLUB
              </span>
            </div>
          )}

          {/* Floating Badges on Hero Image */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 pointer-events-none">
            <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[#263B50]/90 backdrop-blur-md border border-white/20 text-[9px] sm:text-xs uppercase font-sans tracking-wider sm:tracking-widest text-[#F7F5F0] rounded-[2px] shadow-sm">
              {language === 'ja' ? '大阪ゴルフクラブ · キャディ課' : 'OSAKA GOLF CLUB · CADDY DIVISION'}
            </span>
          </div>

          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-10 pointer-events-none">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#F7F5F0]/95 backdrop-blur-sm border border-[#D9D5CC] text-[9px] sm:text-[10px] uppercase font-mono tracking-wider sm:tracking-widest text-[#263B50] rounded-[2px]">
              {language === 'ja' ? '大阪府岬町 · 2025-2026年' : 'MISAKI, OSAKA · 2025-2026'}
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-xs sm:text-sm text-[#66645F] font-sans text-right italic pr-2">
          {language === 'ja'
            ? '大阪ゴルフクラブにて：大阪湾を望む美しいコースで、先輩キャディ指導員や仲間たちと共に迎えた笑顔の記念撮影。'
            : data.heroCaption}
        </p>
      </div>

      {/* DUAL PILLARS: 1. CADDY OPERATIONS VS 2. DAILY LIFE IN JAPAN */}
      <div className="mb-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-serif text-xs tracking-[0.25em] text-[#B4473F] uppercase font-semibold">
            {language === 'ja' ? '2大実習の柱：現場実務と生活体験' : 'TWO CORE PILLARS OF EXPERIENCE'}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-normal mt-1">
            {language === 'ja' ? 'キャディとしてのプロ意識と日本での生活' : 'Caddy Professionalism & Daily Immersion'}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-[#66645F] mt-2">
            {language === 'ja'
              ? '名門ゴルフ場での本格的な実地研修と、関西社会での自立した日常生活'
              : 'Rigorous fairway caddy operations balanced with independent cultural living across Japan.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PILLAR 1: CADDY AT OSAKA GOLF CLUB */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.25 } }}
            className="bg-[#FFFFFF] border-2 border-[#263B50]/20 rounded-[2px] p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-[#D9D5CC] pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-serif tracking-widest text-[#B4473F] font-semibold uppercase mb-1">
                    <Flag className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ja' ? '第1の柱 · キャディ専門実務' : 'PILLAR 01 · PROFESSIONAL CADDY'}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-[#1C1C1C] font-medium">
                    {t.caddyPillarTitle}
                  </h4>
                  <p className="text-xs font-sans text-[#66645F] mt-1">
                    {t.caddyPillarSubtitle}
                  </p>
                </div>
                <HankoSeal size="sm" text="実" />
              </div>

              {/* Responsibilities Grid */}
              <div className="space-y-4">
                {caddyDuties.map((duty, idx) => (
                  <div key={duty.title} className="flex items-start gap-3 text-left">
                    <span className="w-5 h-5 rounded-full bg-[#263B50]/10 text-[#263B50] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-serif text-sm font-semibold text-[#1C1C1C]">
                          {duty.title}
                        </span>
                        <span className="text-[11px] font-serif text-[#B4473F]">
                          {duty.sub}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#66645F] leading-relaxed">
                        {duty.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D9D5CC]/60 flex items-center justify-between text-[11px] font-mono text-[#263B50]">
              <span>OSAKA GOLF CLUB</span>
              <span className="font-serif text-xs text-[#B4473F]">
                {language === 'ja' ? '18ホール シーサイドコース' : '18 HOLES SEASIDE LINKS'}
              </span>
            </div>
          </motion.div>

          {/* PILLAR 2: DAILY LIFE IN JAPAN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -5, transition: { duration: 0.25 } }}
            className="bg-[#FFFFFF] border-2 border-[#B4473F]/20 rounded-[2px] p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-[#D9D5CC] pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-serif tracking-widest text-[#263B50] font-semibold uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ja' ? '第2の柱 · 日本社会・文化体験' : 'PILLAR 02 · CULTURAL IMMERSION'}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-[#1C1C1C] font-medium">
                    {t.dailyPillarTitle}
                  </h4>
                  <p className="text-xs font-sans text-[#66645F] mt-1">
                    {t.dailyPillarSubtitle}
                  </p>
                </div>
                <HankoSeal size="sm" text="生" />
              </div>

              {/* Aspects Grid */}
              <div className="space-y-4">
                {dailyLifeAspects.map((aspect, idx) => (
                  <div key={aspect.title} className="flex items-start gap-3 text-left">
                    <span className="w-5 h-5 rounded-full bg-[#B4473F]/10 text-[#B4473F] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-serif text-sm font-semibold text-[#1C1C1C]">
                          {aspect.title}
                        </span>
                        <span className="text-[11px] font-serif text-[#263B50]">
                          {aspect.sub}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#66645F] leading-relaxed">
                        {aspect.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D9D5CC]/60 flex items-center justify-between text-[11px] font-mono text-[#B4473F]">
              <span>{language === 'ja' ? '関西圏での生活' : 'KANSAI CULTURAL LIFE'}</span>
              <span className="font-serif text-xs text-[#263B50]">OSAKA · KOBE · HYOGO</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STORY & NARRATIVE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* LEFT: Large editorial heading */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B4473F]" />
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#66645F]">
              {language === 'ja' ? '実習ストーリー' : 'INTERNSHIP NARRATIVE'}
            </span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1C1C] font-normal leading-tight">
            {narrativeHeadline}
          </h3>
          <p className="text-sm font-sans text-[#263B50] font-medium tracking-wide">
            {language === 'ja'
              ? '関西圏での実務・生活・日本語コミュニケーションの実践'
              : 'Living, working, and practicing Japanese across Kansai'}
          </p>
          <div className="pt-2">
            <span className="text-xs font-serif text-[#66645F] italic block">
              {language === 'ja'
                ? '「ゴルフ場での毎日は、言葉にされない相手の真意を察する本物のおもてなしを教えてくれました。」'
                : '"Working on the course taught me that true Omotenashi begins with observing what goes unsaid."'}
            </span>
          </div>
        </motion.div>

        {/* RIGHT: Narrative intro + Tabbed content blocks */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          <p className="font-sans text-base sm:text-lg text-[#1C1C1C] leading-relaxed">
            {narrativeIntro}
          </p>

          {/* Structured Content Tabs */}
          <div className="border border-[#D9D5CC] rounded-[2px] bg-[#FFFFFF] overflow-hidden shadow-sm">
            {/* Nav Tabs */}
            <div className="flex border-b border-[#D9D5CC] bg-[#EFEBE3]/60">
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setNarrativeTab('experience')}
                className={`flex-1 py-2.5 sm:py-3 px-1.5 sm:px-3 text-[10px] sm:text-xs font-sans uppercase tracking-normal sm:tracking-wider transition-colors cursor-pointer text-center ${
                  narrativeTab === 'experience'
                    ? 'bg-[#FFFFFF] text-[#263B50] font-semibold border-b-2 border-[#B4473F]'
                    : 'text-[#66645F] hover:text-[#1C1C1C]'
                }`}
              >
                {t.tabExperience}
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setNarrativeTab('learning')}
                className={`flex-1 py-2.5 sm:py-3 px-1.5 sm:px-3 text-[10px] sm:text-xs font-sans uppercase tracking-normal sm:tracking-wider transition-colors cursor-pointer text-center ${
                  narrativeTab === 'learning'
                    ? 'bg-[#FFFFFF] text-[#263B50] font-semibold border-b-2 border-[#B4473F]'
                    : 'text-[#66645F] hover:text-[#1C1C1C]'
                }`}
              >
                {t.tabLearning}
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setNarrativeTab('reflection')}
                className={`flex-1 py-2.5 sm:py-3 px-1.5 sm:px-3 text-[10px] sm:text-xs font-sans uppercase tracking-normal sm:tracking-wider transition-colors cursor-pointer text-center ${
                  narrativeTab === 'reflection'
                    ? 'bg-[#FFFFFF] text-[#263B50] font-semibold border-b-2 border-[#B4473F]'
                    : 'text-[#66645F] hover:text-[#1C1C1C]'
                }`}
              >
                {t.tabReflection}
              </motion.button>
            </div>

            {/* Tab Body with AnimatePresence */}
            <div className="p-6 sm:p-8 min-h-[170px]">
              <AnimatePresence mode="wait">
                {narrativeTab === 'experience' && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#B4473F]">
                      <Compass className="w-4 h-4" />
                      <span>
                        {language === 'ja' ? 'キャディ業務と日々のルーティン' : 'Caddy Operations & Daily Routine'}
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#1C1C1C] leading-relaxed">
                      {narrativeExperience}
                    </p>
                  </motion.div>
                )}

                {narrativeTab === 'learning' && (
                  <motion.div
                    key="learning"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#263B50]">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {language === 'ja' ? '現場のスポーツ敬語とおもてなし' : 'Sports Keigo & Omotenashi Standard'}
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#1C1C1C] leading-relaxed">
                      {narrativeLearning}
                    </p>
                  </motion.div>
                )}

                {narrativeTab === 'reflection' && (
                  <motion.div
                    key="reflection"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#B4473F]">
                      <Award className="w-4 h-4" />
                      <span>
                        {language === 'ja' ? '異文化理解と自己の精神的成長' : 'Intercultural Perspective & Personal Growth'}
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#1C1C1C] leading-relaxed">
                      {narrativeReflection}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PHOTO JOURNAL: INTERACTIVE GALLERY WITH CATEGORY FILTERS */}
      <div className="mb-24">
        <InternshipGallery gallery={data.gallery} />
      </div>

      {/* VIDEO SHOWCASE */}
      <VideoShowcase videoData={data.video} />
    </section>
  );
};
