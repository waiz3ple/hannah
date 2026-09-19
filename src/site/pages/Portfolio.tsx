import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../content";
import { ClosingCta, PageHero, Reveal, usePageMeta } from "../components/ui";
import { ProjectArt } from "../components/ProjectArt";
import { NotFound } from "./NotFound";

export function Portfolio() {
  usePageMeta("Portfolio", "Live production, event operations and creative project case studies by Hannah Esan Oyawoye.");
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Live programmes, <em className="text-bronze-light">delivered.</em>
          </>
        }
        intro="Case studies from arena concerts, conferences and awards — showing the role, the scale, the challenge and how it was delivered."
      />

      <section className="container-site py-20 md:py-28">
        <ul className="space-y-20 md:space-y-28">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug}>
              <Link
                to={`/portfolio/${project.slug}`}
                className="group grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div className={`aspect-[4/3] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
                  <div className="h-full transition-transform duration-700 ease-stage group-hover:scale-[1.03]">
                    <ProjectArt project={project} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-bronze-deep">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-tight font-light md:text-5xl">
                    {project.title}
                    {project.subtitle && (
                      <span className="block text-2xl text-stone italic md:text-3xl">{project.subtitle}</span>
                    )}
                  </h2>
                  <p className="mt-4 text-sm font-semibold">{project.role}</p>
                  <p className="mt-1 text-sm text-stone">
                    {[project.venue !== project.city ? `${project.venue}, ${project.city}` : project.city, project.date]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-5 max-w-lg leading-relaxed text-ink/75">{project.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.disciplines.map((d) => (
                      <li key={d} className="border border-ink/15 px-3 py-1 text-xs text-stone">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    Read case study
                    <ArrowUpRight className="size-4 text-bronze-deep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <ClosingCta />
    </>
  );
}

export function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  usePageMeta(project?.title ?? "Project not found", project?.summary);

  if (!project) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="bg-ink text-paper">
        <div className="container-site pt-32 md:pt-40">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper"
          >
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <Reveal className="mt-8 grid gap-8 pb-12 md:grid-cols-[1.5fr_1fr] md:items-end md:pb-16">
            <div>
              <p className="eyebrow text-bronze-light">Case study · {project.city}</p>
              <h1 className="mt-5 font-display text-5xl leading-[1] font-light tracking-tight md:text-7xl">
                {project.title}
                {project.subtitle && (
                  <span className="mt-2 block text-3xl text-paper/60 italic md:text-4xl">{project.subtitle}</span>
                )}
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-paper/70">{project.summary}</p>
          </Reveal>
        </div>
        <div className="container-site">
          <Reveal className="aspect-[4/3] overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]">
            <ProjectArt project={project} size="hero" />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink pb-16 text-paper">
        <div className="container-site">
          <dl className="grid grid-cols-2 gap-px bg-paper/10 md:grid-cols-4">
            {project.scale.map((item) => (
              <div key={item.label} className="bg-ink py-6 pr-4 md:py-8 [&:not(:nth-child(2n+1))]:pl-4 md:[&:not(:first-child)]:pl-6">
                <dt className="eyebrow text-paper/45">{item.label}</dt>
                <dd className="mt-2 font-display text-lg font-light md:text-xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <article className="container-site py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[14rem_1fr] lg:gap-24">
          <nav aria-label="Case study sections" className="hidden lg:block">
            <ol className="sticky top-32 space-y-3 text-sm text-stone">
              {["Overview", "Role", "Responsibilities", "Challenge", "Approach", "Outcome"].map((s, i) => (
                <li key={s}>
                  <a href={`#${s.toLowerCase()}`} className="flex gap-3 transition-colors hover:text-ink">
                    <span className="font-mono text-xs text-bronze-deep">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-20">
            <CaseSection id="overview" label="Overview">
              <p className="font-display text-2xl leading-snug font-light md:text-3xl">{project.overview}</p>
            </CaseSection>

            <CaseSection id="role" label="Role">
              <p className="text-2xl font-semibold">{project.role}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.disciplines.map((d) => (
                  <li key={d} className="bg-cream px-3 py-1.5 text-sm text-ink/80">
                    {d}
                  </li>
                ))}
              </ul>
            </CaseSection>

            <CaseSection id="responsibilities" label="Responsibilities">
              <ul className="border-t border-ink/15">
                {project.responsibilities.map((r) => (
                  <li key={r} className="flex gap-4 border-b border-ink/15 py-4 text-lg">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-bronze" />
                    {r}
                  </li>
                ))}
              </ul>
            </CaseSection>

            <CaseSection id="challenge" label="Challenge">
              <blockquote className="border-l-2 border-bronze pl-6 font-display text-2xl leading-snug font-light italic md:text-3xl">
                {project.challenge}
              </blockquote>
            </CaseSection>

            <CaseSection id="approach" label="Approach">
              <ol className="space-y-6">
                {project.approach.map((a, i) => (
                  <li key={a} className="grid grid-cols-[2.5rem_1fr] gap-4 text-lg leading-relaxed">
                    <span className="font-display text-3xl font-light text-bronze-deep">{i + 1}</span>
                    {a}
                  </li>
                ))}
              </ol>
            </CaseSection>

            <CaseSection id="outcome" label="Outcome">
              <div className="bg-ink p-8 text-paper md:p-10">
                <p className="font-display text-2xl leading-snug font-light md:text-3xl">{project.outcome}</p>
              </div>
            </CaseSection>

            {project.gallery && project.gallery.length > 0 && (
              <CaseSection id="gallery" label="Gallery">
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} — production photograph ${i + 1}`}
                      loading="lazy"
                      className={`w-full object-cover ${i % 3 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                    />
                  ))}
                </div>
              </CaseSection>
            )}
          </div>
        </div>
      </article>

      <nav aria-label="More projects" className="grid border-t border-ink/10 md:grid-cols-2">
        {[
          { p: prev, dir: "Previous" as const },
          { p: next, dir: "Next" as const },
        ].map(({ p, dir }) => (
          <Link
            key={dir}
            to={`/portfolio/${p.slug}`}
            className={`group bg-cream p-8 transition-colors duration-300 hover:bg-sand md:p-12 ${
              dir === "Next" ? "border-t border-ink/10 md:border-t-0 md:border-l md:text-right" : ""
            }`}
          >
            <span
              className={`eyebrow inline-flex items-center gap-2 text-bronze-deep ${dir === "Next" ? "md:flex-row-reverse" : ""}`}
            >
              {dir === "Previous" ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
              {dir} project
            </span>
            <p className="mt-3 font-display text-3xl font-light">{p.title}</p>
          </Link>
        ))}
      </nav>

      <ClosingCta
        title="Have a production in mind?"
        text="Whether it's an arena show, a conference or a cultural programme, let's talk about how to deliver it."
      />
    </>
  );
}

function CaseSection({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="scroll-mt-28">
      <div id={id} className="scroll-mt-28">
        <SectionLabel>{label}</SectionLabel>
        <div className="mt-6">{children}</div>
      </div>
    </Reveal>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-4 eyebrow text-bronze-deep">
      <span className="h-px w-8 bg-bronze" />
      {children}
    </h2>
  );
}

