"use client";

import { useState, useEffect } from "react";
import { BookmarkMinus, BookmarkCheck, MapPin, Building, GraduationCap, BookOpen, AlertCircle } from "lucide-react";
import { mockCandidates } from "@/lib/mock-db";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

export default function BookmarksPage() {
  const { t } = useTranslation();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("votewise_bookmarks");
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarkedIds.filter(bId => bId !== id);
    setBookmarkedIds(updated);
    localStorage.setItem("votewise_bookmarks", JSON.stringify(updated));
  };

  const bookmarkedCandidates = mockCandidates.filter(c => bookmarkedIds.includes(c.id));

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 pt-32 min-h-[80vh]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
          <BookmarkCheck className="text-primary" size={40} />
          {t("bookmarks_title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("bookmarks_subtitle")}
        </p>
      </div>

      {bookmarkedCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {bookmarkedCandidates.map((candidate) => (
              <motion.div
                layout
                key={candidate.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-3xl overflow-hidden flex flex-col border border-border/50 shadow-sm"
              >
                <div className="h-24 bg-gradient-to-r from-secondary/40 to-secondary/10 relative">
                  <button 
                    onClick={() => removeBookmark(candidate.id)}
                    title={t("remove_bookmark_tooltip")}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 backdrop-blur-md rounded-full transition-colors z-10 border border-red-500/20"
                  >
                    <BookmarkMinus size={20} />
                  </button>
                </div>
                
                <div className="px-6 pb-6 -mt-12 flex-1 flex flex-col relative">
                  <div className="w-24 h-24 rounded-full border-4 border-card bg-secondary overflow-hidden mb-4 shadow-lg shrink-0 relative">
                    <Image src={candidate.avatarUrl} alt={candidate.name} fill sizes="96px" className="object-cover object-top" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{candidate.name}</h2>
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${candidate.partyColor}`}>
                      {t(candidate.party)}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">{t("age")}: {candidate.age}</span>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin size={16} className="mt-0.5 shrink-0" />
                      <span>{candidate.constituency}, {t(candidate.state)}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Building size={16} className="mt-0.5 shrink-0" />
                      <span>{candidate.experience}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <GraduationCap size={16} className="mt-0.5 shrink-0" />
                      <span>{candidate.education}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      {t("manifesto_summary")}
                    </h3>
                    <ul className="space-y-2">
                      {candidate.manifesto.map((point, i) => (
                        <li key={i} className="text-sm text-muted-foreground pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mt-12 bg-card border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
            <BookmarkMinus size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">{t("no_bookmarks_title")}</h2>
          <p className="text-muted-foreground mb-8">
            {t("no_bookmarks_desc")}
          </p>
          <Link href="/candidates" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors">
            {t("guide_explore_app")}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
