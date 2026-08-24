"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/livreur")) return null;
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-leaf/15 bg-paper text-leaf shadow-lg transition hover:bg-leaf-mist"
      aria-label="Haut de page"
    >
      <ArrowUp size={18} />
    </button>
  );
}
