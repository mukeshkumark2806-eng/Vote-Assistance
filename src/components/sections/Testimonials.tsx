"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Priya S.",
      role: t("testimonial_1_role"),
      content: t("testimonial_1_content"),
      rating: 5,
    },
    {
      name: "Rahul M.",
      role: t("testimonial_2_role"),
      content: t("testimonial_2_content"),
      rating: 5,
    },
    {
      name: "Anita D.",
      role: t("testimonial_3_role"),
      content: t("testimonial_3_content"),
      rating: 5,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t("home_testimonials_title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home_testimonials_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg font-medium mb-8">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
