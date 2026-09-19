import { useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "../content";

const SITE_DESCRIPTION = `${profile.name} — ${profile.title}. ${profile.brandStatement}`;

export function usePageMeta(title?: string, description = SITE_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.roles[0]}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

type ButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-light" | "text";
  external?: boolean;
  className?: string;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-bronze text-ink hover:bg-bronze-light px-6 py-3.5",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper px-6 py-3.5",
  "outline-light": "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink px-6 py-3.5",
  text: "text-bronze-deep hover:text-ink underline-offset-8 hover:underline",
};

export function ButtonLink({ to, children, variant = "primary", external, className = "" }: ButtonProps) {
  const cls = `group inline-flex items-center gap-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${buttonStyles[variant]} ${className}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = <Icon aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />;
  if (external) {
    return (
      <a href={to} className={cls} target="_blank" rel="noreferrer">
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="grain overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-bronze/20 blur-[120px]"
      />
      <div className="container-site relative pt-36 pb-16 md:pt-44 md:pb-24">
        <Reveal>
          <p className="eyebrow text-bronze-light">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1.02] font-light tracking-tight md:text-7xl">
            {title}
          </h1>
          {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70">{intro}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={className}>
      <p className={`eyebrow ${dark ? "text-bronze-light" : "text-bronze-deep"}`}>{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-light tracking-tight md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-paper/65" : "text-stone"}`}>{intro}</p>
      )}
    </Reveal>
  );
}

export function ClosingCta({
  title = "Let's Build Something Memorable.",
  text = "Planning a live production, creative project or event programme? I'd love to hear what you're building.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="grain overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-[50%] bg-bronze/25 blur-[140px]"
      />
      <div className="container-site relative py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow text-bronze-light">Work with me</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-light tracking-tight md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-paper/70">{text}</p>
          <div className="mt-10 flex justify-center">
            <ButtonLink to="/contact">Start a Conversation</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
