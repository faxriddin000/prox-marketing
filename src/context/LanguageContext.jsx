import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('prox_marketing_lang');
      return saved === 'ru' || saved === 'uz' || saved === 'en' ? saved : 'uz';
    } catch {
      return 'uz';
    }
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('prox_marketing_lang', lang);
    } catch (e) {
      console.warn('Could not persist language', e);
    }
  };

  const t = (key) => {
    const langDict = translations[language] || translations.uz;
    return langDict[key] || translations.uz[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
