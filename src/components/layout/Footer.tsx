import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SocialIcon = ({ name }: { name: string }) => {
  if (name === "linkedin") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
  if (name === "instagram") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
  if (name === "twitter") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
  if (name === "github") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
  return null;
}

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white via-sky-100/50 to-sky-400 pt-20 pb-10 overflow-hidden border-none -mt-[1px]">
      {/* Animated gradient background snippet */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
        <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[70%] rounded-full bg-ieee-blue/10 blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img 
                src="/logo.png" 
                alt="IEEE SB NSSCE Logo" 
                className="h-10 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform" 
              />
            </Link>
            <p className="text-black mb-8 max-w-sm">
              Empowering students to innovate and build the future through technology, leadership, and global networking.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-ieee-blue">Stay Updated</h4>
              <form className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white border border-pale-silver rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  required
                />
                <button
                  type="submit"
                  className="bg-ieee-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-ieee-blue/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/#about' },
                { name: 'Events', href: '/events' },
                { name: 'Team', href: '/team' },
                { name: 'Achievements', href: '/achievements' },
                { name: 'Gallery', href: '/gallery' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-black hover:text-ieee-blue transition-colors text-sm flex items-center gap-1 group">
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Societies */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Societies</h4>
            <ul className="space-y-3">
              {[
                { name: 'Computer Society', href: '/societies/computer-society' },
                { name: 'Power & Energy', href: '/societies/power-energy-society' },
                { name: 'Robotics & Auto', href: '/societies/robotics-automation-society' },
                { name: 'Women In Eng.', href: '/societies/women-in-engineering' },
                { name: 'ComSoc', href: '/societies/communications-society' },
                { name: 'View All', href: '/societies' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-black hover:text-ieee-blue transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Connect</h4>
            <div className="space-y-4 mb-8">
              <p className="text-sm text-black">
                NSS College of Engineering<br />
                Akathethara, Palakkad<br />
                Kerala 678008, India
              </p>
              <a href="mailto:ieee@nssce.ac.in" className="text-sm text-ieee-blue hover:underline">
                ieee@nssce.ac.in
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-pale-silver flex items-center justify-center text-black hover:text-ieee-blue hover:border-ieee-blue transition-all hover:scale-110">
                <SocialIcon name="linkedin" />
              </a>
              <a href="https://www.instagram.com/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-pale-silver flex items-center justify-center text-black hover:text-ieee-blue hover:border-ieee-blue transition-all hover:scale-110">
                <SocialIcon name="instagram" />
              </a>
              <a href="https://github.com/IEEE-NSSCE" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-pale-silver flex items-center justify-center text-black hover:text-ieee-blue hover:border-ieee-blue transition-all hover:scale-110">
                <SocialIcon name="github" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-pale-silver flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-black font-medium">
              © {new Date().getFullYear()} IEEE Student Branch NSSCE. All rights reserved.
            </p>
            <p className="text-xs text-black/70 font-medium">
              Developed by Web Team, IEEE SB NSSCE
            </p>
          </div>
          <div className="flex gap-6">
            <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-black hover:text-ieee-blue">IEEE.org</a>
            <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-black hover:text-ieee-blue">IEEE Xplore</a>
            <a href="https://www.ieee.org/sitemap.html" target="_blank" rel="noopener noreferrer" className="text-xs text-black hover:text-ieee-blue">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

