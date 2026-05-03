"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Bell, User as UserIcon, Bookmark, CalendarCheck } from "lucide-react";
import { mockTimelines } from "@/lib/mock-db";

export default function UserDashboard() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
    if (!isLoading && user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">Manage your voter profile and preferences.</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="px-6 py-2 border border-border bg-card text-foreground hover:bg-secondary rounded-lg font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Summary */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-3xl">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 border-4 border-background">
              <UserIcon size={32} />
            </div>
            <h2 className="text-xl font-bold mb-1">{user.email}</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
              <MapPin size={16} /> District 4, North Region
            </div>
            <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <CheckCircleIcon /> Voter Status: Active
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-3xl">
            <h3 className="font-semibold text-lg mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-muted-foreground" size={20} />
                  <span>Email Alerts</span>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bookmark className="text-muted-foreground" size={20} />
                  <span>Saved Candidates</span>
                </div>
                <span className="bg-secondary px-2 py-1 rounded text-xs font-bold">3</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Events */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 md:p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Action Items</h2>
              <CalendarCheck className="text-primary" size={28} />
            </div>
            <div className="space-y-4">
              {mockTimelines.slice(0, 3).map((item, i) => (
                <div key={item.id} className="p-4 border border-border rounded-2xl flex items-center gap-6 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="bg-secondary w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{new Date(item.date).toLocaleString('en-US', { month: 'short' })}</span>
                    <span className="text-xl font-bold">{new Date(item.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.event}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
