import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles, behindTheProgramme, profile } from "../content";
import { ButtonLink, ClosingCta, PageHero, Reveal, SectionHeading, usePageMeta } from "../components/ui";
import { NotFound } from "./NotFound";

export function BehindTheProgramme() {
  usePageMeta(behindTheProgramme.title, `${behindTheProgramme.positioning} ${behindTheProgramme.purpose}`);
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHero
        eyebrow={behindTheProgramme.fullTitle}
        title={
          <>
            The work people don't see{" "}
            <em className="text-bronze-light">behind the experiences they remember.</em>
          </>
        }
        intro={behindTheProgramme.intro}
      />

      <section className="container-site py-20 md:py-28">
        <Reveal>
          <Link
            to={`/behind-the-programme/${featured.slug}`}
            className="group grid gap-10 border border-ink/15 bg-cream p-8 transition-colors duration-300 hover:border-ink md:grid-cols-[1.4fr_1fr] md:p-14"
          >
            <div>
              <p className="eyebrow text-bronze-deep">Featured · {featured.readingTime}</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] font-light md:text-6xl">{featured.title}</h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-lg leading-relaxed text-stone">{featured.dek}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Read the article
                <ArrowUpRight className="size-4 text-bronze-deep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        {rest.length > 0 && (
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {rest.map((a) => (
              <Reveal as="li" key={a.slug}>
                <Link to={`/behind-the-programme/${a.slug}`} className="group block border-t border-ink/15 pt-6">
                  <p className="eyebrow text-bronze-deep">{a.readingTime}</p>
                  <h3 className="mt-3 font-display text-3xl font-light group-hover:underline">{a.title}</h3>
                  <p className="mt-3 text-stone">{a.dek}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-ink-2 text-paper">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading tone="dark" eyebrow="Coming up" title="In the pipeline" intro={behindTheProgramme.purpose} />
          <ol className="border-t border-paper/15">
            {behindTheProgramme.upcoming.map((topic, i) => (
              <Reveal
                as="li"
                key={topic}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-paper/15 py-6 md:grid-cols-[4rem_1fr]"
              >
                <span className="font-mono text-xs text-bronze-light/70">{String(i + 2).padStart(2, "0")}</span>
                <span className="font-display text-xl font-light md:text-2xl">{topic}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta
        title="Have a story worth telling?"
        text="Speaking invitations, interviews and collaborations on production and event leadership are welcome."
      />
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  usePageMeta(article?.title ?? "Article not found", article?.dek);

  if (!article) return <NotFound />;

  return (
    <>
      <header className="grain overflow-hidden bg-ink text-paper">
        <div className="container-site relative max-w-4xl pt-32 pb-16 md:pt-40 md:pb-24">
          <Link
            to="/behind-the-programme"
            className="inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper"
          >
            <ArrowLeft className="size-4" /> {behindTheProgramme.title}
          </Link>
          <Reveal>
            <p className="mt-10 eyebrow text-bronze-light">
              {behindTheProgramme.title} · {article.readingTime}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-light tracking-tight md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-paper/70">{article.dek}</p>
            <p className="mt-8 flex items-center gap-3 text-sm text-paper/60">
              <img src={profile.portrait} alt="" className="size-10 rounded-full object-cover object-top" />
              By {profile.name}
            </p>
          </Reveal>
        </div>
      </header>

      <article className="container-site max-w-3xl py-16 md:py-24">
        {article.body.map((section, i) => (
          <Reveal key={i} as="section" className="mt-12 first:mt-0">
            {section.heading && (
              <h2 className="mb-5 font-display text-3xl leading-tight font-light">{section.heading}</h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p
                key={j}
                className={`mt-5 text-lg leading-[1.8] text-ink/85 first:mt-0 ${
                  i === 0 && j === 0
                    ? "first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-bronze-deep"
                    : ""
                }`}
              >
                {p}
              </p>
            ))}
          </Reveal>
        ))}

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={profile.portrait} alt="" className="size-16 rounded-full object-cover object-top" />
            <div>
              <p className="font-display text-xl">{profile.name}</p>
              <p className="text-sm text-stone">{profile.title}</p>
            </div>
          </div>
          <ButtonLink to="/contact" variant="outline">
            Get in touch
          </ButtonLink>
        </div>
      </article>
    </>
  );
}
