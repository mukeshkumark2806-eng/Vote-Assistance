"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", name: "English", label: "English" },
  { code: "ta", name: "Tamil", label: "தமிழ்" },
  { code: "hi", name: "Hindi", label: "हिन्दी" },
  { code: "te", name: "Telugu", label: "తెలుగు" },
  { code: "kn", name: "Kannada", label: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", label: "മലയാളം" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        aria-label={t("select_language")}
      >
        <Globe size={16} className="text-primary" />
        <span className="text-sm font-medium hidden md:inline-block">{currentLang.label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                  language === lang.code ? "text-primary bg-primary/5" : "text-gray-400"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{lang.label}</span>
                  <span className="text-[10px] opacity-50 uppercase tracking-wider">{lang.name}</span>
                </div>
                {language === lang.code && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
