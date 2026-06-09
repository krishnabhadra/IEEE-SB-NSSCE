import { events } from "@/data/events";
import { societies } from "@/data/societies";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EventGallery from "@/components/events/EventGallery";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug.toLowerCase() === slug.toLowerCase());

  if (!event) {
    notFound();
  }

  const society = societies.find(s => s.id === event.societyId);
  const isPast = event.status === "past" || event.status === "legacy";

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 flex items-end">
        <div className="absolute inset-0 z-0">
          {event.banner && (
            <Image 
              src={event.banner}
              alt={event.title}
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-50"
            />
          )}
          <div className={`absolute inset-0 opacity-40 ${society?.accentColor || 'bg-ieee-blue'} ${event.banner ? 'mix-blend-multiply' : ''}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 pb-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              {society && (
                <Link href={`/societies/${society.slug}`} className={`px-4 py-1.5 rounded-lg border-2 border-black text-white text-sm font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${society.accentColor}`}>
                  {society.name}
                </Link>
              )}
              {event.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-lg bg-white border-2 border-black text-black text-sm font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="text-accent-cyan" size={24} />
                  <span>{event.time}</span>
                </div>
              )}
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
                    <div key={idx} className="p-6 rounded-xl bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <User size={24} className="text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-xl text-slate-900">{speaker.name}</h3>
                        <p className="text-ieee-blue text-sm font-bold uppercase tracking-wider mb-2">{speaker.designation}</p>
                        <p className="text-sm text-slate-600 font-medium line-clamp-3">{speaker.bio}</p>
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
                  <span className="w-3 h-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-ieee-blue rounded-full inline-block"></span>
                  Agenda
                </h2>
                <div className="relative border-l-4 border-black ml-4 space-y-8">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute w-5 h-5 bg-white border-[3px] border-black rounded-full -left-[12px] top-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                      <div className="text-sm font-black uppercase tracking-widest text-ieee-blue mb-1 bg-sky-100 px-2 py-1 w-max rounded border-2 border-black">{item.time}</div>
                      <h3 className="font-heading font-black text-xl mb-2 text-slate-900">{item.title}</h3>
                      {item.description && (
                        <p className="text-slate-700 font-medium">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <EventGallery images={event.gallery} />
            )}
          </div>

          {/* Sidebar / Sticky CTA */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-heading font-black text-3xl mb-2 text-slate-900">Registration</h3>
                <p className="text-slate-700 font-medium mb-6">
                  {isPast
                    ? "This event has already concluded."
                    : "Secure your spot now before tickets run out."}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between pb-4 border-b-2 border-black border-dashed">
                    <span className="text-slate-600 font-bold uppercase tracking-wider text-sm">Price</span>
                    <span className="font-black text-slate-900">{event.price || "Free"}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b-2 border-black border-dashed">
                    <span className="text-slate-600 font-bold uppercase tracking-wider text-sm">Location</span>
                    <span className="font-black text-slate-900 text-right">{event.venue}</span>
                  </div>
                </div>

                {!isPast ? (
                  <button className="w-full py-4 bg-ieee-blue text-white rounded-xl font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 group">
                    Register Now
                    <ArrowRight size={20} className="stroke-[3px]" />
                  </button>
                ) : (
                  <button className="w-full py-4 bg-slate-200 text-slate-500 rounded-xl font-black uppercase tracking-widest border-2 border-slate-400 cursor-not-allowed">
                    Event Ended
                  </button>
                )}
              </div>

              {/* Contacts Block */}
              {event.contacts && event.contacts.length > 0 && (
                <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-heading font-black text-xl mb-4 text-slate-900">Have Questions?</h3>
                  <div className="space-y-4">
                    {event.contacts.map((contact, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-4 border-b-2 border-black border-dashed last:border-0 last:pb-0">
                        <span className="text-slate-800 font-bold text-sm uppercase tracking-wider">{contact.name}</span>
                        <a 
                          href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-black text-ieee-blue hover:text-accent-cyan text-sm flex items-center gap-1 transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
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
