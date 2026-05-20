import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_NAME, PROJECT_SUBTITLE } from "../constants/branding";

const navLinks = [
  { label: "Metrics", href: "#knowledge" },
  { label: "Summary", href: "#overview" },
  { label: "Charts", href: "#analytics" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["knowledge", "overview", "analytics", "insights"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050508]/90 shadow-lg shadow-black/25 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="page-container flex h-14 min-h-14 items-center justify-between gap-3 sm:h-16 md:gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex min-w-0 max-w-[45%] shrink-0 items-center gap-2 sm:max-w-none sm:gap-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600 text-sm font-bold text-white">
            S
          </span>
          <span className="hidden min-w-0 flex-col leading-tight md:flex">
            <span className="truncate text-sm font-semibold text-white">
              {PROJECT_NAME}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500">
              {PROJECT_SUBTITLE}
            </span>
          </span>
        </a>

        <div className="hidden shrink-0 items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                activeSection === link.href
                  ? "bg-white/[0.06] font-medium text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#analytics")}
            className="ml-1.5 whitespace-nowrap rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-red-500"
          >
            View Charts
          </button>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-gray-300 lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.06] bg-[#050508]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="page-container flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm ${
                    activeSection === link.href
                      ? "bg-red-500/10 font-medium text-white"
                      : "text-gray-300 hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#analytics")}
                className="mt-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white"
              >
                View Charts
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
