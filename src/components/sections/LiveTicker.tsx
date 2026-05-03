"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertCircle } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function LiveTicker() {
  const { t } = useTranslation();

  const newsItems = [
    t("home_news_1"),
    t("home_news_2"),
    t("home_news_3"),
    t("home_news_4"),
    t("home_news_5")
  ];

  return (
    <div className="w-full bg-primary/10 border-y border-primary/20 overflow-hidden py-3 pt-[80px]">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider shrink-0 mr-6 z-10 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full">
          <TrendingUp size={16} className="animate-pulse" />
          {t("home_live_updates")}
        </div>
        
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{ x: [0, -1500] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
            className="flex whitespace-nowrap gap-12 text-sm font-medium"
          >
            {[...newsItems, ...newsItems, ...newsItems].map((news, idx) => (
              <span key={idx} className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors cursor-default">
                <AlertCircle size={14} className="text-primary/70" />
                {news}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
