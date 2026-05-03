"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, Activity, ShieldAlert, Settings, LogOut } from "lucide-react";
import { mockCandidates, mockTimelines } from "@/lib/mock-db";

export default function AdminDashboard() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
    if (!isLoading && user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return <div className="pt-32 text-center">Loading Secure Area...</div>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 bg-red-500/10 p-6 rounded-3xl border border-red-500/20">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-bold mb-2 uppercase tracking-wide text-sm">
            <ShieldAlert size={18} /> Admin Privileges Active
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            System Dashboard
          </h1>
          <p className="text-muted-foreground">Logged in as {user.email}</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="px-6 py-2 border border-red-500/50 bg-background text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <LogOut size={16} /> Exit Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">24,591</div>
            <div className="text-sm text-muted-foreground">Registered Users</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">850+</div>
            <div className="text-sm text-muted-foreground">AI Queries / hr</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">{mockCandidates.length}</div>
            <div className="text-sm text-muted-foreground">Candidates Listed</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
            <Settings size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">System Normal</div>
            <div className="text-sm text-muted-foreground">Server Status</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 md:p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Candidate Management</h2>
            <button className="text-sm text-primary hover:underline font-medium">Add New</button>
          </div>
          <div className="space-y-4">
            {mockCandidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <img src={candidate.avatarUrl} alt={candidate.name} className="w-10 h-10 rounded-full bg-secondary" />
                  <div>
                    <div className="font-semibold">{candidate.name}</div>
                    <div className="text-xs text-muted-foreground">{candidate.party}</div>
                  </div>
                </div>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Timeline Management</h2>
            <button className="text-sm text-primary hover:underline font-medium">Add Event</button>
          </div>
          <div className="space-y-4">
            {mockTimelines.map((timeline) => (
              <div key={timeline.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div>
                  <div className="font-semibold">{timeline.event}</div>
                  <div className="text-xs text-muted-foreground">{timeline.date}</div>
                </div>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
