import { NAV_LINKS, EXPERIENCES } from "@/lib/site-data";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative text-[color:var(--cream)]" style={{ background: "#1B3A30" }}>
      <div className="absolute inset-x-0 top-0 h-40 opacity-30" style={{ background: "radial-gradient(600px 200px at 50% 0, rgba(255,255,255,0.18), transparent)" }} />
      <div className="container-luxe pt-24 pb-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="italic text-4xl md:text-5xl leading-none" style={{fontFamily:"var(--font-display)"}}>
              amita<span className="text-[color:var(--gold)]">·</span>rasa
            </div>
            <div className="mt-2 text-xs tracking-[0.35em] uppercase text-[color:var(--cream)]/70">Resort</div>
            <p className="mt-6 max-w-sm text-[color:var(--cream)]/70 leading-relaxed">
              A luxury resort where nature, elegance and unforgettable experiences come together.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((I, i) => (
                <a key={i} href="#" aria-label="social" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-[color:var(--gold)]">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-[color:var(--cream)]/80">
              {NAV_LINKS.map((l) => <li key={l.label}><a href={l.to} className="hover:text-white">{l.label}</a></li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-[color:var(--gold)]">Experiences</h4>
            <ul className="mt-5 space-y-3 text-sm text-[color:var(--cream)]/80">
              {EXPERIENCES.slice(0,6).map((e) => <li key={e.title}>{e.title}</li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-[color:var(--gold)]">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-[color:var(--cream)]/80">
              <li className="flex gap-2"><MapPin size={16} className="mt-0.5 text-[color:var(--gold)]" /> Amita Rasa Resort, Green Valley Road, Nature City, 456781</li>
              <li className="flex gap-2"><Phone size={16} className="text-[color:var(--gold)]" /> +91 99765 43210</li>
              <li className="flex gap-2"><Mail size={16} className="text-[color:var(--gold)]" /> info@amitarasa.com</li>
            </ul>
            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <label className="text-[11px] tracking-[0.3em] uppercase text-[color:var(--gold)]">Newsletter</label>
              <div className="mt-3 flex items-center border-b border-white/25">
                <input type="email" required placeholder="Your email" className="flex-1 bg-transparent py-2 outline-none placeholder:text-[color:var(--cream)]/40 text-sm" />
                <button className="px-3 py-2 text-[color:var(--gold)]">→</button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[color:var(--cream)]/60">
          <div>© {new Date().getFullYear()} Amita Rasa Resort. All rights reserved.</div>
          <div className="flex gap-6"><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div>
        </div>
      </div>
    </footer>
  );
}