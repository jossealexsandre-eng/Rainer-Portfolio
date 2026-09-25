import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Upload } from 'lucide-react';
import { PortfolioData, SiteLanguage } from '../types';

interface PersonalInterestProps {
  data: PortfolioData['personalInterest'];
  language?: SiteLanguage;
}

export const PersonalInterest: React.FC<PersonalInterestProps> = ({ data, language = 'id' }) => {
  const [futsalImage, setFutsalImage] = useState<string>(data.imageUrl || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFutsalImage(URL.createObjectURL(file));
    }
  };

  return (
    <section
      id="interests"
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]"
    >
      <SectionHeading
        japaneseTitle="好きなこと"
        englishTitle="PERSONAL INTEREST"
        subtitle="Activities that bring balance, discipline, and energy beyond academic studies."
      />

      {/* Editorial Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#EFEBE3]/60 border border-[#D9D5CC] rounded-[2px] p-6 sm:p-10">
        {/* LEFT: Image Frame / Sophisticated Placeholder */}
        <div className="lg:col-span-6 relative aspect-[16/10] bg-[#F7F5F0] border border-[#D9D5CC] rounded-[2px] overflow-hidden flex items-center justify-center text-center p-6 group">
          {futsalImage ? (
            <img
              src={futsalImage}
              alt="Futsal interest"
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-102 transition-transform duration-700"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 p-4">
              <div className="w-12 h-12 rounded-full border border-[#D9D5CC] flex items-center justify-center text-[#263B50]">
                <span className="font-serif text-lg">蹴球 </span>
              </div>
              <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#263B50] font-semibold">
                FUTSAL PHOTOGRAPH
              </span>
              <p className="text-xs text-[#66645F] font-sans max-w-xs">
                Replace with sports / match action photo
              </p>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D9D5CC] rounded-[2px] text-[11px] text-[#263B50] hover:bg-[#EFEBE3] transition-colors">
                <Upload className="w-3 h-3" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}
        </div>

        {/* RIGHT: Text Reflection */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#B4473F] font-semibold">
              SPORT & DISCIPLINE
            </span>
            <span className="h-px w-6 bg-[#D9D5CC]" />
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C]">
            {data.topic}
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#1C1C1C] leading-relaxed">
            {data.description}
          </p>

          <p className="font-sans text-xs text-[#66645F] italic pt-2 border-t border-[#D9D5CC]/80">
            "Teamwork, quick tactical anticipation, and staying grounded under pressure."
          </p>
        </div>
      </div>
    </section>
  );
};
