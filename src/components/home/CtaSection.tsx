"use client";

import { motion } from "framer-motion";
import { UserPlus, HeartHandshake, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

const ctaCards = [
  {
    title: "Join IEEE",
    description: "Become a member of the world's largest technical professional organization.",
    icon: UserPlus,
    link: "https://www.ieee.org/membership/join/index.html",
    external: true,
  },
  {
    title: "Become a Volunteer",
    description: "Contribute to organizing events and shaping the future of our student branch.",
    icon: HeartHandshake,
    link: "/team#volunteer",
    external: false,
  },
  {
    title: "Explore Events",
    description: "Participate in workshops, hackathons, and technical talks to level up.",
    icon: Compass,
    link: "/events",
    external: false,
  }
];

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-white" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            Ready to <span className="text-gradient">Get Involved?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Take the next step in your professional journey. Join our community of innovators and leaders today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctaCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              >
                <Link
                  href={card.link}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group block h-full"
                >
                  <div className="h-full p-8 rounded-3xl glass border border-pale-silver/50 hover:border-ieee-blue/30 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ieee-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="w-16 h-16 rounded-2xl bg-ieee-blue/10 text-ieee-blue flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ieee-blue group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon size={32} />
                    </div>

                    <h3 className="font-heading font-bold text-2xl mb-4 group-hover:text-ieee-blue transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-muted-foreground mb-8 flex-grow">
                      {card.description}
                    </p>

                    <div className="flex items-center justify-center w-12 h-12 rounded-full border border-pale-silver group-hover:border-ieee-blue group-hover:bg-ieee-blue text-foreground group-hover:text-white transition-all duration-300">
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
