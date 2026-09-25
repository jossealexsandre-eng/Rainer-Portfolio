import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteLanguage } from '../types';
import { translations, Translations } from '../data/translations';

interface LanguageContextValue {
  language: SiteLanguage;
  setLanguage: (lang: SiteLanguage) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: translations['en'],
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SiteLanguage>('en');

  useEffect(() => {
    const saved = localStorage.getItem('rjy-language') as SiteLanguage;
    if (saved && ['ja', 'en'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: SiteLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('rjy-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
