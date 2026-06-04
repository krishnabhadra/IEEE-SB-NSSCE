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

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black mb-10 text-slate-900 tracking-tight"
          >
            Our <span className="relative inline-block"><span className="relative z-10 text-white">Journey</span><span className="absolute -bottom-1 left-0 w-full h-full bg-ieee-blue -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto mb-10"
          >
            <div className="absolute inset-0 bg-[#FFD700] translate-x-1.5 translate-y-1.5 rounded-2xl pointer-events-none border-2 border-black" />
            <div className="absolute inset-0 bg-[#FFA000] translate-x-3 translate-y-3 rounded-2xl pointer-events-none border-2 border-black" />
            
            <div className="relative bg-white border-2 border-black p-5 md:p-8 rounded-2xl z-10 shadow-sm text-center">
              <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed">
                A timeline of our proudest moments, milestones, and awards from <span className="font-bold text-ieee-blue">2001 to present</span>.
              </p>
            </div>
          </motion.div>
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
            className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 border-black ${activeYear === "all"
                ? "bg-[#FFD700] text-black translate-x-[2px] translate-y-[2px] shadow-none"
                : "bg-white text-slate-800 hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              }`}
          >
            All Time
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border-2 border-black ${activeYear === year
                  ? "bg-ieee-blue text-white translate-x-[2px] translate-y-[2px] shadow-none"
                  : "bg-white text-slate-800 hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-black -translate-x-1/2 rounded-full" />

          <div className="space-y-16">
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
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#FFD700] border-4 border-black rounded-full -translate-x-1/2 z-10 md:mt-0 mt-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />

                  {/* Left Side (Empty on mobile, Content on desktop if even) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end md:pr-16" : "md:justify-start pl-16 md:pl-0"} `}>
                    {isEven && (
                      <div className="w-full pl-16 md:pl-0">
                        <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 relative group flex flex-col">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-4xl font-heading font-black text-black">
                              {achievement.year}
                            </span>
                            {society && (
                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${society.accentColor} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                {society.shortName}
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl font-heading font-black mb-3 text-slate-900">{achievement.title}</h3>
                          <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed mb-6">{achievement.description}</p>

                          <div className="flex flex-wrap gap-2 mt-auto">
                            {achievement.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 border-2 border-black text-xs font-bold text-slate-700 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side (Content on mobile, Content on desktop if odd) */}
                  <div className={`w-full md:w-1/2 flex ${!isEven ? "md:justify-start md:pl-16" : "hidden md:flex md:justify-end pr-16 md:pr-0"} `}>
                    {!isEven && (
                      <div className="w-full pl-16 md:pl-0 mt-8 md:mt-0">
                        <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 relative group flex flex-col">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-4xl font-heading font-black text-black">
                              {achievement.year}
                            </span>
                            {society && (
                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${society.accentColor} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                {society.shortName}
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl font-heading font-black mb-3 text-slate-900">{achievement.title}</h3>
                          <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed mb-6">{achievement.description}</p>

                          <div className="flex flex-wrap gap-2 mt-auto">
                            {achievement.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 border-2 border-black text-xs font-bold text-slate-700 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
