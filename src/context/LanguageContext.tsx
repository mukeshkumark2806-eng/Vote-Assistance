"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../locales/en.json";
import ta from "../locales/ta.json";
import hi from "../locales/hi.json";
import te from "../locales/te.json";
import kn from "../locales/kn.json";
import ml from "../locales/ml.json";

type Language = "en" | "ta" | "hi" | "te" | "kn" | "ml";

const translations: Record<Language, any> = { en, ta, hi, te, kn, ml };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("vote-wise-lang") as Language;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("vote-wise-lang", lang);
  };

  const t = (key: string): string => {
    // Fallback to English if key missing in current language, then to the key itself
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
