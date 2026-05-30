"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show the preloader for exactly 2.5 seconds for the full rocket effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Generate some random stars for the background
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
          }}
          className="fixed inset-0 z-[100] bg-[#0a0f1c] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Moving Stars Background */}
          <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                }}
                animate={{
                  y: [0, 1000],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  y: {
                    duration: star.duration,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: {
                    duration: star.duration,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 1],
                  },
                  delay: star.delay,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* The Rocket */}
            <motion.div
              animate={{
                y: [0, 2, -2, 2, -2, 0, -800], // Shakes then shoots up
                scale: [1, 1, 1, 1, 1, 1, 1.5], // Grows slightly as it comes closer while shooting up
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], // Shakes for 1.1s, then shoots up for 1.1s
                ease: "anticipate",
              }}
              className="relative flex justify-center items-center"
            >
              <Rocket size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
              
              {/* Exhaust Flames */}
              <motion.div
                animate={{
                  height: [20, 60, 30, 80, 40, 150, 0],
                  opacity: [0.8, 1, 0.8, 1, 0.8, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                  ease: "easeInOut",
                }}
                className="absolute top-[75px] w-8 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-b-full blur-[2px] -z-10"
              />
              <motion.div
                animate={{
                  height: [10, 40, 20, 50, 20, 100, 0],
                  opacity: [0.6, 0.8, 0.6, 0.8, 0.6, 0.8, 0],
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                  ease: "easeInOut",
                }}
                className="absolute top-[75px] w-4 bg-gradient-to-b from-white via-yellow-200 to-transparent rounded-b-full blur-[1px] -z-10"
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              animate={{
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, 20],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              className="mt-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-widest uppercase mb-2">
                IEEE SB NSSCE
              </h2>
              <div className="flex items-center justify-center gap-2">
                <p className="text-ieee-blue font-medium tracking-widest text-sm uppercase">
                  Preparing for Launch
                </p>
                {/* Animated ellipsis */}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="text-ieee-blue text-xl leading-none"
                >
                  ...
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
