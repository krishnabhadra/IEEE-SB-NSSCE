"use client";

import { motion, Variants } from "framer-motion";
import { societies } from "@/data/societies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SocietiesPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[800px] h-[800px] bg-ieee-blue/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black mb-10 text-slate-900 tracking-tight"
          >
            Our <span className="relative inline-block"><span className="relative z-10 text-ieee-blue">Societies</span><span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FFD700] -z-0 -rotate-2" /></span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto mb-10"
          >
            <div className="absolute inset-0 bg-[#90CAF9] translate-x-1.5 translate-y-1.5 rounded-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-[#64B5F6] translate-x-3 translate-y-3 rounded-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-[#42A5F5] translate-x-4.5 translate-y-4.5 rounded-2xl pointer-events-none" />
            
            <div className="relative bg-white border-2 border-black p-5 md:p-8 rounded-2xl z-10 shadow-sm text-center">
              <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed">
                Explore our <span className="font-bold text-ieee-blue">13 specialized student chapters</span> driving innovation and excellence across diverse technological domains.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(200px,auto)] md:auto-rows-[280px] gap-6"
        >
          {societies.map((society, index) => {
            const getBentoSpan = (idx: number) => {
              switch (idx) {
                case 0: return "md:col-span-2 md:row-span-2"; // CS
                case 1: return "md:col-span-1 md:row-span-1"; 
                case 2: return "md:col-span-1 md:row-span-2"; 
                case 3: return "md:col-span-1 md:row-span-1"; 
                case 4: return "md:col-span-2 md:row-span-1"; 
                case 5: return "md:col-span-1 md:row-span-1"; 
                case 6: return "md:col-span-1 md:row-span-1"; 
                case 7: return "md:col-span-2 md:row-span-2"; 
                case 8: return "md:col-span-1 md:row-span-2"; 
                case 9: return "md:col-span-1 md:row-span-1"; 
                case 10: return "md:col-span-1 md:row-span-1"; 
                case 11: return "md:col-span-2 md:row-span-1"; 
                case 12: return "md:col-span-2 md:row-span-1"; 
                default: return "md:col-span-1 md:row-span-1";
              }
            };
            
            const bentoSpan = getBentoSpan(index);
            const isSmallCol = bentoSpan.includes("col-span-1");
            
            return (
              <motion.div key={society.id} variants={item} className={`h-full w-full ${bentoSpan}`}>
                <Link href={`/societies/${society.slug}`} className="block h-full group outline-none relative">
                  
                  {/* Stacked shadow effect */}
                  <div className="absolute inset-0 bg-[#90CAF9] opacity-0 group-hover:opacity-100 translate-x-1.5 translate-y-1.5 transition-all duration-300 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#64B5F6] opacity-0 group-hover:opacity-100 translate-x-3 translate-y-3 transition-all duration-300 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#42A5F5] opacity-0 group-hover:opacity-100 translate-x-4.5 translate-y-4.5 transition-all duration-300 pointer-events-none" />

                  <div className={`relative h-full w-full bg-white border-2 border-black ${isSmallCol ? "p-5 md:p-6" : "p-6 md:p-8"} overflow-hidden flex flex-col z-10 shadow-sm transition-all duration-300 transform group-hover:-translate-y-1`}>
                    
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-auto relative z-10">
                      {/* Logo Container */}
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-50 border-2 border-black flex items-center justify-center p-2 transition-all duration-300">
                        {society.logo ? (
                          <img src={society.logo} alt={society.shortName} className="w-full h-full object-contain pointer-events-none" style={{ transform: society.logoRotation }} />
                        ) : (
                          <span className={`font-bold text-lg ${society.accentColor.replace('bg-', 'text-')} flex items-center justify-center`}>{society.shortName}</span>
                        )}
                      </div>
                      
                      {/* Short Name Pill */}
                      <div className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-white ${society.accentColor} border-2 border-black transition-all duration-300`}>
                        {society.shortName}
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="relative z-10 mt-6">
                      <h3 className={`font-heading font-black ${isSmallCol ? "text-lg lg:text-xl xl:text-2xl" : "text-2xl lg:text-3xl xl:text-4xl"} text-slate-900 mb-2 transition-colors duration-300 break-words`}>
                        {society.name.replace("IEEE ", "")}
                      </h3>
                      
                      <p className={`text-slate-600 font-medium text-xs md:text-sm leading-relaxed ${isSmallCol && !bentoSpan.includes('row-span-2') ? 'line-clamp-2' : 'line-clamp-3'}`}>
                        {society.description}
                      </p>
                    </div>

                    {/* Hover Reveal Arrow with Society Color */}
                    <div className="absolute bottom-5 md:bottom-6 right-5 md:right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                      <div className={`w-10 h-10 rounded-xl ${society.accentColor} text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
