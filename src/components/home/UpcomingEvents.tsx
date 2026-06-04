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
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              Upcoming <span className="text-gradient">Events</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
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
              className="inline-flex items-center gap-2 text-ieee-blue font-medium hover:text-ieee-blue/80 transition-colors group"
            >
              View Full Calendar
              <span className="w-8 h-8 rounded-full bg-ieee-blue/10 flex items-center justify-center group-hover:bg-ieee-blue group-hover:text-white transition-colors">
                <ArrowUpRight size={16} />
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
              <div className="bg-white rounded-2xl border border-pale-silver overflow-hidden shadow-sm hover:shadow-xl hover:shadow-ieee-blue/10 transition-all duration-300 w-full flex flex-col relative transform hover:-translate-y-2">
                {/* Image Banner Container */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <div className="absolute inset-0 bg-ieee-blue/20 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    {/* Placeholder for actual next/image */}
                    <span className="font-heading text-ieee-blue/50 font-bold text-xl">{event.title.substring(0, 2)}</span>
                  </div>

                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-ieee-blue text-xs font-bold rounded-full uppercase tracking-wide">
                      {event.societyId}
                    </span>
                    {event.status === 'featured' && (
                      <span className="px-3 py-1 bg-accent-cyan/90 backdrop-blur-sm text-ieee-blue text-xs font-bold rounded-full uppercase tracking-wide">
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

                  <div className="space-y-2 mb-6 mt-auto">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon size={16} className="mr-2 text-ieee-blue/70" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {' • '}
                      {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={16} className="mr-2 text-ieee-blue/70" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-pale-silver/50 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {/* Fake attendees avatars */}
                      {[1, 2, 3].map(i => (
                        <div key={`event-avatar-${event.id}-${i}`} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-medium text-slate-500">
                        +42
                      </div>
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      className="text-sm font-semibold text-ieee-blue px-4 py-2 rounded-lg bg-ieee-blue/5 hover:bg-ieee-blue/10 transition-colors"
                    >
                      Register
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
