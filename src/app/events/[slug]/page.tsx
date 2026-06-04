import { events } from "@/data/events";
import { societies } from "@/data/societies";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const society = societies.find(s => s.id === event.societyId);
  const isPast = event.status === "past";

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 flex items-end">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 opacity-40 ${society?.accentColor || 'bg-ieee-blue'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 pb-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              {society && (
                <Link href={`/societies/${society.slug}`} className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm ${society.accentColor}`}>
                  {society.name}
                </Link>
              )}
              {event.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-slate-300 font-medium text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="text-accent-cyan" size={24} />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-accent-cyan" size={24} />
                <span>{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-accent-cyan" size={24} />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-16">
            {/* About */}
            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-ieee-blue rounded-full inline-block"></span>
                About this Event
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>{event.description}</p>
                <p>Join us for an incredible experience where you can learn, network, and grow your skills alongside industry experts and like-minded peers.</p>
              </div>
            </section>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <section>
                <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-accent-cyan rounded-full inline-block"></span>
                  Featured Speakers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-white border border-pale-silver shadow-sm flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                        <User size={24} className="text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg">{speaker.name}</h3>
                        <p className="text-ieee-blue text-sm font-medium mb-2">{speaker.designation}</p>
                        <p className="text-sm text-muted-foreground line-clamp-3">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <section>
                <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-2">
                  <span className="w-2 h-6 bg-ieee-blue rounded-full inline-block"></span>
                  Agenda
                </h2>
                <div className="relative border-l-2 border-pale-silver/50 ml-4 space-y-8">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute w-4 h-4 bg-white border-2 border-ieee-blue rounded-full -left-[9px] top-1.5" />
                      <div className="text-sm font-bold text-accent-cyan mb-1">{item.time}</div>
                      <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Sticky CTA */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 glass p-8 rounded-3xl border border-pale-silver shadow-xl shadow-ieee-blue/5">
              <h3 className="font-heading font-bold text-2xl mb-2">Registration</h3>
              <p className="text-muted-foreground mb-6">
                {isPast
                  ? "This event has already concluded."
                  : "Secure your spot now before tickets run out."}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between pb-4 border-b border-pale-silver/50">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-bold text-foreground">Free for Members</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-pale-silver/50">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-bold text-foreground text-right">{event.venue}</span>
                </div>
              </div>

              {!isPast ? (
                <button className="w-full py-4 bg-ieee-blue text-white rounded-xl font-bold hover:bg-ieee-blue/90 transition-colors shadow-md shadow-ieee-blue/20 flex items-center justify-center gap-2 group">
                  Register Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button className="w-full py-4 bg-slate-100 text-slate-500 rounded-xl font-bold cursor-not-allowed">
                  Event Ended
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}
