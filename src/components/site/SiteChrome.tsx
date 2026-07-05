import { useEffect, useState, type ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { Cursor } from "./Cursor";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("has-luxe-cursor");
    const t = window.setTimeout(() => setLoaded(true), 2400);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <>
      <LoadingScreen done={loaded} />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}