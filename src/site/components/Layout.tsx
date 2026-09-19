import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { contact, nav, profile } from "../content";

function Wordmark() {
  return (
    <Link to="/" className="group flex items-baseline gap-2 text-paper" aria-label={`${profile.name} — home`}>
      <span className="font-display text-xl font-light tracking-tight md:text-2xl">Hannah Oyawoye</span>
      <span className="hidden size-1.5 rounded-full bg-bronze transition-transform group-hover:scale-150 sm:inline-block" />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = nav.filter((item) => item.to !== "/" && item.to !== "/contact");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-ink/90 py-3 backdrop-blur-md" : "bg-transparent py-5 md:py-7"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-[0.8rem] font-medium tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-bronze after:transition-all after:duration-300 ${
                  isActive ? "text-paper after:w-full" : "text-paper/65 after:w-0 hover:text-paper hover:after:w-full"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="border border-bronze/70 px-4 py-2 text-[0.8rem] font-semibold tracking-wide text-paper transition-colors hover:bg-bronze hover:text-ink"
          >
            Work With Me
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-3.75rem)] overflow-y-auto bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex flex-col pt-8 pb-12">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-baseline gap-4 border-b border-paper/10 py-4 font-display text-3xl font-light ${
                  isActive ? "text-bronze-light" : "text-paper"
                }`
              }
            >
              <span className="eyebrow w-6 text-paper/35">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </NavLink>
          ))}
          <p className="mt-10 text-sm text-paper/50">{profile.title}</p>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper/70">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <p className="font-display text-3xl font-light text-paper">{profile.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{profile.brandStatement}</p>
        </div>
        <div>
          <p className="eyebrow text-bronze-light">Explore</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-bronze-light">Connect</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-paper">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.linkedin && (
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                  LinkedIn
                </a>
              </li>
            )}
            {contact.instagram && (
              <li>
                <a
                  href={`https://instagram.com/${contact.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-paper"
                >
                  Instagram @{contact.instagram}
                </a>
              </li>
            )}
            <li>
              <Link to="/contact" className="transition-colors hover:text-paper">
                Send an enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-paper/10 py-6 text-xs text-paper/40 sm:flex-row sm:justify-between">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p>{profile.location} · Live production & creative project management</p>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 bg-bronze px-4 py-2 text-sm font-semibold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
