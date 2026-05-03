"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, AlertCircle, ChevronRight, CheckCircle2, CalendarDays, BookOpen, MapPin, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockCandidates, mockTimelines } from "@/lib/mock-db";
import { useTranslation } from "@/context/LanguageContext";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  widget?: "process_stepper" | "timeline_view" | "registration_guide";
  candidateCard?: typeof mockCandidates[0];
  quickReplies?: string[];
};

export default function AIAssistantPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when t is available
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "ai",
          content: t("ai_welcome_msg"),
          quickReplies: [t("quick_reply_process"), t("quick_reply_timeline"), t("quick_reply_register"), t("quick_reply_candidate")],
        },
      ]);
    }
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateSmartResponse = (query: string): Message => {
    const q = query.toLowerCase();
    
    // Process Stepper
    if (q.includes("process") || q.includes("how elections work") || q.includes("steps") || q.includes("விளக்குங்கள்") || q.includes("செயல்முறை")) {
      return {
        id: Date.now().toString(),
        role: "ai",
        content: t("step1_desc"), // Using a generic descriptive content
        widget: "process_stepper",
        quickReplies: [t("quick_reply_timeline"), t("quick_reply_register")],
      };
    }

    // Timeline View
    if (q.includes("timeline") || q.includes("date") || q.includes("when") || q.includes("காலக்கெடு")) {
      return {
        id: Date.now().toString(),
        role: "ai",
        content: t("process_subtitle"),
        widget: "timeline_view",
        quickReplies: [t("quick_reply_register"), t("quick_reply_process")],
      };
    }

    // Registration Guide
    if (q.includes("register") || q.includes("voter id") || q.includes("form 6") || q.includes("பதிவு")) {
      return {
        id: Date.now().toString(),
        role: "ai",
        content: t("hero_desc"),
        widget: "registration_guide",
        quickReplies: [t("quick_reply_process"), t("quick_reply_timeline")],
      };
    }

    // Fake News
    if (q.includes("fake") || q.includes("whatsapp")) {
      return { 
        id: Date.now().toString(), 
        role: "ai", 
        content: `🚨 **${t("ai_fact_check")}:** ${t("ai_fakenews_response")}`, 
        quickReplies: [t("quick_reply_register")] 
      };
    }

    // Dynamic Candidate Search
    const matchedCandidate = mockCandidates.find(c => 
      q.includes(c.name.toLowerCase().split(' ').pop() || "") || 
      q.includes(c.name.toLowerCase().split(' ')[0] || "") ||
      (q.includes(c.party.toLowerCase()) && q.includes(c.constituency.toLowerCase()))
    );

    if (matchedCandidate) {
      return {
        id: Date.now().toString(),
        role: "ai",
        content: t("ai_candidate_found_msg").replace("{{name}}", matchedCandidate.name),
        candidateCard: matchedCandidate,
        quickReplies: [t("quick_reply_timeline"), t("quick_reply_process")]
      };
    }
    
    // Default Fallback
    return {
      id: Date.now().toString(),
      role: "ai",
      content: t("ai_assistant_desc"),
      quickReplies: [t("quick_reply_process"), t("quick_reply_timeline"), t("quick_reply_candidate")],
    };
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1].quickReplies = undefined;
      }
      return [...updated, newMsg];
    });
    
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateSmartResponse(text);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const renderWidget = (msg: Message) => {
    if (msg.candidateCard) {
      const c = msg.candidateCard;
      return (
        <div className="mt-4 bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-4 p-4 border-b border-border/50 bg-secondary/30">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background shadow-md shrink-0 bg-muted">
              <img src={c.avatarUrl} alt={c.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground">{c.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${c.partyColor}`}>{t(c.party)}</span>
                <span className="text-xs text-muted-foreground font-medium">{c.constituency}, {t(c.state)}</span>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3 bg-card">
            <div className="text-sm flex items-start gap-2 text-muted-foreground"><Building size={16} className="mt-0.5 shrink-0" /> {c.experience}</div>
            <div className="border-t border-border pt-3 mt-3">
              <h5 className="text-xs font-bold uppercase text-primary mb-2 flex items-center gap-1"><BookOpen size={14} /> {t("manifesto_summary")}</h5>
              <ul className="space-y-1.5">
                {c.manifesto.map((m, i) => (
                  <li key={i} className="text-sm flex items-start gap-2 text-foreground/90">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 mt-1.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    switch (msg.widget) {
      case "process_stepper":
        return (
          <div className="mt-4 flex flex-col gap-3 relative border-l-2 border-primary/30 ml-4 pl-6 py-2">
            {[
              { title: t("step1_title"), desc: t("step1_desc") },
              { title: t("step2_title"), desc: t("step2_desc") },
              { title: t("step3_title"), desc: t("step3_desc") },
              { title: t("step4_title"), desc: t("step4_desc") },
              { title: t("step5_title"), desc: t("step5_desc") }
            ].map((step, i) => (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} key={i} className="relative">
                <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground border-4 border-background">
                  {i + 1}
                </div>
                <h4 className="font-bold text-foreground text-sm">{step.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        );
      case "timeline_view":
        return (
          <div className="mt-4 grid gap-3">
            {mockTimelines.slice(0, 3).map((item, i) => (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} key={i} className="bg-background rounded-xl p-3 border border-border/50 shadow-sm flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">{item.date}</div>
                  <div className="text-sm font-semibold text-foreground">{item.event}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case "registration_guide":
        return (
          <div className="mt-4 bg-secondary/50 rounded-xl p-4 border border-border/50">
            <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
              <CheckCircle2 size={16} className="text-green-500" /> {t("ai_voter_checklist")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {t("ai_checklist_1")}</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {t("ai_checklist_2")}</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {t("ai_checklist_3")}</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {t("ai_checklist_4")}</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
              <Link href="/register" className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-bold transition-colors">
                {t("step_register")}
              </Link>
              <Link href="/voter-id" className="px-3 py-1.5 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg text-xs font-bold transition-colors">
                {t("step_voter_id")}
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 pt-32 max-w-4xl flex flex-col h-screen">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center justify-center md:justify-start gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-2xl">
            <Bot className="text-primary" size={32} />
          </div>
          {t("ai_assistant_title")}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto md:mx-0">
          {t("ai_assistant_desc")}
        </p>
      </div>

      <div className="flex-1 glass-card rounded-3xl p-4 md:p-6 flex flex-col overflow-hidden relative border border-border/50 shadow-2xl shadow-primary/5">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar pb-10">
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={msg.id}
              className={cn(
                "flex gap-3 md:gap-4 max-w-[90%] md:max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground border border-border"
                )}
              >
                {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm max-w-fit",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm ml-auto"
                      : "bg-secondary text-secondary-foreground rounded-tl-sm border border-border/50 w-full"
                  )}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : msg.content.includes("🚨") ? (
                    <div className="flex gap-2 items-start">
                      <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: msg.content.replace("🚨", `🚨 <b>${t("ai_fact_check")}:</b>`).replace("**Fact Check:**", "") }} />
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<b class="text-foreground font-bold">$1</b>') }} className="flex flex-col" />
                  )}
                  
                  {renderWidget(msg)}
                </div>

                {/* Quick Replies */}
                {msg.quickReplies && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-2 mt-2"
                  >
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(reply)}
                        className="text-xs md:text-sm px-4 py-2 bg-background border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center gap-1.5 shadow-sm font-medium"
                      >
                        {reply} <ChevronRight size={14} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div className="p-4 rounded-2xl bg-secondary text-secondary-foreground rounded-tl-sm flex items-center gap-3 border border-border/50">
                <div className="flex gap-1">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">{t("ai_typing")}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-2 pt-4 border-t border-border/50 bg-background/50 backdrop-blur-sm -mx-4 -mb-4 px-4 pb-4 md:-mx-6 md:-mb-6 md:px-6 md:pb-6 rounded-b-3xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("ai_placeholder")}
              className="w-full bg-background border-2 border-border rounded-full pl-6 pr-14 py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send size={18} className={cn(isTyping && "opacity-0", !isTyping && "opacity-100")} />
              {isTyping && <Loader2 size={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />}
            </button>
          </div>
          <div className="mt-3 flex justify-center gap-6 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1"><Sparkles size={14} className="text-primary" /> Smart Context</div>
            <div className="flex items-center gap-1"><CheckCircle2 size={14} /> Local Data Only</div>
          </div>
        </div>
      </div>
    </div>
  );
}

