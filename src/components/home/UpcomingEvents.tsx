"use client";

import { motion } from "framer-motion";
import { events } from "@/data/events";
import { Calendar as CalendarIcon, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function UpcomingEvents() {
  const upcomingEvents = events.filter(e => e.status === "upcoming" || e.status === "featured").slice(0, 3);

  return (
    <section className="pt-12 pb-32 relative bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-black mb-8 text-slate-900"
            >
              Upcoming <span className="relative inline-block"><span className="relative z-10 text-white">Events</span><span className="absolute -bottom-1 left-0 w-full h-full bg-ieee-blue -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-800 font-medium text-lg"
            >
              Join us for our upcoming workshops, hackathons, and technical talks to level up your skills.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#FFD700] border-2 border-black rounded-xl text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group"
            >
              View Full Calendar
              <span className="w-8 h-8 rounded-full bg-black text-[#FFD700] flex items-center justify-center transition-colors">
                <ArrowUpRight size={18} className="stroke-[3px]" />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="group h-full flex"
            >
              <div className="bg-white rounded-xl border-2 border-black p-4 md:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 w-full flex flex-col relative">
                {/* Image Banner Container */}
                <div className="relative h-48 w-full bg-slate-100 rounded-lg border-2 border-black overflow-hidden mb-5">
                  <div className="absolute inset-0 bg-ieee-blue/20 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <span className="font-heading text-slate-800/40 font-black text-4xl uppercase px-4 text-center leading-none">{event.title.substring(0, 15)}</span>
                  </div>

                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                      {event.societyId}
                    </span>
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

                  <div className="space-y-3 mb-6 mt-auto bg-slate-50 border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center text-sm text-slate-900 font-bold">
                      <CalendarIcon size={18} className="mr-3 text-ieee-blue" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {' • '}
                      {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center text-sm text-slate-900 font-bold">
                      <MapPin size={18} className="mr-3 text-ieee-blue" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {/* Fake attendees avatars */}
                      {[1, 2, 3].map(i => (
                        <div key={`event-avatar-${event.id}-${i}`} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-[10px] font-black text-slate-800 z-10">
                        +42
                      </div>
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      className="text-sm font-black uppercase tracking-widest text-ieee-blue group-hover:text-accent-cyan transition-colors"
                    >
                      {event.status === 'past' ? 'View Details' : 'Register Now'}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {upcomingEvents.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-pale-silver rounded-2xl">
              No upcoming events at the moment. Check back soon!
            </div>
          )}
        </div>
      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 text-sky-50">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
