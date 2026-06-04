"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Pin } from "lucide-react";
import Image from "next/image";
import { members } from "@/data/members";
import { societies } from "@/data/societies";



export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>("execom");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
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
    ...societies.map(s => ({ id: s.id, name: s.shortName })),
    { id: "web-team", name: "Web Team" },
    { id: "media-team", name: "Media Team" },
    { id: "design-team", name: "Design Team" },
    { id: "content-team", name: "Content Team" }
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

        {/* Sticky Note Quote (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden xl:block absolute top-10 right-10 2xl:right-20 z-20"
        >
          <motion.div
            animate={{ rotate: [3, -1, 3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            whileHover={{ rotate: 3, transition: { duration: 0.2 } }}
            className="w-72 bg-amber-50/90 backdrop-blur-sm p-6 shadow-xl border border-amber-200/50 cursor-pointer hover:shadow-2xl transition-shadow"
            style={{ borderRadius: "15px 2px 15px 2px", transformOrigin: "top center" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-slate-500/80">
              <Pin size={24} fill="currentColor" className="drop-shadow-md" />
            </div>
            <p className="text-sm text-slate-800 font-medium leading-relaxed italic mb-3">
              "Leadership is not about titles or positions; it's about the actions we take and the impact we make."
            </p>
            <p className="text-xs text-slate-500 font-semibold text-right">
              - Ramon De la Cruz<br />
              <span className="font-normal text-[10px] uppercase tracking-wider">IEEE Engineering Leadership</span>
            </p>
          </motion.div>
        </motion.div>

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
                      className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${isActive ? "text-ieee-blue" : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
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
                className="group relative rounded-3xl p-[1.5px] shadow-lg shadow-sky-900/5 hover:shadow-2xl hover:shadow-ieee-blue/20 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Gradient Border Wrapper */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-50 group-hover:from-ieee-blue group-hover:to-accent-cyan rounded-3xl transition-colors duration-500" />

                {/* Inner Card Content */}
                <div className="relative w-full h-full bg-white rounded-[22px] overflow-hidden flex flex-col items-center text-center z-10 pt-6 pb-6 px-6">
                  {/* Decorative Top Banner */}
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-sky-50 via-sky-100 to-white opacity-80 group-hover:from-sky-100 group-hover:to-sky-50 transition-colors duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ieee-blue/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform duration-500" />

                  {/* Photo with Gradient Ring */}
                  <div className="relative z-10 mt-6 mb-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-ieee-blue to-accent-cyan rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    <div className="p-[3px] rounded-full bg-gradient-to-br from-slate-200 to-slate-100 group-hover:from-ieee-blue group-hover:to-accent-cyan transition-all duration-500 relative z-10">
                      <div className="w-36 h-36 rounded-full border-[3px] border-white bg-slate-50 relative overflow-hidden flex items-center justify-center text-4xl text-slate-300 font-bold shadow-inner">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            sizes="144px"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center flex-grow">
                    <h3 className="font-heading font-bold text-xl mb-1 text-slate-800 group-hover:text-ieee-blue transition-colors duration-300">{member.name}</h3>
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-sky-50 text-ieee-blue text-[11px] font-bold uppercase tracking-wider mb-2 group-hover:bg-ieee-blue group-hover:text-white transition-colors duration-300">
                      {member.position}
                    </div>
                  </div>
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
