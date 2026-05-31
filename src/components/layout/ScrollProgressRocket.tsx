"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollProgressRocket() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  // Show the rocket only after scrolling down 5% of the page
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.05);
    });
  }, [scrollYProgress]);

  // Transform scroll progress (0 to 1) to SVG stroke dash offset
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleLaunch = async () => {
    // 1. Subtle shake and launch upwards
    await controls.start({
      y: [0, 2, -2, 2, -2, 0, -800],
      transition: { 
        duration: 1.2, 
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], 
        ease: "easeIn" 
      }
    });
    
    // 2. Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // 3. Reset rocket position after a short delay
    setTimeout(() => {
      controls.set({ y: 100 });
      controls.start({ 
        y: 0, 
        transition: { type: "spring", stiffness: 200, damping: 20 } 
      });
    }, 800);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] pointer-events-none"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div 
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer group"
        onClick={handleLaunch}
      >
        {/* Background Circle */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 transition-transform duration-300 group-hover:scale-105" />
        
        {/* Progress SVG */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
          viewBox="0 0 100 100"
        >
          <circle 
            cx="50" cy="50" r="46" 
            className="stroke-slate-100 fill-none" 
            strokeWidth="6" 
          />
          <motion.circle 
            cx="50" cy="50" r="46" 
            className="stroke-ieee-blue fill-none" 
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* The Rocket */}
        <motion.div
          animate={controls}
          className="relative z-10 flex flex-col items-center justify-center"
        >
          <Rocket 
            size={24} 
            className="text-ieee-blue group-hover:text-accent-cyan transition-colors group-hover:-translate-y-1 duration-300 relative z-10 -rotate-45" 
          />
          
          {/* Rocket Flames on hover */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <div className="w-2.5 h-4 bg-gradient-to-b from-orange-500 to-transparent rounded-b-full blur-[1px] animate-pulse" />
            <div className="w-1.5 h-6 bg-gradient-to-b from-yellow-300 to-transparent rounded-b-full blur-[1px] absolute top-0 animate-pulse delay-75" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
