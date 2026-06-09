"use client";

import Image from "next/image";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, CalendarCheck, Trophy, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Counter component for the animated numbers
function AnimatedCounter({ value, label, icon: Icon }: { value: number, label: string, icon: LucideIcon }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimatedRef = useRef(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      springValue.set(value);
      hasAnimatedRef.current = true;
    }
  }, [isInView, springValue, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-3 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] flex flex-col items-center justify-center text-center relative transition-all duration-300 group"
    >
      <div className="w-8 h-8 rounded-lg bg-[#FFD700] border-2 border-black text-black flex items-center justify-center mb-2 group-hover:-translate-y-1 transition-all duration-300">
        <Icon size={16} className="stroke-[2.5px]" />
      </div>

      <div className="flex items-baseline gap-0.5 mb-1">
        <motion.span className="text-lg md:text-xl font-heading font-black text-slate-900">
          {displayValue}
        </motion.span>
        <span className="text-base md:text-lg font-black text-ieee-blue">+</span>
      </div>

      <span className="text-[8px] md:text-[9px] font-black text-slate-700 uppercase tracking-wide leading-tight">{label}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  const stats = [
    { value: 150, label: "Active Members", icon: Users },
    { value: 150, label: "Events Conducted", icon: CalendarCheck },
    { value: 80, label: "Awards & Recognitions", icon: Trophy },
    { value: 13, label: "IEEE Societies", icon: Layers },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-sky-50">
      {/* Decorative background element */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/3 h-1/2 bg-accent-cyan/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD700] text-black text-xs font-bold uppercase tracking-widest mb-6 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              About Our Chapter
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-black mb-10 leading-tight text-slate-900">
              Driving Technological <span className="relative inline-block"><span className="relative z-10 text-white px-2">Excellence</span><span className="absolute -bottom-1 left-0 w-full h-full bg-accent-cyan -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span> Since 1987
            </h2>

            <div className="space-y-6 text-lg text-slate-800 font-medium">
              <p>
                The IEEE Student Branch at NSS College of Engineering is a vibrant community of passionate students dedicated to advancing technology for humanity.
              </p>
              <p>
                With 13 distinct technical societies, we provide a platform for students to collaborate, innovate, and develop leadership skills that will shape the future of engineering and technology globally.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} />
              ))}
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <div className="flex flex-col w-full mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="relative w-full aspect-[1080/879] max-w-lg mx-auto lg:max-w-none lg:mx-0"
            >
              {/* Neobrutalist shadow layers */}
              <div className="absolute inset-0 bg-[#FFD700] rounded-3xl translate-x-3 translate-y-3 border-2 border-black transition-transform duration-300 group-hover:translate-x-5 group-hover:translate-y-5"></div>
              <div className="absolute inset-0 bg-accent-cyan rounded-3xl translate-x-1.5 translate-y-1.5 border-2 border-black"></div>

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-3xl border-2 border-black overflow-hidden bg-white z-10 group cursor-pointer">
                <Image
                  src="https://sb-dataset.vercel.app/about/about.png"
                  alt="About IEEE SB NSSCE"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0"></div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 -left-2 md:-left-6 bg-white py-2 px-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex items-center gap-2.5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center text-black border-2 border-black shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.2)]">
                  <Trophy size={18} className="stroke-[2.5px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 leading-none uppercase tracking-wide">Premier</span>
                  <span className="text-xs font-bold text-ieee-blue leading-none mt-1">Student Branch</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Avatars below image */}
            <div className="flex justify-end mt-16 lg:mt-12 w-full">
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={`about-avatar-${i}`} className="w-12 h-12 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold text-white relative" style={{ backgroundColor: ['#00629B', '#00C2FF', '#5F9EA0', '#FF9900'][i - 1], zIndex: 5 - i }}>
                      {['C', 'P', 'R', 'W'][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center text-left">
                  <span className="font-black text-slate-900 text-sm sm:text-base">Join 500+ innovators</span>
                  <span className="text-xs sm:text-sm text-slate-600 font-bold">in our growing community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
