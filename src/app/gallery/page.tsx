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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ieee-blue/10 text-ieee-blue font-medium mb-6"
          >
            <Camera size={18} />
            <span>Memories & Moments</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-6"
          >
            Our <span className="text-ieee-blue">Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            A visual journey through our events, workshops, and the incredible community that makes IEEE SB NSSCE special.
          </motion.p>
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
              className={`relative group overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 shadow-sm cursor-pointer ${img.span}`}
              onClick={() => setSelectedImage(img.id)}
            >
              {/* Placeholder image background */}
              <div className="absolute inset-0 bg-gradient-to-br from-ieee-blue/10 to-accent-cyan/10 group-hover:scale-110 transition-transform duration-700 ease-in-out flex items-center justify-center">
                <ImageIcon size={48} className="text-slate-300 opacity-50" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-ieee-blue text-white text-xs font-bold rounded-full mb-2">
                  {img.category}
                </span>
                <h3 className="text-white font-heading font-bold text-xl">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12">
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-5xl aspect-video bg-slate-800 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center shadow-2xl"
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
