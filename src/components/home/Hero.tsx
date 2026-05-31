"use client";

import { motion, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Calendar, Cpu, Code, Settings, Sparkles, Users, Lightbulb, Globe, Trophy } from "lucide-react";
import Link from "next/link";
import { MouseEvent as ReactMouseEvent } from "react";

export default function Hero() {
  const headingLines = ["IEEE Student Branch", "NSSCE"];

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

  // Background Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background Orbs movement (Subtle parallax)
  const bgOrbX1 = useTransform(smoothX, [-500, 500], [20, -20]);
  const bgOrbY1 = useTransform(smoothY, [-500, 500], [20, -20]);
  const bgOrbX2 = useTransform(smoothX, [-500, 500], [-30, 30]);
  const bgOrbY2 = useTransform(smoothY, [-500, 500], [-30, 30]);

  // Floating shapes movement (Exaggerated parallax)
  const floatX1 = useTransform(smoothX, [-500, 500], [70, -70]);
  const floatY1 = useTransform(smoothY, [-500, 500], [70, -70]);
  const floatX2 = useTransform(smoothX, [-500, 500], [-90, 90]);
  const floatY2 = useTransform(smoothY, [-500, 500], [-90, 90]);
  const floatX3 = useTransform(smoothX, [-500, 500], [40, -40]);
  const floatY3 = useTransform(smoothY, [-500, 500], [-40, 40]);

  const handleMouseMove = (e: ReactMouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16 bg-[#f8fbff]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Grid & Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

        {/* Animated Background Orbs */}
        <motion.div style={{ x: bgOrbX1, y: bgOrbY1 }} className="absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        </motion.div>
        <motion.div style={{ x: bgOrbX2, y: bgOrbY2 }} className="absolute inset-0">
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-ieee-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </motion.div>


      </div>

      {/* Left Features List (Visible on xl screens and up) */}
      <div className="hidden xl:flex flex-col gap-8 absolute left-8 2xl:left-16 top-1/2 -translate-y-[40%] z-20 w-[280px]">
        {[
          { icon: Users, title: "Learn.", desc: "Access resources, workshops, and expert talks." },
          { icon: Lightbulb, title: "Innovate.", desc: "Collaborate on projects that solve real-world challenges." },
          { icon: Globe, title: "Lead.", desc: "Build leadership skills and make a global impact." }
        ].map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
            className="flex items-start gap-5 group cursor-default"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-sky-100 flex-shrink-0 flex items-center justify-center shadow-md text-[#00629b] group-hover:bg-gradient-to-br group-hover:from-[#00629b] group-hover:to-[#004f7c] group-hover:text-white group-hover:shadow-[0_8px_16px_-4px_rgba(0,98,155,0.4)] group-hover:scale-105 transition-all duration-300">
              <feat.icon size={24} strokeWidth={2} className="group-hover:drop-shadow-md transition-all" />
            </div>
            <div className="pt-1 group-hover:translate-x-1 transition-transform duration-300">
              <h3 className="font-bold text-[#00629b] text-xl mb-1 leading-none">{feat.title}</h3>
              <p className="text-[13px] text-slate-500 leading-snug font-medium">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Stats Card (Visible on xl screens and up) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden xl:flex flex-col gap-6 absolute right-8 2xl:right-16 top-1/2 -translate-y-[40%] z-20 w-[280px]"
      >
        <h3 className="font-bold text-[#2d3748] mb-2 text-xl pl-2">Together, We Achieve</h3>

        <div className="flex flex-col gap-6">
          {[
            { icon: Users, value: "150+", label: "Active Members" },
            { icon: Calendar, value: "50+", label: "Events Every Year" },
            { icon: Trophy, value: "10+", label: "Awards & Recognitions" }
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-5 group cursor-default">
              <div className="w-14 h-14 rounded-full bg-white border border-sky-100 flex items-center justify-center text-[#00629b] flex-shrink-0 shadow-md group-hover:bg-gradient-to-br group-hover:from-[#00629b] group-hover:to-[#004f7c] group-hover:text-white group-hover:shadow-[0_8px_16px_-4px_rgba(0,98,155,0.4)] group-hover:scale-105 transition-all duration-300">
                <stat.icon size={24} strokeWidth={2} className="group-hover:drop-shadow-md transition-all" />
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-300 pt-1">
                <h4 className="font-extrabold text-[#00629b] text-[19px] leading-none mb-1.5">{stat.value}</h4>
                <p className="text-[13px] text-slate-500 leading-snug font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Center Content */}
      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center justify-center h-full relative">

        {/* Main Campus Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl 2xl:max-w-6xl mx-auto mb-0 flex justify-center relative -mt-16 md:-mt-28 2xl:-mt-36 -translate-y-4 md:-translate-y-6 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          {/* Floating Clouds (Bound to image container) */}
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[8%] left-[10%] w-[200px] text-sky-100/60 drop-shadow-sm pointer-events-none -z-10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-auto scale-y-75"><path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5 0-2.362-1.82-4.298-4.131-4.484C17.433 6.634 14.536 4 11 4 7.134 4 4 7.134 4 11c0 .238.012.474.035.705C1.782 12.017 0 13.916 0 16.25 0 18.873 2.127 21 4.75 21h12.75z" /></svg>
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0], x: [0, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[12%] w-[150px] text-sky-200/40 drop-shadow-sm pointer-events-none -z-10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-auto transform -scale-x-100 scale-y-75"><path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5 0-2.362-1.82-4.298-4.131-4.484C17.433 6.634 14.536 4 11 4 7.134 4 4 7.134 4 11c0 .238.012.474.035.705C1.782 12.017 0 13.916 0 16.25 0 18.873 2.127 21 4.75 21h12.75z" /></svg>
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 12, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[5%] left-[45%] w-[120px] text-sky-100/50 drop-shadow-sm pointer-events-none -z-10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-auto scale-y-75"><path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5 0-2.362-1.82-4.298-4.131-4.484C17.433 6.634 14.536 4 11 4 7.134 4 4 7.134 4 11c0 .238.012.474.035.705C1.782 12.017 0 13.916 0 16.25 0 18.873 2.127 21 4.75 21h12.75z" /></svg>
          </motion.div>

          {/* Flying Birds Flock (Bound to image container) */}
          <motion.div
            animate={{ x: ["-10vw", "70vw"], y: ["10vh", "2vh", "12vh"] }}
            transition={{
              x: { duration: 45, repeat: Infinity, ease: "linear" },
              y: { duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
            }}
            className="absolute top-[10%] left-0 w-32 h-32 opacity-60 text-[#2d3748] pointer-events-none -z-10"
          >
            {/* Bird 1 */}
            <motion.div className="absolute top-0 left-0" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 2 */}
            <motion.div className="absolute top-5 left-8" animate={{ y: [0, -8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
              <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 3 */}
            <motion.div className="absolute top-8 left-2" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 4 */}
            <motion.div className="absolute top-12 left-10" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
              <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 5 */}
            <motion.div className="absolute top-[-8px] left-14" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
              <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.35, 1] }} transition={{ duration: 0.62, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 6 */}
            <motion.div className="absolute top-16 left-[-4px]" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
              <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.45, 1] }} transition={{ duration: 0.58, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 7 */}
            <motion.div className="absolute top-7 left-16" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
              <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Flying Birds Flock 2 (Right to Left) */}
          <motion.div
            animate={{ x: ["110vw", "-20vw"], y: ["12vh", "4vh", "15vh"] }}
            transition={{
              x: { duration: 55, repeat: Infinity, ease: "linear", delay: 5 },
              y: { duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
            }}
            className="absolute top-[12%] right-0 w-28 h-28 opacity-50 text-[#2d3748] pointer-events-none -z-10 transform -scale-x-100"
          >
            {/* Bird 1 */}
            <motion.div className="absolute top-2 left-0" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 2 */}
            <motion.div className="absolute top-6 left-10" animate={{ y: [0, -6, 0] }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
              <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 3 */}
            <motion.div className="absolute top-10 left-4" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
              <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.35, 1] }} transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
            {/* Bird 4 */}
            <motion.div className="absolute top-14 left-12" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
              <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}>
                <path d="M2 12 Q 7 5 12 12 Q 17 5 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          </motion.div>

          <img
            src="https://sb-dataset.vercel.app/hero/NSS.png"
            alt="NSSCE Campus"
            className="relative w-full h-auto max-h-[48vh] md:max-h-[52vh] object-contain object-bottom drop-shadow-2xl scale-110 md:scale-[1.15] origin-bottom [mask-image:linear-gradient(to_bottom,black_97%,transparent_100%)] z-10 pointer-events-none"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mb-3 flex flex-col items-center"
        >
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2d3748] leading-none">
            IEEE Student Branch
          </h1>
          <div className="flex items-center gap-4 md:gap-6 mt-2">
            {/* Left Decor Line */}
            <div className="hidden md:flex flex-col items-end gap-1.5 opacity-40">
              <div className="w-12 h-[2px] bg-[#00629b] rounded-full"></div>
              <div className="w-20 h-[2px] bg-[#00629b] rounded-full"></div>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter text-[#00629b] leading-none">
              NSSCE
            </h2>
            {/* Right Decor Line */}
            <div className="hidden md:flex flex-col items-start gap-1.5 opacity-40">
              <div className="w-12 h-[2px] bg-[#00629b] rounded-full"></div>
              <div className="w-20 h-[2px] bg-[#00629b] rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[14px] md:text-base text-slate-500 max-w-[600px] mx-auto mb-6 leading-relaxed font-medium"
        >
          Empowering the next generation of engineers, technologists, and leaders through innovation, community, and global networking.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/societies"
            className="group relative px-8 py-3 bg-[#00629b] text-white rounded-full font-medium shadow-xl shadow-[#00629b]/20 hover:shadow-[#00629b]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Explore Societies
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/events"
            className="px-8 py-3 bg-white text-[#2d3748] rounded-full font-medium hover:bg-slate-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-md border border-slate-100"
          >
            <Calendar size={18} className="text-[#2d3748]" />
            Upcoming Events
          </Link>
        </motion.div>
      </div>

      {/* Floating Engineering Elements (Background) Parallax tracking */}
      <motion.div
        style={{ x: floatX1, y: floatY1 }}
        className="absolute left-[15%] top-[15%] text-sky-200/40 -z-10 pointer-events-none"
      >
        <motion.div animate={{ rotate: [0, 15, 0], y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Cpu size={120} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        className="absolute right-[15%] bottom-[15%] text-ieee-blue/10 -z-10 pointer-events-none"
      >
        <motion.div animate={{ rotate: [0, -15, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Code size={140} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: floatX3, y: floatY3 }}
        className="absolute left-[20%] bottom-[10%] text-slate-300/30 -z-10 pointer-events-none"
      >
        <motion.div animate={{ rotate: [0, 30, 0], y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <Settings size={90} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
