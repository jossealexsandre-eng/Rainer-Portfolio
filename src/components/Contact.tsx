import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin, FileDown, Send, CheckCircle2, MessageCircle, ArrowUpRight } from 'lucide-react';
import { PortfolioData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  contactData: PortfolioData['contact'];
  onOpenCvModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({
  contactData,
  onOpenCvModal,
}) => {
  const { language, t: fullT } = useLanguage();
  const t = fullT.contact;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const whatsappMessage = encodeURIComponent(
    language === 'ja'
      ? 'こんにちは、ライナーさん。ポートフォリオを拝見し、ご連絡いたしました。'
      : 'Hello Rainer, I saw your portfolio and would like to connect with you.'
  );

  const whatsappUrl = `https://wa.me/${contactData.whatsappNumber}?text=${whatsappMessage}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]"
    >
      {/* CONTACT HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-16"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="font-serif text-sm tracking-[0.25em] text-[#B4473F] font-semibold">
            {language === 'ja' ? t.japaneseTitle : t.englishTitle}
          </span>
          <span className="h-px w-8 bg-[#D9D5CC]" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#66645F]">
            {t.tag}
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] font-normal tracking-tight mb-4">
          {t.heading}
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#66645F] leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT COLUMN: Channels & CV Download */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          {/* PROMINENT WHATSAPP QUICK CHAT CARD */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 bg-[#EFEBE3] border-2 border-[#263B50]/30 rounded-[2px] shadow-sm space-y-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#263B50]">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span className="font-serif text-sm uppercase tracking-wider font-semibold">
                  {t.whatsappTitle}
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#25D366]/20 text-[#128C7E] rounded-[2px]">
                {t.fastResponseBadge}
              </span>
            </div>

            <p className="text-xs font-sans text-[#66645F] leading-relaxed">
              {t.whatsappPrompt}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-sm text-[#1C1C1C] font-medium">
                {contactData.whatsappDisplay}
              </span>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans font-medium uppercase tracking-wider rounded-[2px] transition-colors shadow-sm cursor-pointer"
              >
                <span>{t.chatWhatsapp}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>

          <div className="space-y-4">
            {/* Email */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 bg-[#EFEBE3]/50 border border-[#D9D5CC] hover:border-[#263B50]/40 rounded-[2px] hover:bg-[#FFFFFF] transition-all shadow-xs hover:shadow-sm"
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] font-sans text-[#66645F] mb-1">
                {t.emailLabel}
              </span>
              <a
                href={`mailto:${contactData.email}`}
                className="font-serif text-base sm:text-lg text-[#1C1C1C] hover:text-[#263B50] flex items-center justify-between group"
              >
                <span>{contactData.email}</span>
                <Mail className="w-4 h-4 text-[#263B50]/60 group-hover:text-[#263B50] transition-colors" />
              </a>
            </motion.div>

            {/* Instagram */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 bg-[#EFEBE3]/50 border border-[#D9D5CC] hover:border-[#263B50]/40 rounded-[2px] hover:bg-[#FFFFFF] transition-all shadow-xs hover:shadow-sm"
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] font-sans text-[#66645F] mb-1">
                {t.instagramLabel}
              </span>
              <a
                href={`https://instagram.com/${contactData.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-base sm:text-lg text-[#1C1C1C] hover:text-[#263B50] flex items-center justify-between group"
              >
                <span>{contactData.instagram}</span>
                <Instagram className="w-4 h-4 text-[#263B50]/60 group-hover:text-[#263B50] transition-colors" />
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 bg-[#EFEBE3]/50 border border-[#D9D5CC] hover:border-[#263B50]/40 rounded-[2px] hover:bg-[#FFFFFF] transition-all shadow-xs hover:shadow-sm"
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] font-sans text-[#66645F] mb-1">
                {t.linkedinLabel}
              </span>
              <a
                href={`https://${contactData.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-base sm:text-lg text-[#1C1C1C] hover:text-[#263B50] flex items-center justify-between group truncate"
              >
                <span className="truncate">{contactData.linkedin}</span>
                <Linkedin className="w-4 h-4 text-[#263B50]/60 group-hover:text-[#263B50] transition-colors shrink-0 ml-2" />
              </a>
            </motion.div>
          </div>

          {/* DOWNLOAD CV BUTTON */}
          <div className="pt-2 space-y-2">
            <motion.button
              id="download-cv-btn"
              type="button"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCvModal}
              className="w-full py-4 px-6 bg-[#263B50] hover:bg-[#1a2938] text-[#F7F5F0] rounded-[2px] text-xs uppercase tracking-[0.2em] font-sans font-medium flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-[#D8D0C3]" />
              <span>{t.cvButton}</span>
            </motion.button>
            <div className="flex items-center justify-between px-1 text-[11px] font-sans text-[#66645F]">
              <span>{t.cvOfficial}</span>
              <a
                href="/cv-rainer-yawan.pdf"
                download="CV-Rainer-Jackob-Yawan.pdf"
                className="text-[#B4473F] hover:underline font-medium flex items-center gap-1"
              >
                <span>{t.cvDirectPdf}</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Minimalist Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-[#FFFFFF]/80 border border-[#D9D5CC] p-8 sm:p-10 rounded-[2px] shadow-xs"
        >
          <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1C] mb-6">
            {t.sendMessage}
          </h3>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center bg-[#EFEBE3]/60 border border-[#D9D5CC] rounded-[2px] space-y-3"
            >
              <CheckCircle2 className="w-8 h-8 text-[#263B50] mx-auto" />
              <h4 className="font-serif text-lg text-[#1C1C1C]">{t.successTitle}</h4>
              <p className="text-xs text-[#66645F] font-sans">
                {t.successDesc}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-[0.15em] font-sans text-[#66645F]">
                    {t.inputName}
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm font-sans px-3.5 py-2.5 bg-[#F7F5F0]/70 border border-[#D9D5CC] rounded-[2px] focus:outline-none focus:border-[#263B50] focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-[0.15em] font-sans text-[#66645F]">
                    {t.inputEmail}
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm font-sans px-3.5 py-2.5 bg-[#F7F5F0]/70 border border-[#D9D5CC] rounded-[2px] focus:outline-none focus:border-[#263B50] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-[11px] uppercase tracking-[0.15em] font-sans text-[#66645F]">
                  {t.inputSubject}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder={t.inputSubjectPlaceholder}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-sm font-sans px-3.5 py-2.5 bg-[#F7F5F0]/70 border border-[#D9D5CC] rounded-[2px] focus:outline-none focus:border-[#263B50] focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-[0.15em] font-sans text-[#66645F]">
                  {t.inputMessage}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-sm font-sans px-3.5 py-2.5 bg-[#F7F5F0]/70 border border-[#D9D5CC] rounded-[2px] focus:outline-none focus:border-[#263B50] focus:bg-white transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1C1C] hover:bg-[#263B50] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-sans rounded-[2px] transition-colors cursor-pointer"
              >
                <span>{t.sendButton}</span>
                <Send className="w-3.5 h-3.5 text-[#D8D0C3]" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
