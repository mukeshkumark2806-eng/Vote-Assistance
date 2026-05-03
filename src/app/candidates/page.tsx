"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, MapPin, BookOpen, GraduationCap, Building, Bookmark, BookmarkCheck, Filter, Scale, X, Check, ArrowRight } from "lucide-react";
import { mockCandidates, mockParties } from "@/lib/mock-db";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function CandidatesPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedElection, setSelectedElection] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("votewise_bookmarks");
    if (saved) {
      try { setBookmarkedIds(JSON.parse(saved)); } catch(e) {}
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(bId => bId !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem("votewise_bookmarks", JSON.stringify(updated));
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(c => c !== id));
    } else {
      if (compareIds.length < 2) {
        setCompareIds([...compareIds, id]);
      }
    }
  };

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((c) => {
      const term = searchTerm.toLowerCase();
      const matchSearch = 
        c.name.toLowerCase().includes(term) || 
        c.constituency.toLowerCase().includes(term) ||
        c.party.toLowerCase().includes(term) ||
        c.state.toLowerCase().includes(term);

      const matchParty = selectedParty === "All" || c.party === selectedParty;
      const matchState = selectedState === "All" || c.state === selectedState;
      const matchElection = selectedElection === "All" || c.electionType === selectedElection;
      
      let matchAge = true;
      if (selectedAge === "under40") matchAge = c.age < 40;
      if (selectedAge === "40to60") matchAge = c.age >= 40 && c.age <= 60;
      if (selectedAge === "over60") matchAge = c.age > 60;

      return matchSearch && matchParty && matchState && matchElection && matchAge;
    });
  }, [searchTerm, selectedParty, selectedState, selectedElection, selectedAge]);

  const uniqueStates = useMemo(() => Array.from(new Set(mockCandidates.map(c => c.state))).sort(), []);
  const uniqueElections = useMemo(() => Array.from(new Set(mockCandidates.map(c => c.electionType).filter(Boolean))).sort(), []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 pt-32 min-h-screen relative">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("candidate_explorer_title")}</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t("candidate_explorer_desc")}
        </p>
        <div className="inline-flex items-center gap-4 bg-secondary/50 border border-border p-3 pr-4 rounded-full">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">New</span>
          <span className="text-sm font-medium">{t("home_understand_title")}</span>
          <Link href="/election-process" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
            {t("explore_process")} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-4 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors border border-border font-medium shrink-0"
          >
            <Filter size={20} />
            {t("filters")} {showFilters ? t("filters_on") : t("filters_off")}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-card p-6 rounded-2xl border border-border overflow-hidden"
            >
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">{t("filter_party_label")}</label>
                <select 
                  value={selectedParty} 
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="All">{t("filter_party")}</option>
                  {mockParties.map(p => <option key={p.id} value={p.name}>{p.name} ({p.fullName})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">{t("filter_state_label")}</label>
                <select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="All">{t("filter_state")}</option>
                  {uniqueStates.map(state => <option key={state as string} value={state as string}>{state as string}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">{t("election_type_label")}</label>
                <select 
                  value={selectedElection} 
                  onChange={(e) => setSelectedElection(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="All">{t("filter_election")}</option>
                  {uniqueElections.map(election => <option key={election as string} value={election as string}>{election as string}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">{t("age_group_label")}</label>
                <select 
                  value={selectedAge} 
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="All">{t("all_ages")}</option>
                  <option value="under40">{t("under_40")}</option>
                  <option value="40to60">{t("40_60")}</option>
                  <option value="over60">{t("over_60")}</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-32">
        <AnimatePresence>
          {filteredCandidates.map((candidate) => {
            const isBookmarked = bookmarkedIds.includes(candidate.id);
            const isComparing = compareIds.includes(candidate.id);

            return (
              <motion.div
                layout
                key={candidate.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={cn("glass-card rounded-3xl overflow-hidden group flex flex-col border-2 transition-colors", isComparing ? "border-primary" : "border-transparent")}
              >
                <div className="h-24 bg-gradient-to-r from-secondary/40 to-secondary/10 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => toggleCompare(candidate.id)}
                      disabled={compareIds.length === 2 && !isComparing}
                      title={t("add_to_compare")}
                      className={cn(
                        "p-2 backdrop-blur-md rounded-full transition-colors z-10 border disabled:opacity-50",
                        isComparing ? "bg-primary text-primary-foreground border-primary" : "bg-background/50 hover:bg-background/80 text-foreground border-border/50"
                      )}
                    >
                      {isComparing ? <Check size={18} /> : <Scale size={18} />}
                    </button>
                    <button 
                      onClick={() => toggleBookmark(candidate.id)}
                      title={t("bookmark_candidate_tooltip")}
                      className="p-2 bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full transition-colors z-10 border border-border/50"
                    >
                      {isBookmarked ? <BookmarkCheck size={18} className="text-primary fill-primary" /> : <Bookmark size={18} className="text-foreground" />}
                    </button>
                  </div>
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

                  <div className="border-t border-border pt-4 mb-4">
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
            );
          })}
        </AnimatePresence>
      </div>
      
      {filteredCandidates.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-3xl mt-8">
          {t("no_candidates_found")}
          <br/> {t("adjust_criteria")}
        </motion.div>
      )}

      {/* Floating Compare Action Bar */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-card border-2 border-primary rounded-full px-6 py-4 shadow-2xl flex items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <Scale className="text-primary" size={24} />
              <span className="font-bold">{compareIds.length}/2 {t("selected")}</span>
            </div>
            
            <button 
              onClick={() => setShowCompareModal(true)}
              disabled={compareIds.length !== 2}
              className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-primary/90"
            >
              {t("compare_now")}
            </button>
            
            <button onClick={() => setCompareIds([])} className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && compareIds.length === 2 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Scale size={24} className="text-primary" /> {t("candidate_comparison")}</h2>
                <button onClick={() => setShowCompareModal(false)} className="p-2 bg-background hover:bg-secondary rounded-full transition-colors"><X size={24} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-2 gap-8">
                  {compareIds.map(id => {
                    const c = mockCandidates.find(x => x.id === id)!;
                    return (
                      <div key={id} className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full border-4 border-card bg-secondary overflow-hidden shrink-0 relative">
                            <Image src={c.avatarUrl} alt={c.name} fill className="object-cover object-top" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{c.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${c.partyColor}`}>{t(c.party)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-secondary/50 rounded-2xl">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">{t("state_constituency")}</div>
                            <div className="font-semibold">{c.constituency}, {t(c.state)}</div>
                          </div>
                          
                          <div className="p-4 bg-secondary/50 rounded-2xl">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">{t("background")}</div>
                            <div className="font-semibold">{c.education}</div>
                            <div className="text-sm text-muted-foreground mt-1">{c.experience}</div>
                          </div>

                          <div className="p-4 bg-secondary/50 rounded-2xl">
                            <div className="text-xs text-primary uppercase font-bold mb-3">{t("key_promises")}</div>
                            <ul className="space-y-2">
                              {c.manifesto.map((p, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
