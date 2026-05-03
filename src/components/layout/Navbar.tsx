"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Vote, Sparkles, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav_guide"), key: "nav_guide", href: "/interactive-guide", icon: Sparkles },
    { name: t("nav_process"), key: "nav_process", href: "/election-process" },
    { name: t("nav_candidates"), key: "nav_candidates", href: "/candidates" },
    { name: t("nav_ai"), key: "nav_ai", href: "/ai-assistant" },
  ];

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "glass shadow-sm py-2"
          : "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Vote size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            VoteWise Elite
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5"
            >
              {link.icon && <link.icon size={14} />}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3 z-50">
          <LanguageSwitcher />
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>
          
          <Link
            href="/bookmarks"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full transition-colors"
          >
            <Bookmark size={16} />
            {t("nav_bookmarks")}
          </Link>
          <Link
            href="/interactive-guide"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <Sparkles size={16} />
            {t("start_guide")}
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3 z-50">
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-secondary/50 text-foreground"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" role="navigation" aria-label="Mobile navigation" className="lg:hidden absolute top-full left-0 w-full glass-card border-t border-border/50 flex flex-col py-4 px-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="py-3 px-4 text-base font-medium rounded-lg transition-colors flex items-center gap-2 text-foreground/80 hover:bg-secondary/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.icon && <link.icon size={16} />}
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
            <Link
              href="/bookmarks"
              className="py-3 px-4 flex items-center justify-center gap-2 font-medium bg-secondary rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Bookmark size={18} /> {t("nav_bookmarks")}
            </Link>
            <Link
              href="/interactive-guide"
              className="py-3 px-4 flex items-center justify-center gap-2 font-bold bg-primary text-primary-foreground rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles size={18} /> {t("start_guide")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
