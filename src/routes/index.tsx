import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, animate, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight, ArrowUpRight, MapPin, Star, X, Sparkles, Trees, Wine, Users, Flower2, Wifi, Car, Gamepad2, Flame, Utensils, Clock, Waves, Baby, ChevronLeft, ChevronRight } from "lucide-react";
import { IMG, STORY, WHY, EXPERIENCES, STATS, JOURNEY, AMENITIES, NEARBY, TESTIMONIALS, EVENTS, GALLERY } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-[color:var(--cream)]">
      <Hero />
      <Marquee />
      <Story />
      <WhyChooseUs />
      <Experiences />
      <Stats />
      <Journey />
      <FeaturedCelebration />
      <Amenities />
      <Gallery />
      <NearbyBooking />
      <ResortMap />
      <Testimonials />
      <EventCalendar />
      <FullscreenCTA />
    </div>
  );
}

/* --------------------- Reusable primitives --------------------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow flex items-center gap-3"><span className="inline-block w-8 h-px bg-[color:var(--gold)]" />{children}</div>;
}

function Reveal({ children, delay = 0, y = 24, as: As = "div" as any, className = "" }: { children: React.ReactNode; delay?: number; y?: number; as?: any; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <As ref={ref as any} className={className}>
      <motion.div initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </As>
  );
}

function MagneticButton({ children, className = "", to, href, onClick, variant = "solid" }: { children: React.ReactNode; className?: string; to?: string; href?: string; onClick?: () => void; variant?: "solid" | "outline" | "ghost" }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!; const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2; const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const onLeave = () => { const el = ref.current!; el.style.transform = ""; };
  const styles = variant === "solid"
    ? "bg-[color:var(--forest)] text-[color:var(--cream)] hover:bg-[color:var(--ink)]"
    : variant === "outline"
    ? "border border-[color:var(--ink)]/25 text-[color:var(--ink)] hover:border-[color:var(--forest)] hover:text-[color:var(--forest)]"
    : "text-[color:var(--forest)] hover:text-[color:var(--ink)]";
  const inner = (
    <span ref={ref} className={"inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[12px] tracking-[0.22em] uppercase font-medium transition-colors " + styles + " " + className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  if (href) return <a href={href}>{inner}</a>;
  return <button onClick={onClick} type="button">{inner}</button>;
}

/* --------------------- Hero --------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden grain" id="home">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          src={IMG.film}
          autoPlay
          muted
          loop
          playsInline
          poster={IMG.hero}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      <div className="relative z-10 h-full container-luxe flex flex-col items-center justify-center text-center text-[color:var(--cream)]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.9 }}>
          <div className="text-[11px] tracking-[0.5em] uppercase text-[color:var(--cream)]/80">Where Nature Meets Celebration</div>
        </motion.div>
        <motion.h1
          className="mt-6 text-[10vw] md:text-[6.4vw] leading-[1.02] max-w-6xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--cream)" }}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2.7, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Timeless Moments,<br />
          <span className="italic text-[color:var(--gold)]/95">Beautifully Yours.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.9 }}
          className="mt-8 max-w-xl text-[color:var(--cream)]/85 leading-relaxed">
          A private forest resort crafted for weddings, quiet escapes and the celebrations you'll remember for a lifetime.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4, duration: 0.9 }} className="mt-10 flex items-center gap-4">
          <MagneticButton href="#experiences" className="!bg-[color:var(--cream)] !text-[color:var(--ink)] hover:!bg-white">
            Explore Now <ArrowRight size={14} />
          </MagneticButton>
          <a href="#story" className="text-[color:var(--cream)]/85 text-[12px] tracking-[0.24em] uppercase hover:text-white">Our Story</a>
        </motion.div>
      </div>

      <motion.div style={{ opacity }} aria-hidden className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[color:var(--cream)]/70">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="w-px h-10 bg-[color:var(--cream)]/40" />
      </motion.div>
    </section>
  );
}

/* --------------------- Marquee --------------------- */
function Marquee() {
  const items = ["Luxury Retreat", "Destination Weddings", "Fine Dining", "Forest Escape", "Signature Celebrations", "Wellness & Spa"];
  return (
    <div className="py-8 bg-[color:var(--sand)] border-y border-black/5 overflow-hidden">
      <div className="flex gap-16 whitespace-nowrap animate-marquee text-[color:var(--ink)]/70" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.2vw, 34px)" }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-16 italic">
            {t}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[color:var(--gold)]"><path d="M20 4C10 4 4 10 4 20c8 0 14-4 16-16z"/><path d="M4 20C8 16 12 12 16 8"/></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------- Story --------------------- */
function Story() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 40%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section id="story" ref={ref} className="relative py-32 md:py-40 bg-[color:var(--cream)]">
      <div className="container-luxe">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
          <div className="md:col-span-5">
            <Reveal><Eyebrow>Our Story</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-5xl md:text-6xl h-display">A Journey Rooted <br /><span className="italic text-[color:var(--forest)]">in Nature.</span></h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="md:col-span-6 md:col-start-7">
            <p className="text-[color:var(--body)] leading-relaxed max-w-lg">Amita Rasa began as a quiet dream — a place where nature, elegance and celebration could hold each other still. Every stone, every arch and every garden was placed with intention.</p>
          </Reveal>
        </div>

        <div className="relative pl-4 md:pl-16">
          <div className="absolute left-4 md:left-16 top-0 bottom-0 w-px bg-black/8" />
          <motion.div style={{ scaleY }} className="timeline-line absolute left-4 md:left-16 top-0 bottom-0 w-[2px]" />
          <ol className="space-y-24 md:space-y-32">
            {STORY.map((s, i) => <StoryStep key={s.title} s={s} i={i} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StoryStep({ s, i }: { s: typeof STORY[number]; i: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const left = i % 2 === 0;
  return (
    <li ref={ref} className="relative grid md:grid-cols-12 gap-10 items-center pl-8 md:pl-20">
      <motion.span initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        className="absolute left-[9px] md:left-[57px] top-6 w-4 h-4 rounded-full bg-[color:var(--forest)] ring-8 ring-[color:var(--cream)]" />
      <div className={"md:col-span-5 " + (left ? "md:order-1" : "md:order-2 md:col-start-8")}>
        <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--gold)]">Chapter {String(i+1).padStart(2,"0")}</div>
        <h3 className="mt-3 text-3xl md:text-4xl h-display">{s.title}</h3>
        <p className="mt-4 text-[color:var(--body)] leading-relaxed max-w-md">{s.body}</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
        className={"md:col-span-6 relative overflow-hidden rounded-[6px] aspect-[4/3] hover-lift " + (left ? "md:order-2 md:col-start-7" : "md:order-1")}
        style={{ boxShadow: "0 30px 80px -30px rgba(43,43,43,0.35)" }}>
        <motion.img src={s.img} alt={s.title} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 1.4, ease: [0.22,1,0.36,1] }} loading="lazy" />
      </motion.div>
    </li>
  );
}

/* --------------------- Why Choose Us --------------------- */
function WhyChooseUs() {
  const icons = [Trees, Sparkles, Flower2, Users, Utensils, Star];
  return (
    <section className="py-24 md:py-32 bg-[color:var(--sand)]">
      <div className="container-luxe">
        <div className="max-w-3xl">
          <Reveal><Eyebrow>Why Choose Us</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display">Designed for<br/><span className="italic text-[color:var(--forest)]">extraordinary experiences.</span></h2></Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-px bg-black/8 border border-black/8">
          {WHY.map((w, i) => {
            const I = icons[i % icons.length];
            return (
              <Reveal key={w.title} delay={i*0.05} className="bg-[color:var(--sand)]">
                <div className="group p-8 md:p-10 h-full min-h-[220px] flex flex-col justify-between transition-colors hover:bg-[color:var(--cream)]">
                  <div className="w-12 h-12 rounded-full border border-[color:var(--forest)]/25 flex items-center justify-center text-[color:var(--forest)] group-hover:bg-[color:var(--forest)] group-hover:text-[color:var(--cream)] transition-colors">
                    <I size={20} />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl h-display">{w.title}</h3>
                    <p className="mt-3 text-sm text-[color:var(--body)] leading-relaxed">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Experiences --------------------- */
function Experiences() {
  return (
    <section id="experiences" className="py-24 md:py-32 bg-[color:var(--cream)]">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal><Eyebrow>Experiences</Eyebrow></Reveal>
            <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display max-w-2xl">Spaces that set <span className="italic text-[color:var(--forest)]">the stage.</span></h2></Reveal>
          </div>
          <Reveal delay={0.2}><p className="text-[color:var(--body)] max-w-sm leading-relaxed">From hillside amphitheatres to candlelit pavilions — each space is composed with intention.</p></Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.title} delay={i*0.04}>
              <a href="#stay" className="group block bg-[color:var(--sand)] rounded-[4px] overflow-hidden hover-lift" style={{ boxShadow: "0 20px 50px -30px rgba(43,43,43,0.25)" }}>
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src={e.img} alt={e.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 text-[10px] tracking-[0.28em] uppercase text-[color:var(--cream)]/80">0{i+1}</div>
                  <div className="absolute bottom-5 left-5 right-5 text-[color:var(--cream)]">
                    <div className="text-xs tracking-[0.22em] uppercase text-[color:var(--gold)]/90">{e.capacity}</div>
                    <div className="text-2xl mt-1" style={{fontFamily:"var(--font-display)"}}>{e.title}</div>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[color:var(--cream)]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-[color:var(--forest)]" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[color:var(--body)] leading-relaxed">{e.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Stats --------------------- */
function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 2, ease: [0.22,1,0.36,1], onUpdate: (n) => setV(n) });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref}>{v.toFixed(decimals)}</span>;
}

function Stats() {
  return (
    <section className="relative py-24 md:py-28 overflow-hidden text-[color:var(--cream)]" style={{ background: "#22483C" }}>
      <div aria-hidden className="absolute inset-0 opacity-25">
        <img src={IMG.hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #22483C 0%, rgba(34,72,60,0.85) 100%)" }} />
      </div>
      <div className="container-luxe relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i*0.06}>
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl h-display text-[color:var(--cream)] flex items-baseline gap-1 justify-center md:justify-start">
                  <Counter value={s.value} decimals={s.decimals ?? 0} />
                  <span className="text-[color:var(--gold)]">{s.suffix}</span>
                </div>
                <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-[color:var(--cream)]/70">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Journey --------------------- */
function Journey() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section ref={ref} className="py-24 md:py-32 bg-[color:var(--cream)]">
      <div className="container-luxe">
        <div className="max-w-3xl mb-16">
          <Reveal><Eyebrow>Guest Journey</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display">From arrival to <span className="italic text-[color:var(--forest)]">cherished memories.</span></h2></Reveal>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-black/8" />
          <motion.div style={{ scaleX }} className="hidden md:block absolute left-0 right-0 top-8 h-[2px] origin-left" >
            <div className="h-full bg-gradient-to-r from-[color:var(--forest)] via-[color:var(--sage)] to-[color:var(--gold)]" />
          </motion.div>
          <ol className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {JOURNEY.map((j, i) => (
              <Reveal key={j.title} delay={i*0.06}>
                <li className="relative pt-0 md:pt-0">
                  <div className="w-16 h-16 rounded-full bg-[color:var(--cream)] border border-[color:var(--forest)]/20 flex items-center justify-center text-[color:var(--forest)] mx-auto md:mx-0" style={{fontFamily:"var(--font-display)"}}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <div className="mt-5 md:mt-6 text-center md:text-left">
                    <div className="text-lg h-display">{j.title}</div>
                    <p className="mt-1 text-xs text-[color:var(--body)] leading-relaxed">{j.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Featured Celebration --------------------- */
function FeaturedCelebration() {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-24 md:py-32 bg-[color:var(--sand)]">
      <div className="container-luxe grid md:grid-cols-12 gap-10 items-center">
        <Reveal className="md:col-span-7">
          <div className="relative overflow-hidden rounded-[4px] aspect-[16/10] group cursor-pointer" onClick={() => setOpen(true)} data-interactive>
            <video src={IMG.film} autoPlay muted loop playsInline poster={IMG.concert} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-[color:var(--cream)]/30 animate-leaf-glow" />
                <span className="relative w-20 h-20 rounded-full bg-[color:var(--cream)] flex items-center justify-center text-[color:var(--forest)]"><Play size={22} fill="currentColor" /></span>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-[color:var(--cream)]">
              <div className="text-[10px] tracking-[0.28em] uppercase text-[color:var(--cream)]/80">Featured Celebration</div>
              <div className="text-3xl md:text-4xl mt-2" style={{fontFamily:"var(--font-display)"}}>Real Celebrations. <span className="italic">Real Memories.</span></div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:pl-8">
          <Eyebrow>The Signature Film</Eyebrow>
          <h3 className="mt-5 text-4xl h-display">A wedding, told <br/><span className="italic text-[color:var(--forest)]">in cinema.</span></h3>
          <p className="mt-5 text-[color:var(--body)] leading-relaxed">Follow the story of a real Amita Rasa wedding — quiet mornings, floral pavilions, and evenings that turned into memory.</p>
          <div className="mt-8"><MagneticButton onClick={() => setOpen(true)} variant="outline">Watch Film <Play size={12} /></MagneticButton></div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94 }} transition={{ duration: 0.4 }} className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <video src={IMG.film} autoPlay loop controls playsInline className="w-full h-full object-cover bg-black" />
              <button aria-label="Close" onClick={() => setOpen(false)} className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[color:var(--cream)]/90 flex items-center justify-center text-[color:var(--ink)]"><X size={16} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* --------------------- Amenities --------------------- */
function Amenities() {
  const icons = [Waves, Utensils, Sparkles, Car, Baby, Gamepad2, Flame, Wifi, Clock];
  return (
    <section className="py-24 md:py-32 bg-[color:var(--cream)]">
      <div className="container-luxe">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
          <div className="md:col-span-6">
            <Reveal><Eyebrow>Resort Amenities</Eyebrow></Reveal>
            <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display">Every comfort,<br/><span className="italic text-[color:var(--forest)]">quietly considered.</span></h2></Reveal>
          </div>
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <p className="text-[color:var(--body)] leading-relaxed">A private world where nothing feels rushed. Wellness, dining, and warmth wrapped into every hour of your stay.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {AMENITIES.map((a, i) => {
            const I = icons[i % icons.length];
            return (
              <Reveal key={a} delay={i*0.04}>
                <div className="group relative p-6 md:p-8 border border-black/8 rounded-[4px] bg-[color:var(--sand)] flex items-center gap-5 hover:border-[color:var(--forest)]/30 hover:bg-[color:var(--cream)] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[color:var(--cream)] border border-[color:var(--forest)]/15 flex items-center justify-center text-[color:var(--forest)] group-hover:bg-[color:var(--forest)] group-hover:text-[color:var(--cream)] transition-colors"><I size={18} /></div>
                  <div>
                    <div className="text-lg h-display">{a}</div>
                    <div className="text-xs text-[color:var(--body)]/80 tracking-wide">Included with every stay</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Gallery Bento --------------------- */
function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-[color:var(--sand)]">
      <div className="container-luxe">
        <div className="max-w-3xl mb-14">
          <Reveal><Eyebrow>Glimpses of Amita Rasa</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display">Beautiful spaces,<br/><span className="italic text-[color:var(--forest)]">beautiful stories.</span></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-6 text-[color:var(--body)] max-w-lg">A curated frame of the estate — where every corner tells its own quiet story.</p></Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {GALLERY.map((g, i) => {
            const spans = [
              "md:col-span-2 md:row-span-2",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-1",
            ];
            const span = spans[i] || "md:col-span-1 md:row-span-1";
            return (
              <Reveal key={i} delay={i * 0.05} className={span + " h-full"}>
                <a
                  href="#stay"
                  data-interactive
                  className="relative group block w-full h-full rounded-[6px] overflow-hidden"
                  style={{ boxShadow: "0 30px 70px -40px rgba(43,43,43,0.45)" }}
                >
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                  <div className="absolute top-4 left-4 text-[10px] tracking-[0.32em] uppercase text-[color:var(--cream)]/70">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[color:var(--cream)]/90 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={16} className="text-[color:var(--forest)]" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-[color:var(--cream)]">
                    {g.capacity && (
                      <div className="text-[10px] tracking-[0.28em] uppercase text-[color:var(--gold)]/95">{g.capacity}</div>
                    )}
                    <div className="mt-1 text-xl md:text-2xl" style={{ fontFamily: "var(--font-display)" }}>{g.title}</div>
                    <p className="mt-1.5 text-xs md:text-sm text-[color:var(--cream)]/75 leading-relaxed max-w-[36ch] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-700">
                      {g.desc}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Nearby + Booking form --------------------- */
function NearbyBooking() {
  return (
    <section id="stay" className="py-24 md:py-32 bg-[color:var(--cream)]">
      <div className="container-luxe grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-4">
          <Eyebrow>Explore Around</Eyebrow>
          <h3 className="mt-5 text-4xl h-display">Nearby <span className="italic text-[color:var(--forest)]">attractions.</span></h3>
          <ul className="mt-8 divide-y divide-black/8">
            {NEARBY.map((n) => (
              <li key={n.name} className="flex items-center justify-between py-4 group">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[color:var(--gold)]" />
                  <span className="text-[color:var(--ink)]">{n.name}</span>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--body)]">{n.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-8">
          <div className="rounded-[6px] bg-[color:var(--sand)] p-8 md:p-12 border border-black/5" style={{ boxShadow: "0 40px 100px -60px rgba(43,43,43,0.35)" }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <Eyebrow>Reserve Your Escape</Eyebrow>
                <h3 className="mt-4 text-4xl md:text-5xl h-display">Book your <span className="italic text-[color:var(--forest)]">stay.</span></h3>
              </div>
              <div className="text-xs tracking-[0.22em] uppercase text-[color:var(--body)]">Best rate guaranteed</div>
            </div>
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BookingForm() {
  const [state, setState] = useState({ name: "", email: "", phone: "", checkIn: "", checkOut: "", guests: "2" });
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-10 grid grid-cols-1 md:grid-cols-6 gap-6">
      <Field className="md:col-span-3" label="Full Name" value={state.name} onChange={(v) => setState((s) => ({ ...s, name: v }))} placeholder="Your name" />
      <Field className="md:col-span-3" label="Email" type="email" value={state.email} onChange={(v) => setState((s) => ({ ...s, email: v }))} placeholder="you@example.com" />
      <Field className="md:col-span-2" label="Phone" value={state.phone} onChange={(v) => setState((s) => ({ ...s, phone: v }))} placeholder="+91" />
      <Field className="md:col-span-2" label="Check In" type="date" value={state.checkIn} onChange={(v) => setState((s) => ({ ...s, checkIn: v }))} />
      <Field className="md:col-span-2" label="Check Out" type="date" value={state.checkOut} onChange={(v) => setState((s) => ({ ...s, checkOut: v }))} />
      <div className="md:col-span-3">
        <div className="text-[11px] tracking-[0.28em] uppercase text-[color:var(--body)]/80">Guests</div>
        <select value={state.guests} onChange={(e) => setState((s) => ({ ...s, guests: e.target.value }))} className="mt-3 w-full bg-transparent border-b border-black/15 py-2.5 focus:border-[color:var(--forest)] outline-none">
          {["1","2","3","4","5","6+"].map((n) => <option key={n} value={n}>{n} Guests</option>)}
        </select>
      </div>
      <div className="md:col-span-3 flex items-end">
        <Link
          to="/booking"
          search={{
            name: state.name, email: state.email, phone: state.phone,
            checkIn: state.checkIn, checkOut: state.checkOut, guests: state.guests,
          } as any}
          className="w-full text-center inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--forest)] text-[color:var(--cream)] px-6 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-[color:var(--ink)] transition-colors"
        >
          Check Availability <ArrowRight size={14} />
        </Link>
      </div>
    </form>
  );
}

function Field({ className = "", label, value, onChange, placeholder, type = "text" }: { className?: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className={className}>
      <div className="text-[11px] tracking-[0.28em] uppercase text-[color:var(--body)]/80">{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-black/15 py-2.5 focus:border-[color:var(--forest)] outline-none placeholder:text-[color:var(--body)]/50" />
    </div>
  );
}

/* --------------------- Resort Map --------------------- */
function ResortMap() {
  return (
    <section id="events" className="py-24 md:py-32 bg-[color:var(--sand)]">
      <div className="container-luxe">
        <div className="max-w-3xl mb-14">
          <Reveal><Eyebrow>Find Your Way</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display">Set within <span className="italic text-[color:var(--forest)]">quiet forest.</span></h2></Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-[6px] overflow-hidden aspect-[4/3] group" style={{ boxShadow: "0 40px 100px -50px rgba(43,43,43,0.4)" }}>
            <img src={IMG.amphitheatre} alt="Amita Rasa amphitheatre" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-[color:var(--cream)]">
              <div className="text-[10px] tracking-[0.32em] uppercase text-[color:var(--gold)]/95">The Estate</div>
              <div className="mt-1 text-2xl h-display">Amita Rasa · 20 acres</div>
            </div>
          </div>
          <div className="relative rounded-[6px] overflow-hidden aspect-[4/3] border border-black/8 bg-[color:var(--cream)]">
            <iframe
              title="Google Map"
              className="absolute inset-0 w-full h-full block"
              src="https://www.google.com/maps?q=Coorg,%20Karnataka,%20India&z=10&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Testimonials --------------------- */
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-24 md:py-32 bg-[color:var(--cream)]">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal><Eyebrow>Kind Words</Eyebrow></Reveal>
            <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display max-w-2xl">Stories from our <span className="italic text-[color:var(--forest)]">guests.</span></h2></Reveal>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-black/10 px-4 py-2 bg-[color:var(--sand)]">
            <div className="flex text-[color:var(--gold)]">{Array.from({length:5}).map((_,k) => <Star key={k} size={14} fill="currentColor" strokeWidth={0} />)}</div>
            <div className="text-xs tracking-[0.22em] uppercase text-[color:var(--ink)]">4.9 on Google</div>
          </div>
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center">
              <div className="text-4xl md:text-5xl h-display leading-[1.1] italic">"{TESTIMONIALS[i].quote}"</div>
              <div className="mt-8 text-sm tracking-[0.22em] uppercase text-[color:var(--forest)]">{TESTIMONIALS[i].name}</div>
              <div className="mt-1 text-xs text-[color:var(--body)]">{TESTIMONIALS[i].role}</div>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button aria-label="prev" onClick={() => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-[color:var(--ink)] hover:bg-[color:var(--forest)] hover:text-[color:var(--cream)] hover:border-[color:var(--forest)] transition"><ChevronLeft size={16}/></button>
            <div className="flex gap-2">{TESTIMONIALS.map((_,k) => <span key={k} className={"h-1 rounded-full transition-all " + (k === i ? "w-8 bg-[color:var(--forest)]" : "w-3 bg-black/15")}/>)}</div>
            <button aria-label="next" onClick={() => setI((v) => (v + 1) % TESTIMONIALS.length)} className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-[color:var(--ink)] hover:bg-[color:var(--forest)] hover:text-[color:var(--cream)] hover:border-[color:var(--forest)] transition"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Events --------------------- */
function EventCalendar() {
  return (
    <section className="py-24 md:py-32 bg-[color:var(--sand)]">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal><Eyebrow>Event Calendar</Eyebrow></Reveal>
            <Reveal delay={0.1}><h2 className="mt-6 text-5xl md:text-6xl h-display">Upcoming at <span className="italic text-[color:var(--forest)]">Amita Rasa.</span></h2></Reveal>
          </div>
          <a href="#" className="text-[12px] tracking-[0.22em] uppercase text-[color:var(--forest)] hover:text-[color:var(--ink)] inline-flex items-center gap-2">View all events <ArrowRight size={14} /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i*0.05}>
              <div className="group p-6 rounded-[6px] bg-[color:var(--cream)] border border-black/8 hover:border-[color:var(--forest)]/25 transition-colors h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-5xl h-display leading-none text-[color:var(--forest)]">{e.day}</div>
                    <div className="mt-1 text-[11px] tracking-[0.32em] uppercase text-[color:var(--gold)]">{e.month}</div>
                  </div>
                  <ArrowUpRight size={18} className="text-[color:var(--ink)]/40 group-hover:text-[color:var(--forest)] transition-colors" />
                </div>
                <div className="mt-8">
                  <div className="text-xl h-display">{e.title}</div>
                  <div className="mt-1 text-xs text-[color:var(--body)]">{e.time}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Fullscreen CTA --------------------- */
function FullscreenCTA() {
  return (
    <section id="contact" className="relative h-[80vh] md:h-[92vh] overflow-hidden">
      <img src={IMG.mandapRed} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.65))" }} />
      <div className="relative h-full flex items-center justify-center text-center text-[color:var(--cream)] container-luxe">
        <Reveal>
          <div className="eyebrow text-[color:var(--gold)]">A Setting Like No Other</div>
          <h2 className="mt-6 text-[10vw] md:text-[6vw] leading-[1.02] h-display" style={{color:"var(--cream)"}}>
            Every Celebration<br/><span className="italic text-[color:var(--gold)]/95">Deserves</span><br/>
            An Extraordinary Setting
          </h2>
          <div className="mt-10 flex items-center justify-center gap-4">
            <MagneticButton to="/booking" className="!bg-[color:var(--gold)] !text-[color:var(--ink)] hover:!bg-[color:var(--cream)]">Explore Now <ArrowRight size={14}/></MagneticButton>
            <a href="mailto:info@amitarasa.com" className="text-[12px] tracking-[0.22em] uppercase text-[color:var(--cream)]/80 hover:text-white">Talk to a Planner</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
