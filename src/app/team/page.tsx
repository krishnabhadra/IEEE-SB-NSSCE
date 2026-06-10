"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Pin } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { members } from "@/data/members";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-48 bg-slate-200/50 animate-pulse rounded-xl border-2 border-slate-300/50"></div>
    </div>
  )
});
import { societies } from "@/data/societies";

const CURRENT_TEAM_YEAR = 2026;
const YEARS = Array.from({ length: CURRENT_TEAM_YEAR - 2018 + 1 }, (_, i) => CURRENT_TEAM_YEAR - i);

const HIDDEN_SOCIETIES_CONFIG: Record<string, number[]> = {
  mtts: [2023, 2022, 2021, 2020, 2019, 2018],
  edsoc: [2021, 2020, 2019, 2018],
  ies: [2020, 2019, 2018],
  cs: [2019, 2018],
  ras: [2019, 2018],
  comsoc: [2019, 2018],
  ims: [2019, 2018],
  vts: [2019, 2018],
  sight: [2019, 2018],
  pels: [2018]
};

const TEAM_TABS_CONFIG = [
  { id: "web-team", name: "Web Team", hiddenYears: [2025, 2024, 2023, 2022, 2021, 2019, 2018] },
  { id: "media-team", name: "Media Team", hiddenYears: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018] },
  { id: "design-team", name: "Design Team", hiddenYears: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018] },
  { id: "content-team", name: "Content Team", hiddenYears: [2025, 2024, 2023, 2022, 2021, 2018] }
];

function isTabHiddenForYear(tabId: string, year: number) {
  const isHiddenTeam = TEAM_TABS_CONFIG.some(t => t.id === tabId && t.hiddenYears.includes(year));
  const isHiddenSociety = HIDDEN_SOCIETIES_CONFIG[tabId]?.includes(year) ?? false;

  return isHiddenTeam || isHiddenSociety;
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>("execom");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_TEAM_YEAR);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);

    if (isTabHiddenForYear(activeTab, year)) {
      setActiveTab("execom");
    }
  };

  const tabs = useMemo(() => [
    { id: "execom", name: "SB ExeCom" },
    ...societies
      .filter(s => {
        const hiddenYears = HIDDEN_SOCIETIES_CONFIG[s.id];
        if (hiddenYears && hiddenYears.includes(selectedYear)) return false;
        return true;
      })
      .map(s => ({ id: s.id, name: s.shortName })),
    ...TEAM_TABS_CONFIG
      .filter(t => !t.hiddenYears.includes(selectedYear))
      .map(t => ({ id: t.id, name: t.name }))
  ], [selectedYear]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase();

    return members.filter(member => {
      const matchesTab = member.societyId === activeTab;
      const matchesYear = member.year === selectedYear;
      const matchesSearch = member.name.toLowerCase().includes(normalizedSearch) ||
        member.position.toLowerCase().includes(normalizedSearch);
      return matchesTab && matchesYear && matchesSearch;
    });
  }, [activeTab, searchQuery, selectedYear]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50">
          <div className="w-[800px] h-[800px] bg-ieee-blue/5 rounded-full blur-[100px]" />
        </div>

        {/* Lanyard Component */}
        <div className="absolute top-0 left-4 md:left-10 w-[200px] md:w-[350px] h-[400px] md:h-[500px] z-30 pointer-events-auto hidden lg:block">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
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
            className="w-72 bg-[#FFEB3B] p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            style={{ transformOrigin: "top center" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500">
              <Pin size={32} fill="currentColor" className="drop-shadow-sm rotate-12" />
            </div>
            <p className="text-sm text-black font-bold leading-relaxed italic mb-4 mt-2">
              {"\"Leadership is not about titles or positions; it's about the actions we take and the impact we make.\""}
            </p>
            <p className="text-xs text-black font-black text-right">
              - Ramon De la Cruz<br />
              <span className="font-bold text-[10px] uppercase tracking-wider text-slate-800">IEEE Engineering Leadership</span>
            </p>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black mb-10 text-slate-900 tracking-tight"
          >
            Meet the <span className="relative inline-block"><span className="relative z-10 text-white">Team</span><span className="absolute -bottom-1 left-0 w-full h-full bg-ieee-blue -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
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
                The dedicated individuals working tirelessly to build a strong community of innovators and leaders.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls: Search and Tabs */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <div className="flex flex-col items-center gap-8">
          {/* Search and Year Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl">
            {/* Year Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full md:w-auto relative group"
            >
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="w-full md:w-48 px-4 py-4 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all text-slate-900 font-bold appearance-none cursor-pointer text-center relative z-10"
              >
                {YEARS.map(year => (
                  <option key={year} value={year}>{year} ExeCom</option>
                ))}
              </select>
              {/* Fake dropdown arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-black"></div>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full flex-1"
            >
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black z-20">
                <Search size={24} className="stroke-[3px]" />
              </div>
              <input
                type="text"
                placeholder="Search members by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all text-slate-900 font-bold placeholder-slate-500 relative z-10"
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
              className="w-full overflow-x-auto pb-6 pt-2 no-scrollbar md:px-8"
            >
              <div className="flex items-center gap-4 px-4 w-max">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 border-black ${isActive
                        ? "bg-[#FFD700] text-black translate-x-[2px] translate-y-[2px] shadow-none"
                        : "bg-white text-slate-800 hover:bg-slate-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                    >
                      <span className="relative z-10">{tab.name}</span>
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative h-full flex flex-col outline-none"
              >
                {/* Interactive Shadow Base */}
                <div className="absolute inset-0 bg-ieee-blue translate-x-2 translate-y-2 rounded-xl pointer-events-none transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />

                {/* Main Card */}
                <div className="relative h-full w-full bg-white border-2 border-black p-3 sm:p-4 md:p-5 rounded-xl z-10 flex flex-col items-center text-center transition-transform duration-300 transform group-hover:translate-x-1 group-hover:translate-y-1">

                  {/* Photo Container (Square Polaroid style) */}
                  <div className="relative w-full aspect-square rounded-lg border-2 border-black bg-slate-50 overflow-hidden mb-3 sm:mb-5 flex items-center justify-center text-5xl text-slate-300 font-bold shadow-inner">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col items-center flex-grow w-full justify-between">
                    <h3 className="font-heading font-black text-base sm:text-xl mb-3 sm:mb-4 text-slate-900 leading-tight">
                      {member.name}
                    </h3>

                    {/* Position Badge */}
                    <div className="w-full px-3 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 bg-[#FFD700] border-2 border-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] leading-tight">
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
