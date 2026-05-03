"use client";

import { motion } from "framer-motion";
import { MessageSquare, Calendar, ShieldCheck, Users, Search, BookOpen } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function FeatureShowcase() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("feature_ai_title"),
      description: t("feature_ai_desc"),
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      title: t("feature_timeline_title"),
      description: t("feature_timeline_desc"),
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      title: t("feature_candidates_title"),
      description: t("feature_candidates_desc"),
      icon: Users,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
    {
      title: t("feature_fakenews_title"),
      description: t("feature_fakenews_desc"),
      icon: ShieldCheck,
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      title: t("feature_voterguide_title"),
      description: t("feature_voterguide_desc"),
      icon: BookOpen,
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    },
    {
      title: t("feature_locator_title"),
      description: t("feature_locator_desc"),
      icon: Search,
      color: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t("home_features_title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("home_features_subtitle")}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="glass-card p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
