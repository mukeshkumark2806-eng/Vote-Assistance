"use client";

import { useState, useEffect } from "react";
import { mockLiveResults } from "@/lib/mock-db";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Activity, Users, Map } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

export default function LiveResultsPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalVotes = mockLiveResults.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4">
            {t("live_results_title")}
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">{t("live_results_desc")}</p>
        </div>
        <div className="bg-secondary/50 border border-border px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Activity size={16} className="text-primary animate-pulse" />
          {t("last_updated")}: {t("just_now")}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">{t("total_votes_counted")}</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users size={20} /></div>
          </div>
          <div className="text-4xl font-bold">{totalVotes.toLocaleString()}</div>
          <div className="text-sm text-green-500 font-medium mt-2">+12% {t("from_last_hour")}</div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">{t("voter_turnout")}</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Activity size={20} /></div>
          </div>
          <div className="text-4xl font-bold">68.4%</div>
          <div className="text-sm text-muted-foreground font-medium mt-2">{t("expected_total")}: 72%</div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">{t("districts_reporting")}</h3>
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Map size={20} /></div>
          </div>
          <div className="text-4xl font-bold">42 / 50</div>
          <div className="text-sm text-muted-foreground font-medium mt-2">84% {t("completed")}</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6 md:p-8 rounded-3xl min-h-[400px] flex flex-col">
          <h2 className="text-2xl font-bold mb-6">{t("vote_distribution")}</h2>
          <div className="flex-1 w-full h-[300px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockLiveResults}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="votes"
                    nameKey="party"
                    stroke="none"
                  >
                    {mockLiveResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => Number(value).toLocaleString()} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Detailed Breakdown */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 md:p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">{t("detailed_breakdown")}</h2>
          <div className="space-y-6">
            {mockLiveResults.map((result) => (
              <div key={result.party}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="font-semibold">{t(result.party)}</div>
                    <div className="text-sm text-muted-foreground">{result.votes.toLocaleString()} {t("nav_votes")}</div>
                  </div>
                  <div className="font-bold text-lg">{result.percentage}%</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: result.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 border border-border hover:bg-secondary rounded-xl font-medium transition-colors">
            {t("view_constituency_data")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
