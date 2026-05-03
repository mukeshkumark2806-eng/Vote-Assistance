"use client";

import { motion } from "framer-motion";
import { CalendarDays, FileText, Users, Vote, PartyPopper } from "lucide-react";

export default function HowElectionsWorkPage() {
  const steps = [
    { title: "Notification", icon: CalendarDays, desc: "The Election Commission of India (ECI) announces the official schedule, dates, and phases for the elections." },
    { title: "Filing Nominations", icon: FileText, desc: "Candidates file their nomination papers along with an affidavit (Form 26) declaring their assets, criminal records, and education." },
    { title: "Campaigning", icon: Users, desc: "Political parties and candidates campaign to win over voters. They release their manifestos outlining their promises." },
    { title: "Voting Day", icon: Vote, desc: "Citizens cast their votes using Electronic Voting Machines (EVMs) at designated polling booths in secret." },
    { title: "Counting & Results", icon: PartyPopper, desc: "Votes are counted under strict security, and the candidate with the highest votes in each constituency is declared the winner." }
  ];

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-4xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How Elections Work</h1>
        <p className="text-lg text-muted-foreground">The 5 crucial stages of the world's largest democratic process.</p>
      </div>

      <div className="relative border-l-4 border-primary/20 ml-6 md:ml-12 space-y-12 pb-12">
        {steps.map((step, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            key={i} 
            className="relative pl-12 group cursor-default"
          >
            <div className="absolute -left-[24px] top-0 w-12 h-12 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <step.icon size={20} />
            </div>
            <div className="glass-card p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Step {i + 1}</div>
              <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
