"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  IdCard, CheckCircle2, ArrowRight, ExternalLink, 
  FileText, UserCheck, Image as ImageIcon, Search 
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function VoterIdPage() {
  const { t } = useTranslation();
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false]);

  const toggleStep = (idx: number) => {
    const newSteps = [...completedSteps];
    newSteps[idx] = !newSteps[idx];
    setCompletedSteps(newSteps);
  };

  const steps = [
    {
      title: t("voter_id_step1_title") || "1. Visit the NVSP Portal",
      desc: t("voter_id_step1_desc") || "Go to the official Voters' Service Portal (voters.eci.gov.in) which is the single window for all voter services.",
      icon: ExternalLink
    },
    {
      title: t("voter_id_step2_title") || "2. Fill Form 6",
      desc: t("voter_id_step2_desc") || "Register as a new voter by filling out Form 6. You will need to provide personal details and your constituency.",
      icon: FileText
    },
    {
      title: t("voter_id_step3_title") || "3. Upload Documents",
      desc: t("voter_id_step3_desc") || "You need to upload: 1. A recent passport-size photo, 2. Age Proof (Aadhaar/PAN), 3. Address Proof.",
      icon: ImageIcon
    },
    {
      title: t("voter_id_step4_title") || "4. Submit Application",
      desc: t("voter_id_step4_desc") || "Review your details carefully and submit the application. You will receive a reference ID for tracking.",
      icon: UserCheck
    },
    {
      title: t("voter_id_step5_title") || "5. Track Status",
      desc: t("voter_id_step5_desc") || "Use your reference ID on the portal to track your application status until your Voter ID is issued.",
      icon: Search
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5"
          >
            <IdCard size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            {t("voter_id_title") || "Get Your Voter ID"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("voter_id_desc") || "A step-by-step guide to applying for your first Voter ID card in India."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Steps */}
          <div className="md:col-span-2 space-y-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => toggleStep(idx)}
                className={cn(
                  "glass-card p-6 rounded-3xl border transition-all cursor-pointer group",
                  completedSteps[idx] 
                    ? "bg-green-500/5 border-green-500/30" 
                    : "bg-card border-border hover:border-primary/50"
                )}
              >
                <div className="flex gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110",
                    completedSteps[idx] 
                      ? "bg-green-500 text-white border-green-500" 
                      : "bg-secondary text-primary border-border"
                  )}>
                    {completedSteps[idx] ? <CheckCircle2 size={24} /> : <step.icon size={24} />}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-xl font-bold mb-2",
                      completedSteps[idx] ? "text-green-600 dark:text-green-400" : "text-foreground"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar / Checklist Info */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-border bg-primary/5 sticky top-32">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-primary" size={20} />
                {t("your_checklist") || "Your Checklist"}
              </h4>
              <div className="space-y-4 mb-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                      completedSteps[idx] ? "bg-primary border-primary" : "bg-transparent border-border"
                    )}>
                      {completedSteps[idx] && <CheckCircle2 size={12} className="text-primary-foreground" />}
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      completedSteps[idx] ? "text-muted-foreground line-through" : "text-foreground"
                    )}>
                      Step {idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-muted-foreground">Progress</span>
                  <span className="text-sm font-bold">{completedSteps.filter(Boolean).length} / 5</span>
                </div>
                <a 
                  href="https://voters.eci.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                >
                  {t("go_to_nvsp") || "Go to Portal"} <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
