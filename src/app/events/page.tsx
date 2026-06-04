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
      className="group h-full flex"
    >
      <div className="bg-white rounded-2xl border border-pale-silver overflow-hidden shadow-sm hover:shadow-xl hover:shadow-ieee-blue/10 transition-all duration-300 w-full flex flex-col relative transform hover:-translate-y-2">
        {/* Image Banner */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <div className={`absolute inset-0 ${society?.accentColor || 'bg-ieee-blue'} opacity-20 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
            <span className="font-heading text-slate-800/20 font-black text-4xl uppercase px-4 text-center leading-none">
              {event.title.substring(0, 15)}
            </span>
          </div>
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            {society && (
              <span className={`px-3 py-1 text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-sm ${society.accentColor}`}>
                {society.shortName}
              </span>
            )}
            {event.status === 'featured' && (
              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full uppercase tracking-wide shadow-sm">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-heading font-bold text-xl mb-3 line-clamp-2 group-hover:text-ieee-blue transition-colors">
            {event.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
            {event.description}
          </p>

          <div className="space-y-2 mb-6 mt-auto">
            <div className="flex items-center text-sm text-slate-600 font-medium">
              <CalendarIcon size={16} className="mr-2 text-ieee-blue/70" />
              {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center text-sm text-slate-600 font-medium">
              <MapPin size={16} className="mr-2 text-ieee-blue/70" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-pale-silver/50 flex items-center justify-between">
            <Link
              href={`/events/${event.slug}`}
              className="text-sm font-semibold text-ieee-blue group-hover:text-ieee-blue/80 transition-colors flex items-center gap-1"
            >
              {event.status === 'past' ? 'View Recap' : 'Register Now'}
              <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-heading font-bold mb-4"
              >
                Explore <span className="text-gradient">Events</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground max-w-xl"
              >
                Discover workshops, tech talks, hackathons, and networking sessions hosted by our 13 societies.
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-auto md:min-w-[300px] relative"
            >
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-pale-silver shadow-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue/50"
              />
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 border-y border-pale-silver/50 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Society:</span>
              <select
                value={activeSociety}
                onChange={(e) => setActiveSociety(e.target.value)}
                className="bg-transparent border border-pale-silver rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue/50"
              >
                <option value="all">All Societies</option>
                {societies.map(s => (
                  <option key={s.id} value={s.id}>{s.shortName}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Year:</span>
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="bg-transparent border border-pale-silver rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue/50"
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
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-accent-cyan rounded-full inline-block"></span>
                Featured Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}

          {upcomingEvents.length > 0 && (
            <motion.div key="upcoming-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-16">
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-ieee-blue rounded-full inline-block"></span>
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}

          {pastEvents.length > 0 && (
            <motion.div key="past-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2 text-slate-500">
                <span className="w-2 h-6 bg-slate-300 rounded-full inline-block"></span>
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75 hover:opacity-100 transition-opacity duration-300">
                {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}

          {filteredEvents.length === 0 && (
            <motion.div key="no-events" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center text-muted-foreground border-2 border-dashed border-pale-silver rounded-2xl">
              No events found matching your criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
