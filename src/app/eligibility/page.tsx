"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, XCircle, HelpCircle, ArrowRight, 
  UserCheck, ShieldCheck, CreditCard, RefreshCcw 
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EligibilityPage() {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id: 0, text: t("q_age"), icon: UserCheck },
    { id: 1, text: t("q_citizen"), icon: ShieldCheck },
    { id: 2, text: t("q_id"), icon: CreditCard },
  ];

  const handleAnswer = (index: number, value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    
    // If all answered, show result
    if (newAnswers.every(a => a !== null)) {
      setShowResult(true);
    }
  };

  const isEligible = answers.every(a => a === true);

  const reset = () => {
    setAnswers([null, null, null]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            {t("eligibility_title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            {t("eligibility_subtitle")}
          </motion.p>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "glass-card p-6 rounded-3xl border transition-all duration-300",
                answers[idx] === true ? "border-green-500/50 bg-green-500/5" : 
                answers[idx] === false ? "border-red-500/50 bg-red-500/5" : 
                "border-border bg-card"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-2xl",
                    answers[idx] === true ? "bg-green-500 text-white" : 
                    answers[idx] === false ? "bg-red-500 text-white" : 
                    "bg-secondary text-primary"
                  )}>
                    <q.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{q.text}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAnswer(idx, true)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2",
                      answers[idx] === true 
                        ? "bg-green-500 text-white shadow-lg shadow-green-500/25 scale-105" 
                        : "bg-secondary text-foreground hover:bg-green-500/10 hover:text-green-500 border border-transparent"
                    )}
                  >
                    {answers[idx] === true && <CheckCircle2 size={18} />}
                    {t("guide_yes")}
                  </button>
                  <button
                    onClick={() => handleAnswer(idx, false)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2",
                      answers[idx] === false 
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/25 scale-105" 
                        : "bg-secondary text-foreground hover:bg-red-500/10 hover:text-red-500 border border-transparent"
                    )}
                  >
                    {answers[idx] === false && <XCircle size={18} />}
                    {t("guide_no")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="mt-12"
            >
              <div className={cn(
                "p-10 rounded-[3rem] text-center border-2 shadow-2xl relative overflow-hidden",
                isEligible 
                  ? "border-green-500/30 bg-green-500/5" 
                  : "border-red-500/30 bg-red-500/5"
              )}>
                {/* Result Icon */}
                <div className={cn(
                  "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl border-4 border-background",
                  isEligible ? "bg-green-500 text-white" : "bg-red-500 text-white"
                )}>
                  {isEligible ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                </div>

                <h2 className="text-4xl font-bold mb-4">
                  {isEligible ? t("eligible_result") : t("not_eligible_result")}
                </h2>

                <div className="max-w-xl mx-auto space-y-8">
                  <div className="p-6 bg-card/50 rounded-2xl border border-border text-left">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <HelpCircle size={18} className="text-primary" />
                      {t("why_explanation")}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("why_text")}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4">{t("next_steps")}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <Link 
                        href="/register" 
                        className="p-4 bg-primary text-primary-foreground rounded-2xl flex items-center justify-between group"
                      >
                        <span className="font-bold">{t("step_register")}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link 
                        href="/voter-id" 
                        className="p-4 bg-secondary text-foreground rounded-2xl flex items-center justify-between group border border-border"
                      >
                        <span className="font-bold">{t("step_voter_id")}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <button 
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    <RefreshCcw size={18} /> {t("guide_restart")}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
