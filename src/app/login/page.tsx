"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Vote, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@votewise-elite.org") {
      login(email, "admin");
      router.push("/admin/dashboard");
    } else {
      login(email, "user");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6 shadow-xl shadow-primary/20">
            <Vote size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your voter dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voter@example.com"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            Sign In <ArrowRight size={20} />
          </button>

          <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck size={16} className="text-green-500" />
            <span>Secure, encrypted login powered by local mock auth.</span>
          </div>
        </form>
        
        <p className="text-center mt-8 text-muted-foreground">
          Don't have an account? <Link href="/register" className="text-primary font-medium hover:underline">Register to Vote</Link>
        </p>
      </div>
    </div>
  );
}
