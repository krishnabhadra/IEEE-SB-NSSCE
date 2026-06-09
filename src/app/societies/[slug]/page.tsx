import { societies } from "@/data/societies";
import { members } from "@/data/members";
import { events } from "@/data/events";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Target, Eye, Calendar, Users } from "lucide-react";
import Image from "next/image";

export default async function SocietyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const society = societies.find(s => s.slug === slug);

  if (!society) {
    notFound();
  }

  // Get data specific to this society
  const societyMembers = members.filter(m => m.societyId === society.id && m.year === 2026);
  const societyEvents = [...events]
    .filter(e => e.societyId === society.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className={`relative pt-32 pb-20 w-full overflow-hidden flex items-center min-h-[60vh] ${society.accentColor} text-white`}>
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${society.accentColor} opacity-30 rounded-full blur-[120px] mix-blend-screen`} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {society.logo ? (
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-white flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-[4px] border-black overflow-hidden p-3 md:p-4 hover:-translate-y-1 transition-transform">
                <Image
                  src={society.logo}
                  alt={society.name}
                  width={128}
                  height={128}
                  priority
                  className="w-full h-full object-contain"
                  style={{ transform: society.logoRotation }}
                />
              </div>
            ) : (
              <div className={`w-28 h-28 md:w-32 md:h-32 rounded-xl ${society.accentColor} flex items-center justify-center text-3xl font-heading font-black mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-[4px] border-black text-white hover:-translate-y-1 transition-transform`}>
                {society.shortName}
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              {society.name}
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {society.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-20">
            {/* Vision & Mission */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${society.accentColor}`}>
                  <Eye size={28} className="stroke-[2.5px]" />
                </div>
                <h3 className="font-heading font-black text-2xl mb-4 text-slate-900">Our Vision</h3>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {society.vision}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${society.accentColor}`}>
                  <Target size={28} className="stroke-[2.5px]" />
                </div>
                <h3 className="font-heading font-black text-2xl mb-4 text-slate-900">Our Mission</h3>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {society.mission}
                </p>
              </div>
            </section>

            {/* Events */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-heading font-black flex items-center gap-3 text-slate-900">
                  <span className={`w-3 h-8 rounded-full border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${society.accentColor}`}></span>
                  Chapter Events
                </h2>
              </div>

              {societyEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {societyEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.slug}`} className="group">
                      <div className="h-full p-6 rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-slate-900 mb-3 font-bold bg-slate-50 border-2 border-black px-3 py-1.5 w-max rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <Calendar size={16} className="text-ieee-blue" />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h3 className="font-heading font-black text-xl mb-3 text-slate-900 line-clamp-2 leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-slate-700 font-medium text-sm line-clamp-2 mb-4 flex-grow">
                          {event.description}
                        </p>
                        <div className="text-sm font-black uppercase tracking-widest text-ieee-blue flex items-center mt-auto">
                          Details <ArrowRight size={18} className="ml-1 stroke-[3px] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                  {[1, 2].map((i) => (
                    <div key={`placeholder-event-${i}`} className="h-full p-6 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 flex flex-col relative overflow-hidden pointer-events-none">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-3 font-bold border-2 border-slate-400 bg-white px-3 py-1 w-max rounded-lg">
                        <Calendar size={16} />
                        Date TBA
                      </div>
                      <h3 className="font-heading font-black text-xl mb-3 text-slate-600 line-clamp-2 leading-tight">
                        {society.shortName} Upcoming Event
                      </h3>
                      <p className="text-slate-500 font-medium text-sm line-clamp-2 mb-4 flex-grow">
                        Exciting activities are being planned. More details about this event will be published here soon.
                      </p>
                      <div className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center mt-auto">
                        Coming Soon
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Team Preview */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-heading font-black flex items-center gap-3 text-slate-900">
                  <span className={`w-3 h-8 rounded-full border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${society.accentColor}`}></span>
                  Leadership Team
                </h2>
                {societyMembers.length > 0 && (
                  <Link href="/team" className="text-ieee-blue font-black uppercase tracking-widest hover:underline hidden md:block border-2 border-black px-4 py-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                    Full Team
                  </Link>
                )}
              </div>

              {societyMembers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {societyMembers.map((member) => {
                    const gradientClasses = {
                      'bg-orange-500': 'from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300',
                      'bg-green-600': 'from-green-100 to-green-200 hover:from-green-200 hover:to-green-300',
                      'bg-red-600': 'from-red-100 to-red-200 hover:from-red-200 hover:to-red-300',
                      'bg-purple-600': 'from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300',
                      'bg-emerald-500': 'from-emerald-100 to-emerald-200 hover:from-emerald-200 hover:to-emerald-300',
                      'bg-blue-600': 'from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300',
                      'bg-teal-500': 'from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300',
                      'bg-indigo-500': 'from-indigo-100 to-indigo-200 hover:from-indigo-200 hover:to-indigo-300',
                      'bg-rose-500': 'from-rose-100 to-rose-200 hover:from-rose-200 hover:to-rose-300',
                      'bg-amber-500': 'from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300',
                      'bg-cyan-600': 'from-cyan-100 to-cyan-200 hover:from-cyan-200 hover:to-cyan-300',
                      'bg-fuchsia-600': 'from-fuchsia-100 to-fuchsia-200 hover:from-fuchsia-200 hover:to-fuchsia-300',
                      'bg-yellow-600': 'from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300',
                    }[society.accentColor || 'bg-blue-600'] || 'from-sky-100 to-sky-200 hover:from-sky-200 hover:to-sky-300';

                    return (
                      <div
                        key={member.id}
                        className={`group relative p-6 rounded-xl border-2 border-black text-center flex flex-col items-center transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_0_0_rgba(0,0,0,1)] bg-gradient-to-b ${gradientClasses} overflow-hidden`}
                      >
                        {/* Decorative Top Banner */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-b-2 border-black" />

                        {/* Photo */}
                        <div className="relative z-10 mt-2 mb-5">
                          <div className="w-24 h-24 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden flex items-center justify-center text-2xl font-black text-slate-800 transition-transform group-hover:scale-105">
                            {member.photo ? (
                              <Image
                                src={member.photo}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              member.name.charAt(0)
                            )}
                          </div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center flex-grow">
                          <h4 className="font-heading font-black text-xl text-slate-900 mb-2 leading-tight">{member.name}</h4>
                          <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white text-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black group-hover:bg-[#FFD700] transition-colors`}>
                            {member.position}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                  {['Chairperson', 'Vice Chair', 'Secretary'].map((position, i) => (
                    <div key={`placeholder-member-${i}`} className="p-6 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 text-center flex flex-col items-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-400 mb-4 flex items-center justify-center text-slate-400">
                        <Users size={32} />
                      </div>
                      <h4 className="font-heading font-black text-xl text-slate-600">Name TBA</h4>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-2 bg-white px-3 py-1 rounded-lg border-2 border-slate-400">{position}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 bg-white p-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${society.accentColor}`}>
                <Users size={32} className="stroke-[2.5px]" />
              </div>
              <h3 className="font-heading font-black text-3xl mb-4 text-slate-900 leading-tight">Join {society.shortName}</h3>
              <p className="text-slate-700 font-medium mb-8 text-lg">
                Become a part of a global network of professionals and students passionate about {society.name.replace('IEEE ', '')}.
              </p>

              <Link
                href={society.globalWebsite || "https://www.ieee.org/membership/join/index.html"}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 text-white rounded-xl font-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black flex items-center justify-center gap-2 group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest ${society.accentColor}`}
              >
                Become a Member
                <ArrowRight size={20} className="stroke-[3px]" />
              </Link>

              <div className="mt-8 pt-6 border-t-2 border-black border-dashed">
                <p className="text-sm text-slate-800 text-center font-bold">
                  Need help joining? <a href="mailto:ieee@nssce.ac.in" className="font-black underline decoration-2 hover:text-ieee-blue transition-colors">Contact us</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return societies.map((society) => ({
    slug: society.slug,
  }));
}
