"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function MythsFactsPage() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const myths = useMemo(() => [
    { myth: t("myth1_q"), fact: t("myth1_a") },
    { myth: t("myth2_q"), fact: t("myth2_a") },
    { myth: t("myth3_q"), fact: t("myth3_a") },
    { myth: t("myth4_q"), fact: t("myth4_a") }
  ], [t]);

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-3xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("myth_fact_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("myth_fact_desc")}</p>
      </div>

      <div className="space-y-4">
        {myths.map((item, i) => (
          <div key={i} className="glass-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <XCircle className="text-red-500 shrink-0" size={28} />
                <span className="font-bold text-lg">{t("myth_label")}: {item.myth}</span>
              </div>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="bg-green-500/10 border-t border-border/50 overflow-hidden"
                >
                  <div className="p-6 flex items-start gap-4">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={24} />
                    <div>
                      <span className="font-bold text-green-700 dark:text-green-400 block mb-1">{t("fact_label")}:</span>
                      <p className="text-foreground/90 leading-relaxed">{item.fact}</p>
                    </div>
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
