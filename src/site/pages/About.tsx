import { certifications, education, journey, profile } from "../content";
import { ButtonLink, ClosingCta, PageHero, Reveal, SectionHeading, usePageMeta } from "../components/ui";

const bio = [
  "I am a Live Production Manager, Creative Project Manager and Event Curator with experience supporting and leading complex live programmes across the UK. My work sits at the intersection of production, operations, people and project delivery. I enjoy taking ambitious ideas and helping build the systems required to bring them to life.",
  "My experience includes coordinating event operations, volunteer teams, venue requirements, production logistics, registration systems, access management, hospitality, programme schedules and stakeholder communication. I also develop merchandise and event branding, and contribute to email marketing and publicity that build awareness and drive attendance.",
  "Before focusing on live production and the creative industries, I built extensive experience across fintech, payments, technology and project management. Alongside that practical experience, I hold an MSc in IT Project Management, which has strengthened my approach to planning, risk management, stakeholder engagement, delivery and continuous improvement.",
  "My approach is simple: great experiences are rarely accidental. They are created through preparation, communication, good systems and people who understand their responsibilities.",
];

export function About() {
  usePageMeta("About", `About ${profile.name}: ${profile.brandStatement}`);
  return (
    <>
      <PageHero
        eyebrow="About Hannah"
        title={
          <>
            Structure for complex environments. <em className="text-bronze-light">Care for the experience.</em>
          </>
        }
        intro={profile.brandStatement}
      />

      <section className="container-site grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <figure className="relative">
            <div aria-hidden className="absolute -right-3 -bottom-3 h-full w-full border border-bronze/60" />
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              width={1600}
              height={1600}
              className="relative aspect-[4/5] w-full bg-sand object-cover object-[50%_30%]"
            />
            <figcaption className="relative mt-7 flex items-center gap-3 text-sm text-stone">
              <span className="h-px w-8 bg-bronze" />
              {profile.name}
            </figcaption>
          </figure>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="eyebrow text-stone">Based</dt>
              <dd className="mt-1 font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="eyebrow text-stone">Focus</dt>
              <dd className="mt-1 font-medium">Live production & creative operations</dd>
            </div>
          </dl>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-display text-3xl leading-snug font-light md:text-[2.4rem]">
              I bring together structured project management, operational discipline, technology awareness and
              creative thinking to deliver live experiences.
            </p>
          </Reveal>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
            {bio.map((p, i) => (
              <Reveal key={i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/portfolio">View My Work</ButtonLink>
            {profile.profileUrl && (
              <ButtonLink to={profile.profileUrl} variant="outline" external>
                Download Profile
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-site py-24 md:py-32">
          <SectionHeading
            eyebrow="The path here"
            title="A multidisciplinary route into live production"
            intro="Experience in fintech, payments and technology built the discipline that now supports complex live programmes."
          />
          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            {journey.map((step, i) => (
              <Reveal as="li" key={step.stage} delay={i * 0.08} className="relative border-t border-ink/20 pt-6">
                <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-bronze" />
                <span className="font-mono text-xs text-bronze-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-2xl font-light">{step.stage}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site grid gap-16 py-24 md:py-32 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Education" title="Academic foundations" />
          <ul className="mt-10 border-t border-ink/15">
            {education.map((e) => (
              <Reveal as="li" key={e.award} className="border-b border-ink/15 py-6">
                <p className="font-display text-2xl font-light">{e.award}</p>
                <p className="mt-1 text-sm text-stone">{e.institution}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Professional development" title="Continuous learning" />
          <ul className="mt-10 border-t border-ink/15">
            {certifications.map((c) => (
              <Reveal as="li" key={c} className="flex items-center gap-4 border-b border-ink/15 py-5">
                <span className="size-1.5 shrink-0 rounded-full bg-bronze" />
                <span className="text-lg">{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
