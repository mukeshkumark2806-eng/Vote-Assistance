"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockCandidates, mockParties } from "@/lib/mock-db";
import { BookOpen, MapPin, Search } from "lucide-react";
import Image from "next/image";

export default function ManifestosPage() {
  const [selectedParty, setSelectedParty] = useState("All");

  const filteredCandidates = mockCandidates.filter(c => selectedParty === "All" || c.party === selectedParty);

  return (
    <div className="container mx-auto px-4 py-24 pt-32 min-h-screen">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Manifesto Explorer</h1>
        <p className="text-lg text-muted-foreground">Read and compare what each candidate is promising to do if elected.</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-card border border-border rounded-xl p-1 shadow-sm">
          <button onClick={() => setSelectedParty("All")} className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${selectedParty === "All" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>All Parties</button>
          {mockParties.map(p => (
            <button key={p.id} onClick={() => setSelectedParty(p.name)} className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${selectedParty === p.name ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <AnimatePresence>
          {filteredCandidates.map(c => (
            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={c.id} className="glass-card rounded-3xl overflow-hidden border border-border/50 shadow-sm flex flex-col">
              <div className="p-6 border-b border-border bg-secondary/30 flex items-center gap-4">
                <Image src={c.avatarUrl} alt={c.name} width={64} height={64} className="rounded-full border-2 border-background object-cover bg-muted h-16 w-16" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div>
                  <h2 className="text-xl font-bold">{c.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${c.partyColor}`}>{c.party}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={12}/> {c.constituency}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-primary"><BookOpen size={18} /> Key Promises</h3>
                <ul className="space-y-3">
                  {c.manifesto.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="text-muted-foreground">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
