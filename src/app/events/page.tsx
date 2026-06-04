"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar as CalendarIcon, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { events } from "@/data/events";
import { societies } from "@/data/societies";

const EventCard = ({ event }: { event: typeof events[0] }) => {
  const society = societies.find(s => s.id === event.societyId);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group h-full flex outline-none"
    >
      <div className="bg-white rounded-xl border-2 border-black p-4 md:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 w-full flex flex-col relative">
        {/* Image Banner */}
        <div className="relative h-48 w-full bg-slate-100 rounded-lg border-2 border-black overflow-hidden mb-5">
          <div className={`absolute inset-0 ${society?.accentColor || 'bg-ieee-blue'} opacity-20 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
            <span className="font-heading text-slate-800/40 font-black text-4xl uppercase px-4 text-center leading-none">
              {event.title.substring(0, 15)}
            </span>
          </div>
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
            {society && (
              <span className={`px-3 py-1.5 text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black ${society.accentColor}`}>
                {society.shortName}
              </span>
            )}
            {event.status === 'featured' && (
              <span className="px-3 py-1.5 bg-[#FFD700] text-black text-xs font-bold rounded-lg uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="font-heading font-black text-2xl mb-3 line-clamp-2 text-slate-900 leading-tight">
            {event.title}
          </h3>

          <p className="text-slate-700 font-medium text-sm line-clamp-3 mb-6">
            {event.description}
          </p>

          <div className="space-y-3 mb-6 mt-auto bg-slate-50 border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center text-sm text-slate-900 font-bold">
              <CalendarIcon size={18} className="mr-3 text-ieee-blue" />
              {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center text-sm text-slate-900 font-bold">
              <MapPin size={18} className="mr-3 text-ieee-blue" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href={`/events/${event.slug}`}
              className="text-sm font-black uppercase tracking-widest text-ieee-blue group-hover:text-accent-cyan transition-colors flex items-center gap-2"
            >
              {event.status === 'past' ? 'View Recap' : 'Register Now'}
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSociety, setActiveSociety] = useState<string>("all");
  const [activeYear, setActiveYear] = useState<string>("all");

  const years = Array.from(new Set(events.map(e => new Date(e.date).getFullYear().toString()))).sort((a, b) => parseInt(b) - parseInt(a));

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSociety = activeSociety === "all" || event.societyId === activeSociety;
    const matchesYear = activeYear === "all" || new Date(event.date).getFullYear().toString() === activeYear;
    return matchesSearch && matchesSociety && matchesYear;
  });

  const featuredEvents = filteredEvents.filter(e => e.status === "featured");
  const upcomingEvents = filteredEvents.filter(e => e.status === "upcoming");
  const pastEvents = filteredEvents.filter(e => e.status === "past");



  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-heading font-black mb-8 text-slate-900 tracking-tight"
              >
                Explore <span className="relative inline-block"><span className="relative z-10 text-white">Events</span><span className="absolute -bottom-1 left-0 w-full h-full bg-ieee-blue -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative max-w-xl"
              >
                <div className="absolute inset-0 bg-[#FFD700] translate-x-1 translate-y-1 rounded-2xl pointer-events-none border-2 border-black" />
                <div className="absolute inset-0 bg-[#FFA000] translate-x-2 translate-y-2 rounded-2xl pointer-events-none border-2 border-black" />
                <div className="relative bg-white border-2 border-black p-4 rounded-2xl z-10 shadow-sm">
                  <p className="text-lg text-slate-800 font-medium">
                    Discover workshops, tech talks, hackathons, and networking sessions hosted by our 13 societies.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-auto md:min-w-[320px] relative mt-6 md:mt-0"
            >
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black z-20">
                <Search size={22} className="stroke-[3px]" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all text-slate-900 font-bold placeholder-slate-500 relative z-10"
              />
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 border-y-2 border-black border-dashed py-6"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest bg-[#FFD700] px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Society</span>
              <select
                value={activeSociety}
                onChange={(e) => setActiveSociety(e.target.value)}
                className="flex-1 bg-white border-2 border-black rounded-xl px-4 py-2.5 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus:outline-none cursor-pointer appearance-none text-center transition-all"
              >
                <option value="all">All Societies</option>
                {societies.map(s => (
                  <option key={s.id} value={s.id}>{s.shortName}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest bg-accent-cyan px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Year</span>
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="flex-1 bg-white border-2 border-black rounded-xl px-4 py-2.5 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus:outline-none cursor-pointer appearance-none text-center transition-all"
              >
                <option value="all">All Years</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 lg:px-20">
        <AnimatePresence mode="popLayout">
          {featuredEvents.length > 0 && (
            <motion.div key="featured-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-16">
              <h2 className="text-2xl font-heading font-black mb-8 inline-block bg-[#FFD700] px-6 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                Featured Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}

          {upcomingEvents.length > 0 && (
            <motion.div key="upcoming-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-16">
              <h2 className="text-2xl font-heading font-black mb-8 inline-block bg-ieee-blue text-white px-6 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}

          {pastEvents.length > 0 && (
            <motion.div key="past-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-heading font-black mb-8 inline-block bg-slate-200 text-slate-800 px-6 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}

          {filteredEvents.length === 0 && (
            <motion.div key="no-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center font-bold text-slate-800 border-4 border-dashed border-black bg-[#FFD700] rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
              No events found matching your criteria. Try adjusting the filters!
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
