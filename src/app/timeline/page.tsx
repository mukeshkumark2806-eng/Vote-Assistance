"use client";

import { motion } from "framer-motion";
import { mockTimelines } from "@/lib/mock-db";
import { Clock } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function TimelinePage() {
  const { t } = useTranslation();

  const getDaysLeft = (dateString: string) => {
    const target = new Date(dateString).getTime();
    const now = new Date("2026-03-01").getTime(); 
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} ${t("days_left")}` : t("past_event");
  };

  const localizedEvents: Record<string, { event: string, description: string }> = {
    "t1": { event: t("event_notification"), description: t("desc_notification") },
    "t2": { event: t("event_nominations"), description: t("desc_nominations") },
    "t3": { event: t("event_campaigning"), description: t("desc_campaigning") },
    "t4": { event: t("event_voting"), description: t("desc_voting") },
    "t5": { event: t("event_counting"), description: t("desc_counting") },
  };

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-4xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("timeline_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("timeline_subtitle")}</p>
      </div>

      <div className="grid gap-6">
        {mockTimelines.map((item, i) => {
          const content = localizedEvents[item.id] || { event: item.event, description: item.description };
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass-card p-6 rounded-3xl border border-border/50 flex flex-col md:flex-row md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="bg-primary/10 text-primary px-6 py-4 rounded-2xl text-center shrink-0 min-w-[160px] flex flex-col justify-center">
                <div className="text-sm font-bold uppercase tracking-widest">{new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</div>
                <div className="text-4xl font-black">{new Date(item.date).getDate()}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{content.event}</h2>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold whitespace-nowrap">
                    <Clock size={14} /> {getDaysLeft(item.date)}
                  </div>
                </div>
                <p className="text-muted-foreground text-lg">{content.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
