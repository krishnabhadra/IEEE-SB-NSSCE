"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { members } from "@/data/members";
import { societies } from "@/data/societies";

const SocialIcon = ({ name }: { name: string }) => {
  if (name === "linkedin") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
  if (name === "github") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
  return null;
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>("execom");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const years = Array.from({ length: 2026 - 2018 + 1 }, (_, i) => 2026 - i);

  const tabs = [
    { id: "execom", name: "SB ExeCom" },
    ...societies.map(s => ({ id: s.id, name: s.shortName }))
  ];

  const filteredMembers = members.filter(member => {
    const matchesTab = member.societyId === activeTab;
    const matchesYear = member.year === selectedYear;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesYear && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50">
          <div className="w-[800px] h-[800px] bg-ieee-blue/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            Meet the <span className="text-gradient">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            The dedicated individuals working tirelessly to build a strong community of innovators and leaders.
          </motion.p>
        </div>
      </section>

      {/* Controls: Search and Tabs */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <div className="flex flex-col items-center gap-8">
          {/* Search and Year Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl">
            {/* Year Selector */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full md:w-auto"
            >
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full md:w-40 px-4 py-4 rounded-full bg-white border border-pale-silver focus:outline-none focus:ring-2 focus:ring-ieee-blue/50 shadow-sm transition-all text-muted-foreground font-medium appearance-none cursor-pointer text-center"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year} ExeCom</option>
                ))}
              </select>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full flex-1"
            >
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search members by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-pale-silver focus:outline-none focus:ring-2 focus:ring-ieee-blue/50 shadow-sm transition-all"
              />
            </motion.div>
          </div>

          {/* Tabs Container with Arrows */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full relative flex items-center"
          >
            {/* Left Arrow */}
            <button 
              onClick={() => scrollTabs('left')}
              className="absolute left-0 z-10 w-8 h-full bg-gradient-to-r from-slate-50 to-transparent flex items-center justify-start text-muted-foreground hover:text-ieee-blue transition-colors focus:outline-none hidden md:flex"
            >
              <ChevronLeft size={24} className="bg-white rounded-full shadow-sm" />
            </button>

            <div 
              ref={tabsRef}
              className="w-full overflow-x-auto pb-4 pt-1 no-scrollbar md:px-8"
            >
              <div className="flex items-center gap-2 px-4 w-max">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        isActive ? "text-ieee-blue" : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                      }`}
                    >
                      <span className="relative z-10">{tab.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white border border-pale-silver shadow-sm rounded-full z-0"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => scrollTabs('right')}
              className="absolute right-0 z-10 w-8 h-full bg-gradient-to-l from-slate-50 to-transparent flex items-center justify-end text-muted-foreground hover:text-ieee-blue transition-colors focus:outline-none hidden md:flex"
            >
              <ChevronRight size={24} className="bg-white rounded-full shadow-sm" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-3xl p-6 border border-pale-silver/50 hover:border-ieee-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ieee-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Photo Placeholder */}
                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-md mb-6 relative overflow-hidden flex items-center justify-center text-4xl text-slate-300 font-bold">
                  {member.name.charAt(0)}
                </div>

                <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-ieee-blue text-sm font-medium mb-6">{member.position}</p>

                {/* Social Links that slide up on hover */}
                <div className="mt-auto flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-muted-foreground hover:text-ieee-blue hover:bg-ieee-blue/10 transition-colors">
                      <SocialIcon name="linkedin" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-muted-foreground hover:text-ieee-blue hover:bg-ieee-blue/10 transition-colors">
                      <SocialIcon name="github" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredMembers.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                No members found matching your search criteria.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
