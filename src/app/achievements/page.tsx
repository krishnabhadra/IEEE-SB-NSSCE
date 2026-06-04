"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { societies } from "@/data/societies";

export default function AchievementsPage() {
  const [activeYear, setActiveYear] = useState<number | "all">("all");

  // Get unique years sorted descending
  const years = Array.from(new Set(achievements.map(a => a.year))).sort((a, b) => b - a);

  const filteredAchievements = activeYear === "all"
    ? achievements.sort((a, b) => b.year - a.year)
    : achievements.filter(a => a.year === activeYear);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[800px] h-[800px] bg-accent-cyan/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            Our <span className="text-gradient">Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A timeline of our proudest moments, milestones, and awards from 2001 to present.
          </motion.p>
        </div>
      </section>

      {/* Year Filter */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 no-scrollbar gap-2"
        >
          <button
            onClick={() => setActiveYear("all")}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeYear === "all"
                ? "bg-ieee-blue text-white shadow-md shadow-ieee-blue/20"
                : "bg-white border border-pale-silver text-muted-foreground hover:border-ieee-blue/50 hover:text-ieee-blue"
              }`}
          >
            All Time
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeYear === year
                  ? "bg-ieee-blue text-white shadow-md shadow-ieee-blue/20"
                  : "bg-white border border-pale-silver text-muted-foreground hover:border-ieee-blue/50 hover:text-ieee-blue"
                }`}
            >
              {year}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-pale-silver/50 -translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {filteredAchievements.map((achievement, index) => {
              const isEven = index % 2 === 0;
              const society = achievement.societyId ? societies.find(s => s.id === achievement.societyId) : null;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-ieee-blue rounded-full -translate-x-1/2 z-10 md:mt-0 mt-6 shadow-sm shadow-ieee-blue/20" />

                  {/* Left Side (Empty on mobile, Content on desktop if even) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end md:pr-12" : "md:justify-start pl-12 md:pl-0"} `}>
                    {isEven && (
                      <div className="w-full pl-12 md:pl-0">
                        <div className="glass p-8 rounded-3xl border border-pale-silver hover:border-ieee-blue/30 hover:shadow-lg transition-all duration-300 relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ieee-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-accent-cyan">
                              {achievement.year}
                            </span>
                            {society && (
                              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${society.accentColor}`}>
                                {society.shortName}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-heading font-bold mb-3">{achievement.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{achievement.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {achievement.tags.map(tag => (
                              <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side (Content on mobile, Content on desktop if odd) */}
                  <div className={`w-full md:w-1/2 flex ${!isEven ? "md:justify-start md:pl-12" : "hidden md:flex md:justify-end pr-12 md:pr-0"} `}>
                    {!isEven && (
                      <div className="w-full pl-12 md:pl-0 mt-8 md:mt-0">
                        <div className="glass p-8 rounded-3xl border border-pale-silver hover:border-ieee-blue/30 hover:shadow-lg transition-all duration-300 relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ieee-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-accent-cyan">
                              {achievement.year}
                            </span>
                            {society && (
                              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${society.accentColor}`}>
                                {society.shortName}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-heading font-bold mb-3">{achievement.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{achievement.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {achievement.tags.map(tag => (
                              <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No achievements found for the selected year.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
