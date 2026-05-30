"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const headingText = "IEEE Student Branch\nNSSCE";
  const letters = Array.from(headingText);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Calm static background */}
      <div className="absolute inset-0 z-0 bg-white pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(118deg,#ffffff_0%,#f3fbff_36%,#f8fbff_68%,#ffffff_100%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 text-center flex flex-col items-center">
        {/* Minimal Transparent Outline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative px-6 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md hover:bg-white/80 hover:shadow-lg hover:border-ieee-blue/30 transition-all duration-300 inline-flex items-center gap-3 group cursor-default shadow-sm">
            {/* Static dot */}
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ieee-blue group-hover:scale-150 transition-transform"></span>
            </div>
            <span className="font-bold tracking-wide text-sm bg-gradient-to-r from-ieee-blue to-accent-cyan bg-clip-text text-transparent">
              Innovating Since 2001
            </span>
            <ArrowRight size={14} className="text-accent-cyan opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </div>
        </motion.div>

        {/* Main Heading with staggered characters */}
        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => {
            if (letter === '\n') return <br key={index} />;
            return (
              <motion.span
                key={index}
                variants={child}
                className={letter === " " ? "inline-block w-[0.3em]" : "inline-block text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70"}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Empowering the next generation of engineers, technologists, and leaders through innovation, community, and global networking.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/societies"
            className="group relative px-8 py-4 bg-ieee-blue text-white rounded-full font-medium shadow-lg shadow-ieee-blue/25 hover:shadow-ieee-blue/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Explore Societies
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/events"
            className="px-8 py-4 glass text-foreground rounded-full font-medium hover:bg-white/80 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 border border-pale-silver/50 shadow-sm"
          >
            <Calendar size={18} className="text-ieee-blue" />
            Upcoming Events
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
