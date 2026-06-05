"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MarqueeProps {
  text: string;
  repeat?: number;
  rotate?: string;
  bgColor?: string;
  textColor?: string;
  direction?: "left" | "right";
}

export default function Marquee({
  text = "IEEE SB NSSCE",
  repeat = 10,
  rotate = "-rotate-2",
  bgColor = "bg-pink-300",
  textColor = "text-black",
  direction = "left",
}: MarqueeProps) {
  const xAnimation = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
  
  return (
    <div className={`relative w-[110vw] left-1/2 -translate-x-1/2 ${rotate} ${bgColor} border-y-4 border-black overflow-hidden py-2 -my-3 z-20`}>
      <div className="flex whitespace-nowrap">
        <motion.div
          key={`marquee-${direction}-150`}
          className="flex whitespace-nowrap gap-4 items-center"
          animate={{ x: xAnimation }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 150,
              ease: "linear",
            },
          }}
        >
          {/* Double the content so it loops seamlessly */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              {[...Array(repeat)].map((_, j) => (
                <div key={j} className="flex items-center gap-4">
                  <span className={`font-heading text-sm md:text-base font-black tracking-widest uppercase ${textColor}`}>
                    {text}
                  </span>
                  <Sparkles size={16} className={`${textColor} stroke-[3px]`} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
