"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow blur-[120px] rounded-full opacity-20 dark:opacity-30 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border/50 shadow-sm"
        >
          <Sparkles size={16} className="text-primary" />
          <span>{t("hero_badge")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]"
        >
          {t("hero_title_1")} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent-foreground">
            {t("hero_title_2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          {t("hero_desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/ai-assistant"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {t("ask_ai")} <ArrowRight size={20} />
          </Link>
          <Link
            href="/eligibility"
            className="w-full sm:w-auto px-8 py-4 bg-card text-card-foreground font-semibold rounded-full hover:bg-secondary border border-border transition-all flex items-center justify-center gap-2"
          >
            <MapPin size={20} className="text-muted-foreground" /> {t("check_eligibility")}
          </Link>
        </motion.div>
        
        {/* Mock Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: t("stat_active_voters"), value: "2.4M+" },
            { label: t("stat_ai_queries"), value: "15M+" },
            { label: t("stat_candidates"), value: "850+" },
            { label: t("stat_regions"), value: "42" },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
