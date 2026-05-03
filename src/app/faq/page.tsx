"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function FAQPage() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = useMemo(() => [
    { q: t("faq1_q"), a: t("faq1_a") },
    { q: t("faq2_q"), a: t("faq2_a") },
    { q: t("faq3_q"), a: t("faq3_a") },
    { q: t("faq4_q"), a: t("faq4_a") }
  ], [t]);

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-3xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("faq_center_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("faq_center_desc")}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-bold text-lg">{faq.q}</span>
              <ChevronDown className={`shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} size={20} />
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border/50 overflow-hidden"
                >
                  <div className="p-6 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
