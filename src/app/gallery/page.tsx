"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { Camera, Image as ImageIcon, X } from "lucide-react";

// Mock gallery data
const galleryImages = [
  { id: 1, title: "Tech Symposium 2025", category: "Events", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Robotics Workshop", category: "Workshops", span: "col-span-1 row-span-1" },
  { id: 3, title: "AGM 2024", category: "Meetings", span: "col-span-1 row-span-1" },
  { id: 4, title: "Women in Tech Panel", category: "Events", span: "md:col-span-2 row-span-1" },
  { id: 5, title: "Hackathon Finals", category: "Competitions", span: "col-span-1 md:row-span-2" },
  { id: 6, title: "Hardware Expo", category: "Exhibitions", span: "col-span-1 row-span-1" },
  { id: 7, title: "Alumni Meet", category: "Networking", span: "col-span-1 row-span-1" },
  { id: 8, title: "Coding Bootcamp", category: "Workshops", span: "md:col-span-2 row-span-1" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD700] text-black font-bold mb-6 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Camera size={20} className="stroke-[3px]" />
            <span className="uppercase tracking-widest text-xs">Memories & Moments</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black mb-10 text-slate-900 tracking-tight"
          >
            Our <span className="relative inline-block"><span className="relative z-10 text-white">Gallery</span><span className="absolute -bottom-1 left-0 w-full h-full bg-ieee-blue -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-0 bg-[#FFD700] translate-x-1.5 translate-y-1.5 rounded-2xl pointer-events-none border-2 border-black" />
            <div className="absolute inset-0 bg-[#FFA000] translate-x-3 translate-y-3 rounded-2xl pointer-events-none border-2 border-black" />
            
            <div className="relative bg-white border-2 border-black p-5 md:p-8 rounded-2xl z-10 shadow-sm text-center">
              <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed">
                A visual journey through our events, workshops, and the incredible community that makes IEEE SB NSSCE special.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gallery Grid (Bento Box Style) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4"
        >
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              variants={item}
              className={`relative group overflow-hidden rounded-xl bg-slate-100 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 cursor-pointer ${img.span}`}
              onClick={() => setSelectedImage(img.id)}
            >
              {/* Placeholder image background */}
              <div className="absolute inset-0 bg-slate-100 group-hover:scale-105 transition-transform duration-700 ease-in-out flex items-center justify-center border-b-2 border-black">
                <ImageIcon size={48} className="text-slate-300 opacity-50" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <span className="inline-block px-3 py-1.5 bg-[#FFD700] text-black text-xs font-bold rounded-lg uppercase tracking-wider mb-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {img.category}
                </span>
                <h3 className="text-white font-heading font-black text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white p-3 rounded-full bg-white/20 hover:bg-red-500 hover:text-white transition-colors z-[10000]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video bg-slate-800 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center shadow-2xl cursor-default border-4 border-black"
            >
              <ImageIcon size={64} className="text-slate-600 mb-4" />
              <h2 className="text-white font-heading text-2xl font-bold mb-2">
                {galleryImages.find(i => i.id === selectedImage)?.title}
              </h2>
              <p className="text-slate-400 font-medium text-center px-4">
                Upload real images to /public directory to replace this placeholder.
              </p>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
