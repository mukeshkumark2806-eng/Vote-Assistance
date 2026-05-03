"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, CalendarDays, BookOpen, 
  CheckCircle2, Vote, Users, FileText, AlertTriangle, 
  MapPin, Sparkles, RefreshCw, PartyPopper, CheckSquare, IdCard
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockTimelines, mockCandidates } from "@/lib/mock-db";
import dynamic from "next/dynamic";
import { useTranslation } from "@/context/LanguageContext";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

type VoterType = "first-time" | "experienced" | null;

const ALL_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Puducherry"
];

// Helper to calculate days left
const getDaysLeft = (dateString: string, t: any) => {
  const target = new Date(dateString).getTime();
  const now = new Date("2026-03-01").getTime(); // Mock current date before elections
  const diff = target - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} ${t("days_left") || "days left"}` : (t("past_event") || "Past Event");
};

export default function InteractiveGuidePage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  
  // Local State
  const [voterType, setVoterType] = useState<VoterType>(null);
  const [selectedState, setSelectedState] = useState<string>("Tamil Nadu");
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [regChecklist, setRegChecklist] = useState<boolean[]>([false, false, false]);
  const [voteDayChecklist, setVoteDayChecklist] = useState<boolean[]>([false, false, false]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Steps definition
  const steps = useMemo(() => [
    { id: "hero", title: t("nav_guide") },
    { id: "personalization", title: t("guide_customize_title") },
    { id: "eligibility", title: t("guide_eligibility_title") },
    { id: "registration", title: t("guide_reg_title_first") },
    { id: "process", title: t("election_process") },
    { id: "timeline", title: t("nav_process") },
    { id: "candidates", title: t("nav_candidates") },
    { id: "voting_day", title: t("step4_title") },
    { id: "summary", title: t("nav_bookmarks") }, // Or a "Summary" key if available
  ], [t]);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const saved = localStorage.getItem("voteWiseGuideProgress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.currentStepIdx !== undefined) setCurrentStepIdx(data.currentStepIdx);
        if (data.voterType) setVoterType(data.voterType);
        if (data.selectedState) setSelectedState(data.selectedState);
        if (data.isEligible !== undefined) setIsEligible(data.isEligible);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("voteWiseGuideProgress", JSON.stringify({
        currentStepIdx, voterType, selectedState, isEligible
      }));
    }
  }, [currentStepIdx, voterType, selectedState, isEligible, mounted]);

  const nextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStepIdx(c => c + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIdx > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStepIdx(c => c - 1);
    }
  };

  const resetGuide = () => {
    setCurrentStepIdx(0);
    setVoterType(null);
    setIsEligible(null);
    setRegChecklist([false, false, false]);
    setVoteDayChecklist([false, false, false]);
    localStorage.removeItem("voteWiseGuideProgress");
  };

  if (!mounted) return null; // Prevent hydration mismatch

  const renderStepContent = () => {
    switch (steps[currentStepIdx].id) {
      case "hero":
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 min-h-[60vh]">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-primary/30"
            >
              <Vote size={48} className="text-white" />
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                {t("guide_welcome_title_main")} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("guide_welcome_title_accent")}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                {t("guide_welcome_subtitle")}
              </p>
            </motion.div>
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              onClick={nextStep} 
              className="mt-8 px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 flex items-center gap-2 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 group"
            >
              {t("guide_start_btn")} <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        );

      case "personalization":
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t("guide_customize_title")}</h2>
              <p className="text-muted-foreground">{t("guide_customize_desc")}</p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto w-full">
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("guide_voter_type_label")}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setVoterType("first-time")}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all",
                      voterType === "first-time" ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <BookOpen size={28} className={voterType === "first-time" ? "text-primary" : "text-muted-foreground"} />
                    <h3 className="text-xl font-bold mt-4 mb-1">{t("guide_voter_first_time")}</h3>
                    <p className="text-sm text-muted-foreground">{t("guide_voter_first_time_desc")}</p>
                  </button>
                  <button
                    onClick={() => setVoterType("experienced")}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all",
                      voterType === "experienced" ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <Vote size={28} className={voterType === "experienced" ? "text-primary" : "text-muted-foreground"} />
                    <h3 className="text-xl font-bold mt-4 mb-1">{t("guide_voter_experienced")}</h3>
                    <p className="text-sm text-muted-foreground">{t("guide_voter_experienced_desc")}</p>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("guide_state_label")}</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-card focus:border-primary focus:ring-0 appearance-none text-lg font-medium outline-none transition-colors"
                  >
                    {ALL_STATES.map(s => <option key={s} value={s}>{t(s)}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={nextStep} 
                disabled={!voterType}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center gap-2"
              >
                {t("guide_continue")} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "eligibility":
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t("guide_eligibility_title")}</h2>
              <p className="text-muted-foreground">{t("guide_eligibility_desc")}</p>
            </div>

            <div className="max-w-xl mx-auto w-full bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle2 size={64} className={isEligible === true ? "text-green-500" : isEligible === false ? "text-red-500" : "text-muted-foreground/30"} />
              </div>
              <h3 className="text-2xl font-bold mb-6">{t("guide_eligibility_q")}</h3>
              
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setIsEligible(true)}
                  className={cn("px-8 py-3 rounded-xl font-bold border-2 transition-all", isEligible === true ? "bg-green-500 text-white border-green-500" : "bg-transparent border-border hover:border-green-500 hover:text-green-500")}
                >
                  {t("guide_yes")}
                </button>
                <button 
                  onClick={() => setIsEligible(false)}
                  className={cn("px-8 py-3 rounded-xl font-bold border-2 transition-all", isEligible === false ? "bg-red-500 text-white border-red-500" : "bg-transparent border-border hover:border-red-500 hover:text-red-500")}
                >
                  {t("guide_no")}
                </button>
              </div>

              {isEligible === true && (
                <div className="mt-6 p-4 bg-green-500/10 text-green-600 rounded-xl font-medium animate-in fade-in">
                  {t("guide_eligible_msg")}
                </div>
              )}
              {isEligible === false && (
                <div className="mt-6 p-4 bg-red-500/10 text-red-500 rounded-xl font-medium flex items-start gap-3 animate-in fade-in text-left">
                  <AlertTriangle size={24} className="shrink-0" />
                  <p>{t("guide_not_eligible_msg")}</p>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={nextStep} 
                disabled={isEligible === null}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center gap-2"
              >
                {t("guide_continue")} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "registration":
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                {voterType === "first-time" ? t("guide_reg_title_first") : t("guide_reg_title_exp")}
              </h2>
              <p className="text-muted-foreground">
                {voterType === "first-time" 
                  ? <Link href="/register" className="text-primary font-bold hover:underline">{t("ai_checklist_4")}</Link> 
                  : t("home_understand_desc")}
              </p>
            </div>

            <div className="max-w-2xl mx-auto w-full bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="font-bold text-xl mb-4">{t("guide_checklist_title")}</h3>
              
              <div className="space-y-4">
                {[
                  voterType === "first-time" ? t("ai_checklist_2") : t("guide_reg_step_exp_1"),
                  voterType === "first-time" ? t("ai_checklist_3") : t("guide_reg_step_exp_2"),
                  voterType === "first-time" ? t("ai_checklist_4") : t("guide_reg_step_exp_3")
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={regChecklist[idx]}
                        onChange={(e) => {
                          const newC = [...regChecklist];
                          newC[idx] = e.target.checked;
                          setRegChecklist(newC);
                        }}
                        className="w-6 h-6 rounded-md border-2 border-muted-foreground text-primary focus:ring-primary accent-primary" 
                      />
                    </div>
                    <span className={cn("text-lg font-medium transition-colors", regChecklist[idx] ? "text-muted-foreground line-through" : "text-foreground")}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button onClick={nextStep} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 flex items-center gap-2">
                {t("next")}: {t("election_process")} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "process":
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold">{t("election_process")}</h2>
              <p className="text-muted-foreground mt-2">{t("home_understand_desc")}</p>
            </div>
            
            <div className="relative ml-6 md:ml-12 space-y-10 pb-4 max-w-2xl mx-auto w-full">
              {/* Animated vertical line */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-[2px] bg-primary/30"
              />
              
              {[
                { title: t("step1_title"), icon: CalendarDays, desc: t("step1_desc") },
                { title: t("step2_title"), icon: FileText, desc: t("step2_desc") },
                { title: t("step3_title"), icon: Users, desc: t("step3_desc") },
                { title: t("step4_title"), icon: Vote, desc: t("step4_desc") },
                { title: t("step5_title"), icon: PartyPopper, desc: t("step5_desc") }
              ].map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 100 }}
                  key={i} 
                  className="relative pl-10 group cursor-default"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.2, type: "spring" }}
                    className="absolute -left-[19px] top-0 w-10 h-10 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
                  >
                    <step.icon size={18} />
                  </motion.div>
                  <div className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                    <h4 className="font-bold text-xl text-foreground">{step.title}</h4>
                    <p className="text-muted-foreground mt-2 line-clamp-2">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <Link href="/election-process" className="px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-full hover:bg-secondary/80 flex items-center gap-2">
                {t("guide_deep_dive")}
              </Link>
              <button onClick={nextStep} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 flex items-center gap-2">
                {t("quick_reply_timeline")} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t("quick_reply_timeline")}</h2>
              <p className="text-muted-foreground">{t("process_subtitle")}</p>
            </div>

            <div className="grid gap-4 max-w-3xl mx-auto w-full">
              {mockTimelines.slice(0, 4).map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 text-primary px-4 py-3 rounded-xl text-center shrink-0 min-w-[140px] flex flex-col justify-center">
                    <div className="text-sm font-bold uppercase tracking-wider">{new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</div>
                    <div className="text-3xl font-black">{new Date(item.date).getDate()}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xl">{item.event}</h4>
                      <span className="text-xs font-bold px-2 py-1 bg-secondary text-secondary-foreground rounded-full whitespace-nowrap">
                        {getDaysLeft(item.date, t)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button onClick={nextStep} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 flex items-center gap-2">
                {t("nav_candidates")} {t("in_location")} {selectedState} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "candidates":
        const stateCandidates = mockCandidates.filter(c => c.state === selectedState);
        
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t("nav_candidates")}</h2>
              <p className="text-muted-foreground">{t("candidate_explorer_desc")} {t("in_location")} <b>{selectedState}</b>.</p>
            </div>

            {stateCandidates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                {stateCandidates.map(c => (
                  <div key={c.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <div className="p-6 flex items-center gap-4 border-b border-border/50 bg-secondary/30">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background shadow-md shrink-0 bg-muted flex items-center justify-center text-muted-foreground">
                        <img 
                          src={c.avatarUrl} 
                          alt={c.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{c.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("w-3 h-3 rounded-full", c.partyColor)}></span>
                          <span className="text-sm font-semibold">{t(c.party)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h5 className="text-xs font-bold uppercase text-muted-foreground mb-2">{t("manifesto_summary")}</h5>
                      <ul className="space-y-2">
                        {c.manifesto.slice(0, 2).map((m, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/90">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-card rounded-3xl border border-border max-w-2xl mx-auto w-full">
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">{t("no_candidates_found")}</h3>
                <p className="text-muted-foreground">{t("adjust_criteria")} {t("in_location")} {selectedState}.</p>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button onClick={nextStep} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 flex items-center gap-2">
                {t("step4_title")} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "voting_day":
        return (
          <div className="flex flex-col space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t("step4_title")}</h2>
              <p className="text-muted-foreground">{t("home_understand_desc")}</p>
            </div>

            <div className="max-w-2xl mx-auto w-full bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="font-bold text-xl mb-4">{t("guide_checklist_title")}</h3>
              <div className="space-y-4">
                {[
                  t("guide_vote_step_1"),
                  t("guide_vote_step_2"),
                  t("guide_vote_step_3")
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={voteDayChecklist[idx]}
                        onChange={(e) => {
                          const newC = [...voteDayChecklist];
                          newC[idx] = e.target.checked;
                          setVoteDayChecklist(newC);
                        }}
                        className="w-6 h-6 rounded-md border-2 border-muted-foreground text-primary focus:ring-primary accent-primary" 
                      />
                    </div>
                    <span className={cn("text-lg font-medium transition-colors", voteDayChecklist[idx] ? "text-muted-foreground line-through" : "text-foreground")}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button onClick={nextStep} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 flex items-center gap-2 shadow-lg shadow-primary/20">
                {t("finish_guide")} <PartyPopper size={20} />
              </button>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="flex flex-col items-center text-center space-y-8 py-12 animate-in zoom-in-95 duration-700">
            <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
            
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-2 border-4 border-green-500/20 shadow-xl">
              <CheckCircle2 size={48} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500">
              {t("guide_finish_confetti")}
            </h2>
            
            <div className="bg-card border border-border p-8 rounded-3xl max-w-2xl w-full shadow-lg">
              <h3 className="text-xl font-bold mb-4 border-b border-border pb-4">{t("guide_action_plan")}</h3>
              <ul className="text-left space-y-4">
                {isEligible === false ? (
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" />
                    <span>{t("guide_not_eligible_msg")}</span>
                  </li>
                ) : (
                  <>
                    {voterType === "first-time" && !regChecklist.every(Boolean) && (
                      <li className="flex items-start gap-3">
                        <CheckSquare className="text-primary shrink-0 mt-0.5" />
                        <Link href="/register" className="hover:underline">
                          <b>{t("urgent_label")}:</b> {t("ai_checklist_4")}
                        </Link>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <CalendarDays className="text-primary shrink-0 mt-0.5" />
                      <span>{t("guide_mark_calendar")} <b>{selectedState}</b>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <IdCard className="text-primary shrink-0 mt-0.5" />
                      <Link href="/voter-id" className="hover:underline font-medium">
                        {t("step_voter_id")}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
              <button onClick={resetGuide} className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 flex justify-center items-center gap-2 transition-all">
                <RefreshCw size={20} /> {t("guide_restart")}
              </button>
              <Link href="/election-process" className="px-8 py-4 bg-secondary border border-border text-foreground font-bold rounded-2xl hover:bg-secondary/80 flex justify-center items-center gap-2 transition-all hover:-translate-y-1">
                {t("guide_deep_dive")}
              </Link>
              <Link href="/candidates" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 flex justify-center items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                {t("guide_explore_app")} <Sparkles size={20} />
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isHero = steps[currentStepIdx].id === "hero";

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Background glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-24 pt-32 flex-1 flex flex-col relative z-10">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          
          {/* Progress Bar (Hidden on Hero) */}
          {!isHero && (
            <div className="mb-10 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-foreground">{steps[currentStepIdx].title}</h3>
                <span className="text-sm font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {t("step")} {currentStepIdx} {t("of")} {steps.length - 1}
                </span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden flex relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStepIdx) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className={cn("flex-1 relative", !isHero && "glass-card rounded-[2rem] p-6 md:p-12 border border-border/50 shadow-2xl shadow-black/5")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation (Hidden on Hero and Summary) */}
          {!isHero && steps[currentStepIdx].id !== "summary" && (
            <div className="flex justify-between items-center mt-8 animate-in fade-in duration-500">
              <button
                onClick={prevStep}
                className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-x-1"
              >
                <ChevronLeft size={20} /> {t("back")}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
