import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Users, Bed, Coffee, Trees, Sparkles } from "lucide-react";
import { z } from "zod";
import { ROOMS, IMG } from "@/lib/site-data";

const searchSchema = z.object({
  name: z.string().optional().default(""),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  checkIn: z.string().optional().default(""),
  checkOut: z.string().optional().default(""),
  guests: z.string().optional().default("2"),
});

export const Route = createFileRoute("/booking")({
  validateSearch: (s) => searchSchema.parse(s),
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Book Your Stay — Amita Rasa Resort" },
      { name: "description", content: "Reserve your escape at Amita Rasa. Choose your room, review your stay, and secure your booking." },
      { property: "og:title", content: "Book Your Stay — Amita Rasa Resort" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
});

const STEPS = ["Guest Details", "Select Room", "Available Rooms", "Reservation Summary"];

function BookingPage() {
  const initial = Route.useSearch();
  const [step, setStep] = useState(0);
  const [guest, setGuest] = useState({ name: initial.name, email: initial.email, phone: initial.phone, checkIn: initial.checkIn, checkOut: initial.checkOut, guests: initial.guests || "2" });
  const [roomId, setRoomId] = useState<string>(ROOMS[1].id);
  const room = useMemo(() => ROOMS.find((r) => r.id === roomId)!, [roomId]);
  const nights = useMemo(() => {
    if (!guest.checkIn || !guest.checkOut) return 2;
    const d = (new Date(guest.checkOut).getTime() - new Date(guest.checkIn).getTime()) / 86400000;
    return Math.max(1, Math.round(d) || 2);
  }, [guest.checkIn, guest.checkOut]);
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  return (
    <div className="pt-28 pb-24 bg-[color:var(--cream)] min-h-screen">
      <div className="container-luxe">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="eyebrow"><span className="inline-block w-8 h-px bg-[color:var(--gold)] mr-3" /> Booking</div>
            <h1 className="mt-4 text-4xl md:text-5xl h-display">Reserve your <span className="italic text-[color:var(--forest)]">escape.</span></h1>
          </div>
          <Link to="/" className="text-[12px] tracking-[0.22em] uppercase text-[color:var(--body)] hover:text-[color:var(--forest)] inline-flex items-center gap-2"><ArrowLeft size={14}/> Back to Home</Link>
        </div>

        {/* Stepper */}
        <div className="mt-10 md:mt-14 grid grid-cols-4 gap-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col gap-3">
              <div className={"h-[2px] rounded-full transition-colors " + (i <= step ? "bg-[color:var(--forest)]" : "bg-black/10")}/>
              <div className="flex items-center gap-3">
                <span className={"w-7 h-7 rounded-full text-[11px] flex items-center justify-center " + (i <= step ? "bg-[color:var(--forest)] text-[color:var(--cream)]" : "bg-[color:var(--sand)] text-[color:var(--body)]")}>{i < step ? <Check size={12}/> : (i+1)}</span>
                <span className="text-xs md:text-[13px] tracking-wide text-[color:var(--ink)] hidden sm:inline">{s}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                {step === 0 && <StepGuest guest={guest} setGuest={setGuest} />}
                {step === 1 && <StepSelectRoom roomId={roomId} setRoomId={setRoomId} />}
                {step === 2 && <StepAvailable roomId={roomId} setRoomId={setRoomId} />}
                {step === 3 && <StepSummary guest={guest} room={room} nights={nights} subtotal={subtotal} taxes={taxes} total={total} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-between">
              <button disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-[color:var(--body)] hover:text-[color:var(--forest)] disabled:opacity-40"><ArrowLeft size={14}/> Back</button>
              {step < 3 ? (
                <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="inline-flex items-center gap-3 rounded-full bg-[color:var(--forest)] text-[color:var(--cream)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[color:var(--ink)]">Continue <ArrowRight size={14}/></button>
              ) : (
                <button className="inline-flex items-center gap-3 rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[color:var(--forest)] hover:text-[color:var(--cream)] transition-colors">Continue Booking <ArrowRight size={14}/></button>
              )}
            </div>
          </div>

          {/* Sidebar summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-[6px] bg-[color:var(--sand)] border border-black/8 overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                <div className="absolute bottom-3 left-4 text-[color:var(--cream)]">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-[color:var(--gold)]">Selected</div>
                  <div className="text-xl" style={{fontFamily:"var(--font-display)"}}>{room.name}</div>
                </div>
              </div>
              <div className="p-6">
                <Row label="Check In" value={guest.checkIn || "—"} />
                <Row label="Check Out" value={guest.checkOut || "—"} />
                <Row label="Nights" value={String(nights)} />
                <Row label="Guests" value={guest.guests} />
                <div className="my-4 divider-line" />
                <Row label="Room total" value={`₹${subtotal.toLocaleString("en-IN")}`} />
                <Row label="Taxes (18%)" value={`₹${taxes.toLocaleString("en-IN")}`} />
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-[11px] tracking-[0.28em] uppercase text-[color:var(--body)]">Total</span>
                  <span className="text-3xl h-display text-[color:var(--forest)]">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-[11px] tracking-[0.24em] uppercase text-[color:var(--body)]">{label}</span>
      <span className="text-[color:var(--ink)]">{value}</span>
    </div>
  );
}

function StepGuest({ guest, setGuest }: any) {
  const F = (k: string) => (v: string) => setGuest((g: any) => ({ ...g, [k]: v }));
  return (
    <section>
      <h2 className="text-3xl h-display">Guest details</h2>
      <p className="mt-2 text-[color:var(--body)]">Tell us who's coming and when.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <BField label="Full Name" value={guest.name} onChange={F("name")} placeholder="Your name" />
        <BField label="Email" type="email" value={guest.email} onChange={F("email")} placeholder="you@example.com" />
        <BField label="Phone" value={guest.phone} onChange={F("phone")} placeholder="+91" />
        <BField label="Guests" value={guest.guests} onChange={F("guests")} placeholder="2" />
        <BField label="Check In" type="date" value={guest.checkIn} onChange={F("checkIn")} />
        <BField label="Check Out" type="date" value={guest.checkOut} onChange={F("checkOut")} />
      </div>
    </section>
  );
}

function BField({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.28em] uppercase text-[color:var(--body)]/80">{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-black/15 py-2.5 focus:border-[color:var(--forest)] outline-none placeholder:text-[color:var(--body)]/50" />
    </div>
  );
}

function StepSelectRoom({ roomId, setRoomId }: { roomId: string; setRoomId: (v: string) => void }) {
  return (
    <section>
      <h2 className="text-3xl h-display">Select a room</h2>
      <p className="mt-2 text-[color:var(--body)]">Choose the sanctuary that fits your stay.</p>
      <div className="mt-8 grid gap-5">
        {ROOMS.map((r) => {
          const active = r.id === roomId;
          return (
            <button type="button" key={r.id} onClick={() => setRoomId(r.id)}
              className={"group text-left grid grid-cols-1 md:grid-cols-5 gap-5 rounded-[6px] overflow-hidden border transition-colors " + (active ? "border-[color:var(--forest)] bg-[color:var(--cream)]" : "border-black/8 bg-[color:var(--sand)] hover:border-[color:var(--forest)]/30")}>
              <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                {active && <div className="absolute top-3 left-3 rounded-full bg-[color:var(--forest)] text-[color:var(--cream)] px-3 py-1 text-[10px] tracking-[0.22em] uppercase">Selected</div>}
              </div>
              <div className="md:col-span-3 p-5 md:p-7 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-[color:var(--gold)]">{r.size} · {r.capacity}</div>
                  <div className="mt-2 text-2xl h-display">{r.name}</div>
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[color:var(--body)]">
                    {r.amenities.map((a) => <li key={a} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[color:var(--gold)]"/>{a}</li>)}
                  </ul>
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <div className="text-3xl h-display text-[color:var(--forest)]">₹{r.price.toLocaleString("en-IN")}<span className="text-xs text-[color:var(--body)] ml-2">/ night</span></div>
                  <span className="text-[12px] tracking-[0.22em] uppercase text-[color:var(--forest)]">{active ? "Selected" : "Choose"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function StepAvailable({ roomId, setRoomId }: { roomId: string; setRoomId: (v: string) => void }) {
  return (
    <section>
      <h2 className="text-3xl h-display">Available rooms</h2>
      <p className="mt-2 text-[color:var(--body)]">Live availability for the dates you selected.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        {ROOMS.map((r, i) => {
          const badge = i === 0 ? { label: "Only 2 Left", tone: "bg-[color:var(--gold)] text-[color:var(--ink)]" } : i === 1 ? { label: "Available", tone: "bg-[color:var(--forest)] text-[color:var(--cream)]" } : { label: "Popular", tone: "bg-[color:var(--sage)] text-[color:var(--ink)]" };
          return (
            <div key={r.id} className="rounded-[6px] overflow-hidden border border-black/8 bg-[color:var(--sand)]">
              <div className="relative aspect-[16/10]">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                <div className={"absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] tracking-[0.22em] uppercase " + badge.tone}>{badge.label}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xl h-display">{r.name}</div>
                  <div className="text-[color:var(--forest)] h-display text-lg">₹{r.price.toLocaleString("en-IN")}</div>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-[color:var(--body)]">
                  <span className="inline-flex items-center gap-1"><Users size={12}/> {r.capacity}</span>
                  <span className="inline-flex items-center gap-1"><Bed size={12}/> {r.size}</span>
                </div>
                <button onClick={() => setRoomId(r.id)} className={"mt-5 w-full py-2.5 rounded-full text-[11px] tracking-[0.22em] uppercase transition-colors " + (roomId === r.id ? "bg-[color:var(--forest)] text-[color:var(--cream)]" : "border border-[color:var(--forest)]/30 text-[color:var(--forest)] hover:bg-[color:var(--forest)] hover:text-[color:var(--cream)]")}>{roomId === r.id ? "Selected" : "Select This Room"}</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StepSummary({ guest, room, nights, subtotal, taxes, total }: any) {
  return (
    <section>
      <h2 className="text-3xl h-display">Reservation summary</h2>
      <p className="mt-2 text-[color:var(--body)]">Review your details before we hold your dates.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-5">
        <Card title="Guest" icon={<Users size={14}/>}>
          <SummaryLine k="Name" v={guest.name || "—"} />
          <SummaryLine k="Email" v={guest.email || "—"} />
          <SummaryLine k="Phone" v={guest.phone || "—"} />
          <SummaryLine k="Guests" v={guest.guests} />
        </Card>
        <Card title="Stay" icon={<Trees size={14}/>}>
          <SummaryLine k="Check In" v={guest.checkIn || "—"} />
          <SummaryLine k="Check Out" v={guest.checkOut || "—"} />
          <SummaryLine k="Nights" v={String(nights)} />
          <SummaryLine k="Room" v={room.name} />
        </Card>
        <Card title="Included" icon={<Sparkles size={14}/>}>
          <ul className="grid grid-cols-2 gap-2 text-sm text-[color:var(--body)]">
            {room.amenities.map((a: string) => <li key={a} className="flex items-center gap-2"><Check size={12} className="text-[color:var(--forest)]"/>{a}</li>)}
          </ul>
        </Card>
        <Card title="Payment" icon={<Coffee size={14}/>}>
          <SummaryLine k="Room total" v={`₹${subtotal.toLocaleString("en-IN")}`} />
          <SummaryLine k="Taxes (18%)" v={`₹${taxes.toLocaleString("en-IN")}`} />
          <div className="mt-4 pt-4 border-t border-black/8 flex items-baseline justify-between">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[color:var(--body)]">Total due</span>
            <span className="text-3xl h-display text-[color:var(--forest)]">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-[6px] bg-[color:var(--sand)] border border-black/8">
      <div className="flex items-center gap-2 text-[color:var(--forest)]">{icon}<span className="text-[11px] tracking-[0.28em] uppercase">{title}</span></div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SummaryLine({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-[11px] tracking-[0.24em] uppercase text-[color:var(--body)]">{k}</span>
      <span className="text-[color:var(--ink)]">{v}</span>
    </div>
  );
}