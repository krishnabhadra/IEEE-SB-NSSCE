"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Trophy, Star, Award } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    id: "h1",
    year: "2025",
    title: "Best Student Branch Award",
    description: "Awarded the Outstanding Student Branch within the Kerala Section for exceptional activities and member engagement.",
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "h2",
    year: "2024",
    title: "Global IEEE PES Darrel Chong",
    description: "Received Gold level recognition for conducting the highly impactful 'Energy for All' initiative.",
    icon: Award,
    color: "text-ieee-blue",
    bgColor: "bg-ieee-blue/10",
  },
  {
    id: "h3",
    year: "2024",
    title: "Regional CS Hackathon Winners",
    description: "Our Computer Society team secured 1st place at the National Level Hackathon organized by IEEE India Council.",
    icon: Star,
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  }
];

export default function AchievementsPreview() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-24 relative bg-slate-900 text-white overflow-hidden">
      {/* Dark theme background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ieee-blue/20 rounded-full blur-[150px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            >
              <Trophy className="text-yellow-400" size={24} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Excellence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-300 text-lg"
            >
              Recognized globally and nationally for our consistent dedication to technological advancement and community building.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md font-medium transition-all group"
            >
              View Full Timeline
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Clean Grid (Removed intersecting timeline line and dots) */}
        <div className="relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div key={highlight.id} variants={item} className="relative group h-full">
                  <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlight.bgColor} ${highlight.color}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">{highlight.year}</span>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-xl mb-3">
                      {highlight.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
