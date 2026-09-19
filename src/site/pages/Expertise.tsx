import { expertiseGroups } from "../content";
import { ClosingCta, PageHero, Reveal, usePageMeta } from "../components/ui";

export function Expertise() {
  usePageMeta(
    "Expertise",
    "Live production management, creative project management, event operations, registration and access, volunteer management, event branding and more.",
  );
  let counter = 0;
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title={
          <>
            The disciplines behind <em className="text-bronze-light">a live experience.</em>
          </>
        }
        intro="From production logistics and venue coordination to merchandise, publicity and post-event reporting — the full lifecycle of a live programme."
      />

      {expertiseGroups.map((group, g) => (
        <section key={group.name} className={g % 2 ? "bg-cream" : "bg-paper"}>
          <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-mono text-xs text-bronze-deep">Part {String(g + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-light md:text-5xl">{group.name}</h2>
              <p className="mt-4 text-lg text-stone">{group.intro}</p>
            </Reveal>
            <ul className="grid gap-px bg-ink/10 sm:grid-cols-2">
              {group.areas.map((area) => {
                counter += 1;
                return (
                  <Reveal
                    as="li"
                    key={area.title}
                    className={`flex flex-col p-7 md:p-8 ${g % 2 ? "bg-cream" : "bg-paper"}`}
                  >
                    <span className="font-mono text-xs text-bronze-deep">{String(counter).padStart(2, "0")}</span>
                    <h3 className="mt-8 font-display text-2xl leading-tight font-light">{area.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">{area.description}</p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section className="container-site py-20 md:py-24">
        <Reveal className="grid gap-8 border-y border-ink/15 py-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <p className="eyebrow text-bronze-deep">The difference</p>
          <p className="font-display text-2xl leading-snug font-light md:text-3xl">
            A background across fintech, payments, technology and project management means every production is
            approached with structure: clear plans, managed risk, aligned stakeholders and calm execution — without
            losing sight of the creative experience.
          </p>
        </Reveal>
      </section>

      <ClosingCta />
    </>
  );
}
