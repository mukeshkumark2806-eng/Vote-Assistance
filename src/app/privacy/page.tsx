"use client";

import { useTranslation } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-3xl min-h-screen prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-bold mb-8">{t("privacy_title")}</h1>
      <p className="text-muted-foreground mb-8">{t("privacy_last_updated")}</p>
      
      <h3>{t("privacy_sec1_title")}</h3>
      <p>{t("privacy_sec1_desc")}</p>
      
      <h3>{t("privacy_sec2_title")}</h3>
      <p>{t("privacy_sec2_desc")}</p>
      
      <h3>{t("privacy_sec3_title")}</h3>
      <p>{t("privacy_sec3_desc")}</p>
      
      <h3>{t("privacy_sec4_title")}</h3>
      <p>{t("privacy_sec4_desc")}</p>
    </div>
  );
}
