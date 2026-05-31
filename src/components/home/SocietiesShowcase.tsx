"use client";

import { motion, AnimatePresence } from "framer-motion";
import { societies } from "@/data/societies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function SocietiesShowcase() {
  const [activeNode, setActiveNode] = useState<any>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const nodes = [
    ...societies,
    { 
      id: 'view-all', 
      name: 'Explore All Societies', 
      shortName: 'ALL', 
      isViewAll: true, 
      slug: '' 
    }
  ];

  const innerNodes = nodes.filter((_, i) => i % 2 === 0);
  const outerNodes = nodes.filter((_, i) => i % 2 !== 0);

  const handleNodeClick = (e: React.MouseEvent, node: any) => {
    if (isTouchDevice && activeNode?.id !== node.id) {
      e.preventDefault();
      setActiveNode(node);
    }
  };

  const renderNodes = (nodeList: any[], isInner: boolean) => {
    return nodeList.map((node, i) => {
      const angle = (i / nodeList.length) * 360;
      const radiusVar = isInner ? 'var(--orbit-radius-inner)' : 'var(--orbit-radius-outer)';
      const itemClass = isInner ? 'orbit-item-inner' : 'orbit-item-outer';
      
      return (
        <div 
          key={node.id}
          className="absolute top-1/2 left-1/2 w-0 h-0"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div 
            className="absolute"
            style={{ transform: `translateY(calc(-1 * ${radiusVar}))` }}
          >
            <div className={itemClass}>
               <div 
                 style={{ transform: `rotate(${-angle}deg)` }}
                 className="w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8 pointer-events-auto"
                 onMouseEnter={() => !isTouchDevice && setActiveNode(node)}
                 onMouseLeave={() => !isTouchDevice && setActiveNode(null)}
               >
                 <Link 
                   href={node.isViewAll ? "/societies" : `/societies/${node.slug}`} 
                   onClick={(e) => handleNodeClick(e, node)}
                   className="block w-full h-full outline-none focus:ring-2 focus:ring-ieee-blue rounded-full touch-pan-y"
                 >
                   <motion.div 
                     whileHover={{ scale: 1.15 }}
                     className={`w-full h-full rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative overflow-hidden group ${
                       node.isViewAll 
                       ? 'bg-white border-2 border-dashed border-ieee-blue text-ieee-blue' 
                       : `bg-white border-2 border-white ${node.logo ? '' : 'text-white'} ${node.logo ? '' : node.accentColor || 'bg-ieee-blue'}`
                     }`}
                   >
                     {node.isViewAll ? (
                       <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                     ) : node.logo ? (
                       <img src={node.logo} alt={node.shortName} draggable={false} style={{ transform: node.logoRotation }} className="w-8 h-8 md:w-10 md:h-10 object-contain z-10 pointer-events-none" />
                     ) : (
                       <span className="font-bold text-[11px] md:text-base tracking-wider z-10">{node.shortName}</span>
                     )}
                     {/* Glossy reflection */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white/60 opacity-40"></div>
                   </motion.div>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="pt-12 pb-24 relative overflow-hidden bg-slate-50/50">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ieee-blue/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mt-8 mb-10 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Explore Our <span className="text-gradient">Societies</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the specialized student chapters driving innovation across various engineering and technology domains.
          </motion.p>
        </div>

        {/* Orbit Interactive Visualization */}
        <div className="relative w-full max-w-3xl mx-auto h-[420px] md:h-[650px] flex items-center justify-center orbit-wrapper mt-8 md:mt-12 touch-pan-y">
          
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              --orbit-radius-inner: 130px;
              --orbit-radius-outer: 195px;
            }
            @media (min-width: 768px) {
              :root {
                --orbit-radius-inner: 190px;
                --orbit-radius-outer: 290px;
              }
            }
            .orbit-container-inner {
              animation: spin 40s linear infinite;
            }
            .orbit-container-outer {
              animation: spin-reverse 55s linear infinite;
            }
            .orbit-item-inner {
              animation: counter-spin 40s linear infinite;
            }
            .orbit-item-outer {
              animation: counter-spin-reverse 55s linear infinite;
            }
            .orbit-wrapper:hover .orbit-container-inner,
            .orbit-wrapper:hover .orbit-container-outer,
            .orbit-wrapper:hover .orbit-item-inner,
            .orbit-wrapper:hover .orbit-item-outer {
              animation-play-state: paused;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes counter-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes counter-spin-reverse {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}} />

          {/* Orbit Rings Decorations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(var(--orbit-radius-inner)*2)] h-[calc(var(--orbit-radius-inner)*2)] rounded-full border border-ieee-blue/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(var(--orbit-radius-outer)*2)] h-[calc(var(--orbit-radius-outer)*2)] rounded-full border border-dashed border-ieee-blue/20"></div>

          {/* Inner Nodes */}
          <div className="absolute inset-0 orbit-container-inner pointer-events-none">
             {renderNodes(innerNodes, true)}
          </div>
          
          {/* Outer Nodes */}
          <div className="absolute inset-0 orbit-container-outer pointer-events-none">
             {renderNodes(outerNodes, false)}
          </div>

          {/* Central Hub */}
          <div className="relative z-10 w-40 h-40 md:w-64 md:h-64 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_0_40px_-10px_rgba(0,98,155,0.2)] flex flex-col items-center justify-center text-center p-3 md:p-6 overflow-hidden">
            {/* Subtle inner glow */}
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${activeNode && !activeNode.isViewAll ? activeNode.accentColor : 'bg-ieee-blue'}`}></div>
            
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center relative z-10 w-full"
                >
                   {activeNode.isViewAll ? (
                     <>
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ieee-blue/10 flex items-center justify-center text-ieee-blue mb-2 md:mb-3">
                          <ArrowRight size={20} className="md:w-6 md:h-6" />
                       </div>
                       <h3 className="font-bold text-xs md:text-lg text-slate-900 leading-tight">View All Societies</h3>
                       <p className="text-[9px] md:text-xs text-slate-500 mt-1 md:mt-2">Click to explore directory</p>
                     </>
                   ) : (
                     <>
                       {activeNode.logo ? (
                         <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-1 md:mb-2 shadow-inner bg-white p-2 border border-slate-100">
                           <img src={activeNode.logo} alt={activeNode.shortName} style={{ transform: activeNode.logoRotation }} className="w-full h-full object-contain pointer-events-none" />
                         </div>
                       ) : (
                         <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold mb-1 md:mb-2 shadow-inner text-[10px] md:text-base ${activeNode.accentColor}`}>
                            {activeNode.shortName}
                         </div>
                       )}
                       <h3 className="font-bold text-[11px] md:text-base leading-tight mb-1 md:mb-2 text-slate-900 px-1">{activeNode.name}</h3>
                       <p className="text-[9px] md:text-xs text-slate-600 line-clamp-3 md:line-clamp-4 px-1 leading-snug">
                         {activeNode.description}
                       </p>
                       {isTouchDevice && (
                         <p className="text-[8px] text-ieee-blue mt-1 font-bold tracking-wider">TAP TO VISIT</p>
                       )}
                     </>
                   )}
                </motion.div>
              ) : (
                <motion.div
                   key="default"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="relative z-10"
                >
                   <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-ieee-blue to-accent-cyan flex items-center justify-center text-white mx-auto mb-2 md:mb-3 shadow-lg">
                      <span className="font-bold text-base md:text-2xl">{societies.length}</span>
                   </div>
                   <h3 className="font-bold text-slate-900 text-xs md:text-lg">IEEE Societies</h3>
                   <p className="text-[8px] md:text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                     {isTouchDevice ? 'Tap icons to explore' : 'Hover to explore'}
                   </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
