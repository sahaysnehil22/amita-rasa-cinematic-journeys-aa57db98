import { useEffect, useState, type ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 2400);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <>
      <LoadingScreen done={loaded} />
      <SmoothScroll />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}