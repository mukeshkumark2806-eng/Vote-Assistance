"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function FirstTimeVoterPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-3xl min-h-screen">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap size={40} className="text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("first_time_voter_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("first_time_voter_desc")}</p>
      </div>

      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-3xl border border-border/50 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="text-primary" /> {t("ftv_step1_title")}</h2>
          <p className="text-muted-foreground mb-4">{t("ftv_step1_desc")}</p>
          <Link href="/register" className="text-primary font-bold hover:underline">{t("ftv_step1_link")}</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 rounded-3xl border border-border/50 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-primary" /> {t("ftv_step2_title")}</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>{t("ftv_rule_1")}</li>
            <li>{t("ftv_rule_2")}</li>
            <li>{t("ftv_rule_3")}</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 rounded-3xl border border-border/50 shadow-sm bg-primary text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">{t("ftv_step3_title")}</h2>
          <p className="mb-6 opacity-90">{t("ftv_step3_desc")}</p>
          <Link href="/candidates" className="px-6 py-3 bg-background text-foreground font-bold rounded-xl hover:bg-background/90 transition-all inline-block">
            {t("ftv_step3_link")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
