"use client";

import { useState, useMemo } from "react";
import { UserPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [checked, setChecked] = useState([false, false, false, false]);

  const toggle = (i: number) => {
    const newC = [...checked];
    newC[i] = !newC[i];
    setChecked(newC);
  };

  const steps = useMemo(() => [
    t("reg_step_1"),
    t("reg_step_2"),
    t("reg_step_3"),
    t("reg_step_4")
  ], [t]);

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-3xl min-h-screen">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserPlus size={40} className="text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("reg_to_vote_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("reg_to_vote_desc")}</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-border/50 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{t("your_checklist")}</h2>
        <div className="space-y-4 mb-8">
          {steps.map((step, i) => (
            <motion.label 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              key={i} 
              className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${checked[i] ? "bg-primary/5 border-primary/30" : "bg-background border-border hover:border-primary/50"}`}
            >
              <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="w-6 h-6 rounded-md accent-primary" />
              <span className={`text-lg font-medium transition-colors ${checked[i] ? "text-muted-foreground line-through" : ""}`}>{step}</span>
            </motion.label>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold text-muted-foreground">{checked.filter(Boolean).length} / 4 {t("completed")}</span>
          <a 
            href="https://voters.eci.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {t("go_to_nvsp")} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
