"use client";

import { Eye, Type, Contrast } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function AccessibilityPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-3xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("accessibility_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("accessibility_subtitle")}</p>
      </div>

      <div className="grid gap-6">
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/50 flex items-start gap-6">
          <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0"><Contrast size={24} /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">{t("contrast_title")}</h3>
            <p className="text-muted-foreground">{t("contrast_desc")}</p>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/50 flex items-start gap-6">
          <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0"><Type size={24} /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">{t("typography_title")}</h3>
            <p className="text-muted-foreground">{t("typography_desc")}</p>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl border border-border/50 flex items-start gap-6">
          <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0"><Eye size={24} /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">{t("screen_reader_title")}</h3>
            <p className="text-muted-foreground">{t("screen_reader_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
