"use client";

import HeroSection from "@/components/sections/HeroSection";
import LiveTicker from "@/components/sections/LiveTicker";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import Testimonials from "@/components/sections/Testimonials";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <LiveTicker />
      <HeroSection />
      <FeatureShowcase />
      <Testimonials />
      
      {/* Election Process Section */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold w-fit">
                {t("home_step_learning")}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t("home_understand_title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("home_understand_desc")}
              </p>
              <Link href="/election-process" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 w-fit">
                {t("explore_process")}
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="relative h-80 rounded-[2rem] overflow-hidden border-4 border-background shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <img src="/images/voting_booth.jpg" alt="Voting Booth" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("ready_voice")}</h2>
              <p className="text-lg md:text-xl mb-10 text-primary-foreground/90">
                {t("join_informed")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/interactive-guide" className="px-8 py-4 bg-background text-foreground font-bold rounded-full hover:bg-secondary transition-colors w-full sm:w-auto inline-block">
                  {t("start_guide")}
                </Link>
                <Link href="/candidates" className="px-8 py-4 bg-transparent border border-primary-foreground text-primary-foreground font-bold rounded-full hover:bg-primary-foreground/10 transition-colors w-full sm:w-auto inline-block">
                  {t("view_candidates")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
