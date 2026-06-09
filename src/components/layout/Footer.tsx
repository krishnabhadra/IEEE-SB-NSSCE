"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUZY4TFKqADJWWXvSoUeAILKBmBhcM8XUlnwag3LUoLlAImr_3uNvv3UKySL5ELFcu/exec";

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !GOOGLE_SCRIPT_URL) {
      if (!GOOGLE_SCRIPT_URL) alert("Google Script URL is not set up yet.");
      return;
    }

    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("timestamp", new Date().toISOString());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setStatus("success");
      setPhone("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="relative bg-[#f8fbff] pt-20 pb-10 px-4 md:px-8 lg:px-12">
      {/* Floating Dark Card */}
      <div className="max-w-[1400px] mx-auto bg-[#232322] rounded-[2.5rem] md:rounded-[3.5rem] text-white p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">

        {/* Main Grid: Left (Brand & Links) and Right (CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0">

          {/* Left Half */}
          <div className="lg:pr-16 lg:border-r border-white/10 flex flex-col justify-between">

            {/* Top Section */}
            <div className="mb-12 lg:mb-16">
              <div className="mb-6">
                <Image 
                  src="/logo.png" 
                  alt="IEEE SB NSSCE" 
                  width={250} 
                  height={80} 
                  style={{ width: 'auto' }}
                  className="w-auto h-12 md:h-16 object-contain brightness-0 invert" 
                />
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
                Empowering the next generation of engineers and technologists through innovation, leadership, and global networking.
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/10 mb-12 hidden lg:block"></div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Col 1 */}
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Explore</h4>
                <ul className="space-y-4">
                  <li><Link href="/#hero" className="text-white/60 hover:text-white transition-colors font-medium">Home</Link></li>
                  <li><Link href="/#about" className="text-white/60 hover:text-white transition-colors font-medium">About Us</Link></li>
                  <li><Link href="/events" className="text-white/60 hover:text-white transition-colors font-medium">Events</Link></li>
                  <li><Link href="/gallery" className="text-white/60 hover:text-white transition-colors font-medium">Gallery</Link></li>
                </ul>
              </div>
              {/* Col 2 */}
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">People</h4>
                <ul className="space-y-4">
                  <li><Link href="/team" className="text-white/60 hover:text-white transition-colors font-medium">Execom</Link></li>
                  <li><Link href="/achievements" className="text-white/60 hover:text-white transition-colors font-medium">Achievements</Link></li>
                  <li><Link href="/societies" className="text-white/60 hover:text-white transition-colors font-medium">Societies</Link></li>
                </ul>
              </div>
              {/* Col 3 */}
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Social</h4>
                <ul className="space-y-4">
                  <li><a href="https://linkedin.com/company/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium">LinkedIn</a></li>
                  <li><a href="https://instagram.com/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium">Instagram</a></li>
                  <li><a href="mailto:ieee@nssce.ac.in" className="text-white/60 hover:text-white transition-colors font-medium">Email Us</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Half - CTA */}
          <div className="lg:pl-16 flex flex-col justify-center relative mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 bg-[#ff5744]/10 text-[#ff5744] font-bold text-xs px-3 py-1.5 rounded-lg mb-6 w-max border border-[#ff5744]/20 uppercase tracking-widest">
              UPDATES
            </div>

            <h3 className="text-5xl lg:text-6xl font-heading font-semibold leading-[1.1] mb-10 tracking-tight text-white">
              Stay in the <br /> loop with us.
            </h3>

            <form className="relative max-w-md" onSubmit={handleSubscribe}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={status === "loading" || status === "success"}
                placeholder="Enter your phone number..."
                required
                className="w-full bg-white text-black rounded-full py-4.5 pl-6 pr-16 focus:outline-none focus:ring-4 ring-[#ff5744]/30 placeholder-slate-400 font-medium text-lg h-16 disabled:opacity-80"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-[#ff5744] text-white rounded-full flex items-center justify-center hover:bg-[#e64a38] transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : status === "success" ? (
                  <span className="font-black text-xl">✓</span>
                ) : status === "error" ? (
                  <span className="font-black text-xl">✕</span>
                ) : (
                  <ArrowRight size={22} strokeWidth={2.5} />
                )}
              </button>
            </form>

            {/* Overlapping Decorative Circle (Placeholder for Illustration) */}
            <div className="absolute -bottom-24 -right-12 w-48 h-48 bg-gradient-to-br from-green-400/20 to-emerald-600/20 blur-3xl rounded-full pointer-events-none hidden md:block"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/50 text-sm font-medium">
          <p>© {new Date().getFullYear()} IEEE SB NSSCE.</p>
          <div className="flex flex-wrap items-center justify-center">
            <p>Developed by <span className="text-white font-bold">Web Team</span> | Execom&apos;26</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
