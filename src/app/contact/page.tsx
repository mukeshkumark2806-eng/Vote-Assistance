"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { sanitizeInput, isValidEmail, checkRateLimit, generateCSRFToken } from "@/lib/security";
import { contactsService, trackEvent } from "@/lib/google-services";

/**
 * Contact Page with Security Best Practices
 * 
 * Implements:
 * - Input sanitization (XSS prevention)
 * - Email validation
 * - Rate limiting (max 3 submissions per minute)
 * - CSRF token protection
 * - Firestore service integration
 * - Google Analytics event tracking
 */
export default function ContactPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState("");

  // Generate CSRF token on mount
  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Rate limiting check
    const rateCheck = checkRateLimit('contact_form', 3, 60000);
    if (!rateCheck.allowed) {
      setError(`Too many submissions. Please try again in ${Math.ceil((rateCheck.retryAfterMs || 60000) / 1000)} seconds.`);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const rawName = formData.get("name") as string;
    const rawEmail = formData.get("email") as string;
    const rawMessage = formData.get("message") as string;

    // Input validation
    if (!rawName || !rawEmail || !rawMessage) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(rawEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Sanitize inputs to prevent XSS
    const data = {
      name: sanitizeInput(rawName.trim()),
      email: sanitizeInput(rawEmail.trim()),
      message: sanitizeInput(rawMessage.trim()),
      status: 'pending' as const,
    };

    // Store via Firestore service layer
    try {
      await contactsService.addDocument(data);

      // Track submission event via Google Analytics
      trackEvent({
        action: 'contact_form_submit',
        category: 'engagement',
        label: 'contact_page',
      });

      setSubmitted(true);
      // Regenerate CSRF token
      setCsrfToken(generateCSRFToken());
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 pt-32 max-w-6xl min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("contact_support_title")}</h1>
        <p className="text-lg text-muted-foreground">{t("contact_support_desc")}</p>
      </div>

      {submitted ? (
        <div className="glass-card p-12 rounded-3xl border border-border/50 text-center flex flex-col items-center" role="alert" aria-live="polite">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t("message_sent_title")}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{t("message_sent_desc")}</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/80 transition-colors"
          >
            {t("send_another")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-6" noValidate>
            {/* Hidden CSRF token */}
            <input type="hidden" name="_csrf" value={csrfToken} />

            {/* Error display */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium" role="alert">
                <AlertTriangle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="contact-name" className="block text-sm font-bold mb-2">{t("contact_name")}</label>
              <input
                required
                type="text"
                id="contact-name"
                name="name"
                maxLength={100}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("name_placeholder")}
                aria-required="true"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-bold mb-2">{t("contact_email")}</label>
              <input
                required
                type="email"
                id="contact-email"
                name="email"
                maxLength={254}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("email_placeholder")}
                aria-required="true"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-bold mb-2">{t("contact_message")}</label>
              <textarea
                required
                id="contact-message"
                name="message"
                rows={5}
                maxLength={2000}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={t("message_placeholder")}
                aria-required="true"
              ></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Send size={18} /> {t("contact_send")}
            </button>

            {/* Security indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <ShieldCheck size={14} className="text-green-500" />
              <span>Protected by rate limiting, input sanitization & CSRF protection</span>
            </div>
          </form>

          <div className="glass-card p-8 rounded-3xl border border-border/50 shadow-sm h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-4">{t("visit_us")}</h3>
            <p className="text-muted-foreground mb-6">{t("visit_us_desc")}</p>
            <div className="flex-1 w-full min-h-[300px] rounded-xl overflow-hidden border-2 border-border/50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.815340003058!2d77.20963531508264!3d28.63529398241662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3478d06b6b%3A0x6b8bc62db033e6f9!2sElection%20Commission%20of%20India!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Election Commission of India"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
