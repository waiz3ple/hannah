import { Link } from "react-router";
import { media, projects } from "../content";
import { ClosingCta, PageHero, Reveal, SectionHeading, usePageMeta } from "../components/ui";
import { ProjectArt } from "../components/ProjectArt";

export function Media() {
  usePageMeta("Media", "Backstage, production and live moments from programmes delivered by Hannah Esan Oyawoye.");
  return (
    <>
      <PageHero
        eyebrow="Media"
        title={
          <>
            Backstage, build and <em className="text-bronze-light">live moments.</em>
          </>
        }
        intro="Working photographs from rehearsals, venue set-up, production floors, team briefings and the moments audiences remember."
      />

      {media.length > 0 ? (
        <section className="container-site py-20 md:py-28">
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {media.map((item) => (
              <Reveal as="li" key={item.src} className="mb-4 break-inside-avoid">
                <figure>
                  <img src={item.src} alt={item.alt} loading="lazy" className="w-full" />
                  <figcaption className="mt-2 text-sm text-stone">
                    {item.caption}
                    {item.project && <span className="text-bronze-deep"> · {item.project}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </section>
      ) : (
        <section className="container-site py-20 md:py-28">
          <SectionHeading
            eyebrow="Programme archive"
            title="Explore by production"
            intro="Production photography from these programmes is being curated. In the meantime, explore each project's case study."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={(i % 3) * 0.08}>
                <Link to={`/portfolio/${project.slug}`} className="group block aspect-[4/5] overflow-hidden">
                  <div className="h-full transition-transform duration-700 ease-stage group-hover:scale-[1.03]">
                    <ProjectArt project={project} />
                  </div>
                  <span className="sr-only">{project.title} case study</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <ClosingCta
        title="Media & press enquiries"
        text="For interviews, features, speaking invitations or image requests, please get in touch."
      />
    </>
  );
}
