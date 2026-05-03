"use client";

import { useState } from "react";
import Link from "next/link";
import { Vote, MessageCircle, Code, Mail, X, CheckCircle2, Send, Sparkles, BookOpen, ShieldCheck, Search, Users, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const footerLinks = [
    {
      title: t("footer_explore"),
      links: [
        { name: t("nav_process"), href: "/election-process" },
        { name: t("footer_timeline"), href: "/timeline" },
        { name: t("nav_candidates"), href: "/candidates" },
        { name: t("footer_manifestos"), href: "/manifestos" },
      ]
    },
    {
      title: t("footer_resources"),
      links: [
        { name: t("footer_register"), href: "/register" },
        { name: t("step_voter_id"), href: "/voter-id" },
        { name: t("footer_voter_zone"), href: "/first-time-voter" },
        { name: t("footer_myths"), href: "/myths-facts" },
        { name: t("faq"), href: "/faq" },
      ]
    },
    {
      title: t("footer_legal"),
      links: [
        { name: t("footer_privacy"), href: "/privacy" },
        { name: t("footer_terms"), href: "/terms" },
        { name: t("footer_accessibility"), href: "/accessibility" },
        { name: t("contact"), href: "/contact" },
      ]
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
    submissions.push({ ...formState, timestamp: new Date().toISOString() });
    localStorage.setItem("contact_submissions", JSON.stringify(submissions));
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsContactOpen(false);
      setFormState({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <footer className="border-t border-border bg-card/30 mt-20 relative">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                < Vote size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
                VoteWise Elite
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              {t("footer_desc")}
            </p>
            <div className="flex items-center gap-4">
              <div className="group relative">
                <Link 
                  href="/ai-assistant"
                  className="p-3 bg-secondary/50 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 block shadow-sm border border-border/50"
                >
                  <MessageCircle size={20} />
                  <span className="sr-only">{t("tooltip_ask_ai")}</span>
                </Link>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-popover text-popover-foreground text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-border">
                  {t("tooltip_ask_ai")}
                </div>
              </div>

              <div className="group relative">
                <button 
                  onClick={() => setIsAboutOpen(true)}
                  className="p-3 bg-secondary/50 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 block shadow-sm border border-border/50"
                >
                  <Code size={20} />
                  <span className="sr-only">{t("tooltip_about")}</span>
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-popover text-popover-foreground text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-border">
                  {t("tooltip_about")}
                </div>
              </div>

              <div className="group relative">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="p-3 bg-secondary/50 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 block shadow-sm border border-border/50"
                >
                  <Mail size={20} />
                  <span className="sr-only">{t("tooltip_contact")}</span>
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-popover text-popover-foreground text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-border">
                  {t("tooltip_contact")}
                </div>
              </div>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover/link:scale-100 transition-transform duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} VoteWise Elite. {t("footer_rights")}.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-muted-foreground font-medium">{t("systems_operational")}</span>
          </div>
        </div>
      </div>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsAboutOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary text-primary-foreground p-3 rounded-2xl">
                  <Code size={24} />
                </div>
                <h2 className="text-3xl font-bold">{t("about_title")}</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                    <Sparkles size={18} /> {t("about_purpose")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("about_purpose_text")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                    <BookOpen size={18} /> {t("about_features")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: MessageCircle, text: t("feature_ai_title") },
                      { icon: Calendar, text: t("feature_timeline_title") },
                      { icon: Users, text: t("feature_candidates_title") },
                      { icon: ShieldCheck, text: t("feature_fakenews_title") },
                      { icon: Search, text: t("feature_locator_title") },
                      { icon: Vote, text: t("feature_voterguide_title") }
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/50">
                        <f.icon size={16} className="text-primary" />
                        <span className="text-sm font-medium">{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                    <Sparkles size={18} /> {t("about_tech_stack")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("about_tech_stack_text")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary text-primary-foreground p-3 rounded-2xl">
                  <Mail size={24} />
                </div>
                <h2 className="text-3xl font-bold">{t("contact_form_title")}</h2>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/20 shadow-xl">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t("contact_success")}</h3>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">{t("contact_name")}</label>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      placeholder="Jane Doe"
                      className="w-full px-5 py-3 rounded-xl border border-border bg-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">{t("contact_email")}</label>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="jane@example.com"
                      className="w-full px-5 py-3 rounded-xl border border-border bg-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">{t("contact_message")}</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="How can we help?"
                      className="w-full px-5 py-3 rounded-xl border border-border bg-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 mt-2"
                  >
                    <Send size={18} /> {t("contact_send")}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
