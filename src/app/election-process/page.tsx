"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CalendarDays, FileText, Users, Vote, PartyPopper, Info, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

export default function ElectionProcessPage() {
  const { t } = useTranslation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = useMemo(() => [
    {
      id: "announcement",
      title: `1. ${t("step1_title")}`,
      icon: CalendarDays,
      desc: t("step1_desc"),
      bullets: [
        t("step1_bullet1"),
        t("step1_bullet2"),
        t("step1_bullet3")
      ],
      image: "/images/vote_counting.jpg",
      alt: t("step1_title")
    },
    {
      id: "nomination",
      title: `2. ${t("step2_title")}`,
      icon: FileText,
      desc: t("step2_desc"),
      bullets: [
        t("step2_bullet1"),
        t("step2_bullet2"),
        t("step2_bullet3")
      ],
      image: "/images/ballot_box.jpg",
      alt: t("step2_title")
    },
    {
      id: "campaign",
      title: `3. ${t("step3_title")}`,
      icon: Users,
      desc: t("step3_desc"),
      bullets: [
        t("step3_bullet1"),
        t("step3_bullet2"),
        t("step3_bullet3"),
        t("step3_bullet4")
      ],
      image: "/images/tvk-campaign.jpg",
      alt: t("step3_title")
    },
    {
      id: "voting",
      title: `4. ${t("step4_title")}`,
      icon: Vote,
      desc: t("step4_desc"),
      bullets: [
        t("step4_bullet1"),
        t("step4_bullet2"),
        t("step4_bullet3")
      ],
      image: "/images/voting_booth.jpg",
      alt: t("step4_title")
    },
    {
      id: "counting",
      title: `5. ${t("step5_title")}`,
      icon: PartyPopper,
      desc: t("step5_desc"),
      bullets: [
        t("step5_bullet1"),
        t("step5_bullet2"),
        t("step5_bullet3")
      ],
      image: "/images/vote_counting.jpg",
      alt: t("step5_title")
    }
  ], [t]);

  const nextStep = () => {
    if (currentIdx < steps.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentIdx > 0) {
      setCurrentIdx(c => c - 1);
    }
  };

  const setStep = (idx: number) => {
    setCurrentIdx(idx);
    setIsCompleted(false);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("process_title_main")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("process_title_sub")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("process_subtitle")}
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="mb-16 overflow-x-auto pb-12 custom-scrollbar pt-4">
          <div className="flex justify-between items-center min-w-[700px] relative px-8">
            {/* Connecting Line */}
            <div className="absolute top-[22px] left-8 right-8 h-1 bg-secondary rounded-full z-0" />
            <motion.div 
              className="absolute top-[22px] left-8 h-1 bg-primary rounded-full z-0 transition-all duration-500" 
              style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%`, maxWidth: "calc(100% - 64px)" }}
            />
            
            {steps.map((step, i) => {
              const isActive = i === currentIdx;
              const isPast = i < currentIdx;
              const StepIcon = step.icon;
              const stepTitle = step.title.split('. ')[1];
              
              return (
                <button
                  key={step.id}
                  onClick={() => setStep(i)}
                  className="relative z-10 flex flex-col items-center gap-3 group outline-none"
                >
                  {/* Icon Circle */}
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm",
                    isActive ? "bg-primary border-primary/20 text-primary-foreground scale-125 shadow-xl shadow-primary/20" : 
                    isPast ? "bg-primary border-primary text-primary-foreground" : 
                    "bg-card border-border text-muted-foreground hover:border-primary/50"
                  )}>
                    {isPast ? <CheckCircle2 size={20} /> : <StepIcon size={20} />}
                  </div>

                  {/* Label Container - Absolute to avoid shifting, but with enough container padding */}
                  <div className="absolute top-14 flex flex-col items-center gap-0.5">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tighter opacity-50",
                      isActive ? "text-primary opacity-100" : isPast ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {t("step_prefix")} {i + 1}
                    </span>
                    <span className={cn(
                      "text-xs font-bold whitespace-nowrap transition-all duration-300",
                      isActive ? "text-primary text-sm" : isPast ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {stepTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="glass-card rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0"
              >
                {/* Image Section */}
                <div className="relative h-64 lg:h-auto min-h-[400px] bg-secondary/50 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 5, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={steps[currentIdx].image}
                        alt={steps[currentIdx].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Text Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold w-fit mb-6">
                    {(() => {
                      const StepIcon = steps[currentIdx].icon;
                      return <StepIcon size={16} />;
                    })()} {t("stage_prefix")} {currentIdx + 1} {t("of")} 5
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{steps[currentIdx].title.split('. ')[1]}</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {steps[currentIdx].desc}
                  </p>

                  <div className="space-y-4 mb-10 flex-1">
                    {steps[currentIdx].bullets.map((bullet, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        key={i} 
                        className="flex items-start gap-3 bg-secondary/30 p-4 rounded-xl border border-border/50"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="font-medium text-foreground/90">{bullet}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Buttons inside content area */}
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <button
                      onClick={prevStep}
                      disabled={currentIdx === 0}
                      className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-0 disabled:cursor-default"
                    >
                      <ChevronLeft size={20} /> {t("back")}
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 flex items-center gap-2 shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
                    >
                      {currentIdx === steps.length - 1 ? t("finish_guide") : t("next_step")} <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 md:p-20 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border-4 border-green-500/20">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-bold mb-4">{t("process_completed_title")}</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
                  {t("process_completed_desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/candidates" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-xl shadow-primary/20">
                    {t("nav_candidates")}
                  </Link>
                  <button onClick={() => setStep(0)} className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all">
                    {t("review_process")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Special Info Sections */}
        {!isCompleted && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-1000 delay-500 fill-mode-both">
            {/* EVM Box */}
            <div className="glass-card p-8 rounded-3xl border border-primary/20 shadow-lg relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="text-primary" /> {t("evm_works_title")}
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-32 h-32 relative rounded-2xl overflow-hidden shrink-0 border-2 border-border shadow-sm">
                  <img src="/images/evm_machine.jpg" alt="EVM" className="w-full h-full object-cover" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t("evm_works_desc")}
                </p>
              </div>
            </div>

            {/* Old vs New Box */}
            <div className="glass-card p-8 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CalendarDays className="text-primary" /> {t("evolution_voting_title")}
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-32 h-32 relative rounded-2xl overflow-hidden shrink-0 border-2 border-border shadow-sm grayscale opacity-80">
                  <img src="/images/ballot_box.jpg" alt="Ballot Box" className="w-full h-full object-cover" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t("evolution_voting_desc")}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
