import React, { useState, useEffect } from 'react';
import { X, Printer, Download, FileText, ExternalLink } from 'lucide-react';
import { HankoSeal } from './HankoSeal';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, data }) => {
  const { language, t: fullT } = useLanguage();
  const t = fullT.cvModal;
  const [activeTab, setActiveTab] = useState<'document' | 'interactive'>('document');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const displayName = language === 'ja' ? 'ライナー・ジャコブ・ヤワン' : data.profile.fullName;
  const displayTitle = language === 'ja' ? '日本文学専攻 学士課程在学' : data.profile.title;
  const displayUni = language === 'ja' ? 'マラナタキリスト教大学' : data.profile.university;
  const displayStatement = language === 'ja'
    ? '「言語は単なる伝達手段ではありません。人と場所、そして文化の本質を深く理解するための鍵です。」'
    : data.profile.personalStatement;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1C1C]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-6 bg-[#F7F5F0] border-2 border-[#263B50] rounded-[2px] shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-[#D9D5CC] bg-[#EFEBE3] gap-3">
          <div className="flex items-center gap-3">
            <HankoSeal size="sm" />
            <div>
              <span className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1C1C1C] block">
                {t.title}
              </span>
              <span className="text-[10px] text-[#66645F] font-sans">
                {t.verifiedDocument}
              </span>
            </div>
          </div>

          {/* Action Buttons: Direct Download PDF, Print, Close */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="/cv-rainer-yawan.pdf"
              download="CV-Rainer-Jackob-Yawan.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B4473F] text-[#F7F5F0] hover:bg-[#963730] rounded-[2px] text-xs font-sans uppercase tracking-wider transition-colors shadow-xs font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadPdf}</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#263B50] text-[#F7F5F0] hover:bg-[#1a2938] rounded-[2px] text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.printButton}</span>
            </button>

            <button
              onClick={onClose}
              aria-label={t.closeButton}
              className="p-2 text-[#66645F] hover:text-[#1C1C1C] rounded-[2px] hover:bg-[#D9D5CC]/50 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (Hidden on print) */}
        <div className="no-print px-6 pt-3 bg-[#EFEBE3]/60 border-b border-[#D9D5CC] flex items-center gap-2">
          <button
            onClick={() => setActiveTab('document')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-sans transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'document'
                ? 'border-[#B4473F] text-[#263B50] font-semibold'
                : 'border-transparent text-[#66645F] hover:text-[#1C1C1C]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.tabDocument}</span>
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-sans transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'interactive'
                ? 'border-[#B4473F] text-[#263B50] font-semibold'
                : 'border-transparent text-[#66645F] hover:text-[#1C1C1C]'
            }`}
          >
            <span>{t.tabInteractive}</span>
          </button>
        </div>

        {/* Tab 1: Authentic CV Document Viewer */}
        {activeTab === 'document' && (
          <div className="p-6 sm:p-8 bg-[#FAF8F5] space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between text-xs text-[#66645F] font-sans pb-2 border-b border-[#D9D5CC]">
              <span className="font-serif text-[#B4473F] font-semibold">
                {t.docTitle}
              </span>
              <a
                href="/cv-rainer-yawan.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#263B50] hover:text-[#B4473F] font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.openNewTab}</span>
              </a>
            </div>

            <div className="relative border border-[#D9D5CC] bg-white rounded shadow-md overflow-hidden max-w-2xl mx-auto group">
              <img
                src="/images/cv-preview.jpg"
                alt="Curriculum Vitae Rainer Jackob Yawan"
                className="w-full h-auto object-contain"
              />
              <div className="p-4 bg-[#EFEBE3]/90 border-t border-[#D9D5CC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="font-mono text-[#66645F]">
                  {t.formatNote}
                </span>
                <a
                  href="/cv-rainer-yawan.pdf"
                  download="CV-Rainer-Jackob-Yawan.pdf"
                  className="px-4 py-1.5 bg-[#263B50] hover:bg-[#1a2938] text-white rounded text-xs uppercase tracking-wider font-sans flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadFull}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Portfolio Editorial Sheet */}
        {activeTab === 'interactive' && (
          <div className="p-8 sm:p-12 space-y-8 bg-[#F7F5F0] text-[#1C1C1C] font-sans max-h-[75vh] overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-[#1C1C1C] pb-6 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 id="cv-modal-title" className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-bold tracking-tight">
                    {displayName}
                  </h1>
                  <HankoSeal size="sm" />
                </div>
                <p className="font-serif text-base text-[#263B50] mt-1">
                  {displayTitle} · {displayUni}
                </p>
              </div>

              <div className="text-right sm:text-right text-xs text-[#66645F] space-y-0.5 font-mono">
                <p>{data.contact.email}</p>
                <p>{data.contact.whatsappDisplay}</p>
                <p>{language === 'ja' ? '日本・大阪府 / インドネシア' : data.contact.location}</p>
                <p>{t.bornNote}</p>
              </div>
            </div>

            {/* Statement */}
            <div className="text-sm text-[#1C1C1C] leading-relaxed italic border-l-2 border-[#B4473F] pl-4">
              {displayStatement}
            </div>

            {/* Work & International Internship Feature */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B4473F] border-b border-[#D9D5CC] pb-1">
                {t.sectionInternship}
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 bg-white border border-[#D9D5CC] rounded-[2px]">
                  <div className="flex justify-between font-serif text-sm font-semibold text-[#1C1C1C]">
                    <span>
                      {language === 'ja'
                        ? '国際キャディ実習生 (OSIP OHM) · 大阪ゴルフクラブ'
                        : 'Internship Osip OHM (Golf Caddy) - Osaka Golf Club'}
                    </span>
                    <span className="text-xs text-[#66645F] font-mono font-normal">2025 - 2026</span>
                  </div>
                  <p className="text-xs text-[#66645F] mt-1">
                    {language === 'ja'
                      ? '関西の名門シーサイドコースにおける現場キャディ実務。起伏に富んだコース案内、スポーツ敬語、乗用カートの安全運行、プレイヤーへのおもてなし接客を担当。'
                      : 'Professional caddy operations at a coastal links course in Kansai, focusing on fairway navigation, sports keigo, and international guest hospitality.'}
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#D9D5CC] rounded-[2px]">
                  <div className="flex justify-between font-serif text-sm font-semibold text-[#1C1C1C]">
                    <span>
                      {language === 'ja'
                        ? '日本語講師・指導員 · Sanusi Pusaka Sunda LPK'
                        : 'Japanese Language Instructor - Sanusi Pusaka Sunda LPK'}
                    </span>
                    <span className="text-xs text-[#66645F] font-mono font-normal">2023</span>
                  </div>
                  <p className="text-xs text-[#66645F] mt-1">
                    {language === 'ja'
                      ? '特定技能・就労準備生を対象に、基礎文法、日常会話、挨拶マナー、日本での職場文化を指導。'
                      : 'Taught grammar, basic conversation, and Japanese workplace etiquette to trainees preparing for employment.'}
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#D9D5CC] rounded-[2px]">
                  <div className="flex justify-between font-serif text-sm font-semibold text-[#1C1C1C]">
                    <span>
                      {language === 'ja'
                        ? '大学公式ツアーガイド · マラナタキリスト教大学'
                        : 'Tour Guide - Maranatha Christian University'}
                    </span>
                    <span className="text-xs text-[#66645F] font-mono font-normal">2023</span>
                  </div>
                  <p className="text-xs text-[#66645F] mt-1">
                    {language === 'ja'
                      ? '国内外の来訪者・学術代表団に対し、学内施設や日本文化ラボの案内および解説を実施。'
                      : 'Guided academic delegations and visitors, introducing university facilities and cultural exhibits.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Education History */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#263B50] border-b border-[#D9D5CC] pb-1">
                {t.sectionEducation}
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-[#1C1C1C]">
                    {language === 'ja' ? 'マラナタキリスト教大学 - 日本文学科' : 'Maranatha Christian University - Japanese Literature'}
                  </span>
                  <span className="text-xs text-[#66645F] font-mono">
                    {language === 'ja' ? '2022年 - 現在 (在学中)' : '2022 - Present'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#1C1C1C]">
                    {language === 'ja' ? 'ジャカルタ・インターナショナル・カレッジ' : 'Jakarta International College'}
                  </span>
                  <span className="text-xs text-[#66645F] font-mono">2021 - 2022</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#1C1C1C]">
                    {language === 'ja' ? 'ビアク第1公立高等学校 (SMA Negeri 1 Biak)' : 'SMA Negeri 1 Biak'}
                  </span>
                  <span className="text-xs text-[#66645F] font-mono">2017 - 2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#1C1C1C]">
                    {language === 'ja' ? 'ビアク第3公立中学校 (SMP Negeri 3 Biak)' : 'SMP Negeri 3 Biak'}
                  </span>
                  <span className="text-xs text-[#66645F] font-mono">2014 - 2017</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#1C1C1C]">
                    {language === 'ja' ? 'ビアク・アル公立小学校 (SD Inpres ARU Biak)' : 'SD Inpres ARU Biak'}
                  </span>
                  <span className="text-xs text-[#66645F] font-mono">2008 - 2014</span>
                </div>
              </div>
            </div>

            {/* Organizational Experience */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#263B50] border-b border-[#D9D5CC] pb-1">
                {t.sectionOrganization}
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>
                    {language === 'ja'
                      ? '日本文学科学年代表 · マラナタキリスト教大学'
                      : 'Japanese Literature Cohort Representative - Maranatha Christian University'}
                  </span>
                  <span className="font-mono text-xs text-[#66645F]">2022 - 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {language === 'ja'
                      ? '文学祭ステージマネージャー · Bungaku'
                      : 'Stage Manager - Bungaku Japanese Literature Festival'}
                  </span>
                  <span className="font-mono text-xs text-[#66645F]">2023, 2024, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {language === 'ja'
                      ? '新入生オリエンテーション副委員長 · Kompaseyo'
                      : 'Vice Chairperson - Kompaseyo Orientation Committee'}
                  </span>
                  <span className="font-mono text-xs text-[#66645F]">2024</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {language === 'ja'
                      ? '体育会ロジスティクス運営部 · Ukor Maranatha'
                      : 'Logistics Division - Ukor Maranatha Sports Committee'}
                  </span>
                  <span className="font-mono text-xs text-[#66645F]">2023, 2024</span>
                </div>
              </div>
            </div>

            {/* Skills & Languages */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#263B50] border-b border-[#D9D5CC] pb-1">
                {t.sectionSkills}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#EFEBE3]/60 border border-[#D9D5CC] space-y-1">
                  <span className="font-semibold text-[#263B50] block">{t.coreCompetencies}</span>
                  <p>{language === 'ja' ? '• ソフトウェア・デジタルツールの円滑な操作' : '• Software & Digital Office Tools Proficiency'}</p>
                  <p>{language === 'ja' ? '• 明確かつ礼儀正しい対人コミュニケーション' : '• Effective Interpersonal & Public Communication'}</p>
                  <p>{language === 'ja' ? '• チームワークと協調性・柔軟な適応力' : '• Cross-Functional Teamwork & Collaboration'}</p>
                </div>
                <div className="p-3 bg-[#EFEBE3]/60 border border-[#D9D5CC] space-y-1">
                  <span className="font-semibold text-[#263B50] block">{t.languageProficiency}</span>
                  <p>{language === 'ja' ? '• インドネシア語（母国語・Native）' : '• Indonesian (Native Proficiency)'}</p>
                  <p>{language === 'ja' ? '• 日本語（JLPT N2認定・ビジネス会話・実務運用）' : '• Japanese (JLPT N2 Certified & Business Keigo)'}</p>
                  <p>{language === 'ja' ? '• 英語（国際コミュニケーション・実務運用）' : '• English (Working & Conversational Competence)'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
