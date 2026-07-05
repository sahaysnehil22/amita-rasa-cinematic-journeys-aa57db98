import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV_LINKS, IMG } from "@/lib/site-data";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const hero = document.getElementById("home");
      if (hero) {
        const bottom = hero.getBoundingClientRect().bottom;
        setInHero(bottom > 60);
      }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        inHero ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        scrolled ? "backdrop-blur-xl bg-[color:var(--cream)]/70 border-b border-black/5 py-2" : "bg-transparent py-4",
      ].join(" ")}
    >
      <div className="container-luxe flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Amita Rasa home">
          <img src={IMG.logo} alt="Amita Rasa" className={"h-12 md:h-16 w-auto transition " + (scrolled ? "" : "brightness-0 invert")} />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className={[
                "text-[13px] tracking-wide font-medium transition-colors",
                scrolled ? "text-[color:var(--ink)] hover:text-[color:var(--forest)]" : "text-white/90 hover:text-white",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/booking"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[color:var(--forest)] text-[color:var(--cream)] px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase font-medium hover:bg-[color:var(--ink)] transition-colors"
          >
            Book Your Stay
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={"lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border " + (scrolled ? "border-black/10 text-[color:var(--ink)]" : "border-white/30 text-white")}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-[color:var(--cream)] border-t border-black/5 shadow-xl">
          <div className="container-luxe py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="text-[color:var(--ink)] text-lg" style={{fontFamily:"var(--font-display)"}}>{l.label}</a>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--forest)] text-[color:var(--cream)] px-5 py-3 text-[12px] tracking-[0.18em] uppercase">Book Your Stay</Link>
          </div>
        </div>
      )}
    </header>
  );
}