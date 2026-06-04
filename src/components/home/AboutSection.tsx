"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, CalendarCheck, Trophy, Layers } from "lucide-react";

// Counter component for the animated numbers
function AnimatedCounter({ value, label, icon: Icon }: { value: number, label: string, icon: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, springValue, value, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-white border border-pale-silver shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ieee-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-12 h-12 rounded-full bg-ieee-blue/10 text-ieee-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <motion.span className="text-4xl font-heading font-bold text-foreground">
          {displayValue}
        </motion.span>
        <span className="text-2xl font-bold text-ieee-blue">+</span>
      </div>

      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  const stats = [
    { value: 500, label: "Active Members", icon: Users },
    { value: 120, label: "Events Conducted", icon: CalendarCheck },
    { value: 45, label: "Awards Won", icon: Trophy },
    { value: 13, label: "IEEE Societies", icon: Layers },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-sky-50">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ieee-blue/10 text-ieee-blue text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-ieee-blue"></span>
              About Our Chapter
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Driving Technological <span className="text-gradient">Excellence</span> Since 2001
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                The IEEE Student Branch at NSS College of Engineering is a vibrant community of passionate students dedicated to advancing technology for humanity.
              </p>
              <p>
                With 13 distinct technical societies, we provide a platform for students to collaborate, innovate, and develop leadership skills that will shape the future of engineering and technology globally.
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={`about-avatar-${i}`} className={`w-12 h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-white z-${5 - i}`} style={{ backgroundColor: ['#00629B', '#00C2FF', '#5F9EA0', '#FF9900'][i - 1] }}>
                    {['C', 'P', 'R', 'W'][i - 1]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-foreground">Join 500+ innovators</span>
                <span className="text-sm text-muted-foreground">in our growing community</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className={i % 2 === 1 ? "mt-0 md:mt-12" : ""}>
                <AnimatedCounter value={stat.value} label={stat.label} icon={stat.icon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
