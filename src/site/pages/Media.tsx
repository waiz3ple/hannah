import { Link } from "react-router";
import { instagramPosts, media, projects } from "../content";
import { ClosingCta, PageHero, Reveal, SectionHeading, usePageMeta } from "../components/ui";
import { InstagramEmbed } from "../components/InstagramEmbed";

export function Media() {
  usePageMeta("Media", "Backstage, production and live moments from programmes delivered by Hannah Esan Oyawoye.");
  const projectFor = (slug?: string) => projects.find((p) => p.slug === slug);
  return (
    <>
      <PageHero
        eyebrow="Media"
        title={
          <>
            Backstage, build and <em className="text-bronze-light">live moments.</em>
          </>
        }
        intro="Posts, reels and photographs from the programmes — rehearsals, venue set-up, production floors, team briefings and the moments audiences remember."
      />

      {instagramPosts.length > 0 && (
        <section className="container-site py-20 md:py-28">
          <SectionHeading
            eyebrow="On Instagram"
            title="From the programmes"
            intro="Posts and reels shared by the artists and organisers of productions Hannah has worked on."
          />
          <ul className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {instagramPosts.map((post) => {
              const project = projectFor(post.project);
              return (
                <Reveal as="li" key={post.url} className="mb-6 break-inside-avoid">
                  <figure>
                    <InstagramEmbed url={post.url} />
                    <figcaption className="mt-3 text-sm text-stone">
                      {post.caption}
                      {project && (
                        <>
                          {" · "}
                          <Link
                            to={`/portfolio/${project.slug}`}
                            className="text-bronze-deep underline-offset-4 transition-colors hover:text-ink hover:underline"
                          >
                            {project.title}
                          </Link>
                        </>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        </section>
      )}

      {media.length > 0 && (
        <section className="container-site pb-20 md:pb-28">
          <SectionHeading eyebrow="Photography" title="Production photographs" />
          <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
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
      )}

      <ClosingCta
        title="Media & press enquiries"
        text="For interviews, features, speaking invitations or image requests, please get in touch."
      />
    </>
  );
}
