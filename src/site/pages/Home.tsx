import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  articles,
  behindTheProgramme,
  expertiseGroups,
  metrics,
  philosophy,
  profile,
  projects,
  runningOrder,
} from "../content";
import { ButtonLink, ClosingCta, Reveal, SectionHeading, usePageMeta } from "../components/ui";
import { ProjectArt } from "../components/ProjectArt";

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="grain overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] left-[30%] h-[44rem] w-[44rem] rounded-full bg-bronze/20 blur-[140px]"
      />
      <div className="container-site relative grid gap-14 pt-36 pb-20 md:pt-44 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20 lg:pb-28">
        <div>
          <motion.p
            className="eyebrow text-bronze-light"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {profile.roles.join("  ·  ")}
          </motion.p>
          <motion.h1
            className="mt-6 font-display text-[3.2rem] leading-[0.95] font-light tracking-tight sm:text-7xl xl:text-[6.5rem]"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Hannah Esan
            <br />
            <span className="italic text-bronze-light">Oyawoye</span>
          </motion.h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75 md:text-xl">{profile.heroStatement}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/portfolio">View My Work</ButtonLink>
              <ButtonLink to="/contact" variant="outline-light">
                Work With Me
              </ButtonLink>
              {profile.profileUrl && (
                <ButtonLink to={profile.profileUrl} variant="text" external className="px-2 text-bronze-light">
                  Download Profile
                </ButtonLink>
              )}
            </div>
          </motion.div>
        </div>

        <motion.aside
          aria-label="How a live programme comes together"
          className="border border-paper/15 bg-ink-2/70 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between border-b border-paper/15 px-5 py-3.5">
            <p className="eyebrow text-paper/60">Running order</p>
            <p className="flex items-center gap-2 eyebrow text-bronze-light">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-bronze" />
              </span>
              Live
            </p>
          </div>
          <ol>
            {runningOrder.map((row, i) => (
              <li
                key={row.cue}
                className="grid grid-cols-[4.75rem_1fr] gap-4 border-b border-paper/10 px-5 py-3.5 last:border-b-0"
              >
                <span className="pt-0.5 font-mono text-[0.7rem] tracking-wider text-bronze-light/80 uppercase">
                  {row.time}
                </span>
                <span>
                  <span className={`block text-sm font-semibold ${i === 4 ? "text-bronze-light" : "text-paper"}`}>
                    {row.cue}
                  </span>
                  <span className="block text-xs text-paper/50">{row.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </motion.aside>
      </div>
    </section>
  );
}

function VenueStrip() {
  const items = [
    "OVO Arena Wembley",
    "Victory Sounds",
    "Upper Room UK",
    "African Achievers Awards",
    "Newcastle Arena",
    "The Glory Conference",
    "Hour of Revival Manchester",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cream py-5" aria-label="Selected venues and programmes">
      <ul className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-12 font-display text-xl font-light italic text-ink/70 md:text-2xl"
          >
            {item}
            <span className="size-1.5 rounded-full bg-bronze" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MeetHannah() {
  return (
    <section className="container-site py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md md:mx-0">
          <div aria-hidden className="absolute -top-4 -left-4 h-full w-full border border-bronze/60" />
          <img
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            width={1600}
            height={1600}
            loading="lazy"
            className="relative aspect-[4/5] w-full bg-sand object-cover object-[50%_30%]"
          />
          <p className="relative -mt-7 ml-auto w-fit bg-ink px-5 py-3 eyebrow text-bronze-light">{profile.location}</p>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Meet Hannah"
            title={
              <>
                Where project discipline meets <em className="text-bronze-deep">live experience.</em>
              </>
            }
          />
          <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              I bring together structured project management, operational discipline, technology awareness and creative
              thinking to support the delivery of live experiences — from arena concerts to conferences and awards.
            </p>
            <p className="text-stone">
              A background across fintech, payments and technology, and an MSc in IT Project Management, means I bring
              structure to complex environments and stay focused across multiple teams, deadlines and priorities.
            </p>
          </Reveal>
          <Reveal className="mt-9">
            <ButtonLink to="/about" variant="outline">
              More about Hannah
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  const featured = projects.slice(0, 4);
  return (
    <section className="container-site border-t border-ink/10 py-24 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Productions built on <em className="text-bronze-deep">people and systems</em>
            </>
          }
          intro="Arena concerts, conferences and awards — the programmes where planning, operations and audience experience meet."
        />
        <Reveal>
          <ButtonLink to="/portfolio" variant="text">
            All projects
          </ButtonLink>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
        {featured.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-16" : ""}>
            <Link to={`/portfolio/${project.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden">
                <div className="h-full transition-transform duration-700 ease-stage group-hover:scale-[1.03]">
                  <ProjectArt project={project} />
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-bronze-deep">{project.role}</p>
                  <h3 className="mt-2 font-display text-2xl font-light md:text-3xl">
                    {project.title}
                    {project.subtitle && <span className="text-stone"> — {project.subtitle}</span>}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">{project.summary}</p>
                </div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-bronze-deep transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Impact() {
  return (
    <section className="bg-cream">
      <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          eyebrow="Impact"
          title="Scale, responsibility and delivery"
          intro="Experience across some of the UK's major live venues, with multidisciplinary teams, international audiences and complex operations."
        />
        <dl className="grid grid-cols-2 gap-px self-end bg-ink/10">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="bg-cream p-6 md:p-8">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-light text-ink md:text-6xl">{m.value}</span>
                <span className="mt-3 block text-sm leading-snug text-stone">{m.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WhatIDo() {
  const highlights = expertiseGroups.flatMap((g) => g.areas).filter((a) =>
    [
      "Live Production Management",
      "Creative Project Management",
      "Event Operations",
      "Registration & Access Management",
      "Volunteer & Workforce Management",
      "Merchandise & Event Branding",
    ].includes(a.title),
  );
  return (
    <section className="container-site py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Expertise"
            title="From first plan to final bow"
            intro="Structured project management, operational discipline, technology awareness and creative thinking — brought together for live experiences."
          />
          <Reveal className="mt-8">
            <ButtonLink to="/expertise" variant="outline">
              Explore expertise
            </ButtonLink>
          </Reveal>
        </div>
        <ol className="border-t border-ink/15">
          {highlights.map((area, i) => (
            <Reveal
              as="li"
              key={area.title}
              className="grid gap-2 border-b border-ink/15 py-7 md:grid-cols-[3.5rem_1fr_1.4fr] md:gap-6"
            >
              <span className="font-mono text-xs text-bronze-deep">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-2xl font-light">{area.title}</h3>
              <p className="text-sm leading-relaxed text-stone">{area.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="grain overflow-hidden bg-ink-2 text-paper">
      <div className="container-site relative py-24 md:py-32">
        <SectionHeading
          tone="dark"
          eyebrow="How I work"
          title={
            <>
              Great experiences are <em className="text-bronze-light">rarely accidental.</em>
            </>
          }
          intro="They are created through preparation, communication, good systems and people who understand their responsibilities."
        />
        <ul className="mt-16 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-5">
          {philosophy.map((p, i) => (
            <Reveal as="li" key={p.word} delay={i * 0.07} className="bg-ink-2 p-6 lg:p-7">
              <span className="font-mono text-xs text-bronze-light/70">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-6 font-display text-3xl font-light">{p.word}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">{p.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BehindTeaser() {
  const article = articles[0];
  return (
    <section className="container-site py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow={behindTheProgramme.fullTitle}
          title={behindTheProgramme.positioning}
          intro={behindTheProgramme.intro}
        />
        <Reveal>
          <Link
            to={`/behind-the-programme/${article.slug}`}
            className="group block border border-ink/15 bg-cream p-8 transition-colors duration-300 hover:border-ink md:p-10"
          >
            <p className="eyebrow text-bronze-deep">Latest article · {article.readingTime}</p>
            <h3 className="mt-5 font-display text-3xl leading-tight font-light md:text-4xl">{article.title}</h3>
            <p className="mt-4 leading-relaxed text-stone">{article.dek}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink">
              Read the article
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
          <ButtonLink to="/behind-the-programme" variant="text" className="mt-6">
            More from Behind the Programme
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <VenueStrip />
      <MeetHannah />
      <SelectedWork />
      <Impact />
      <WhatIDo />
      <Philosophy />
      <BehindTeaser />
      <ClosingCta />
    </>
  );
}
