import { ButtonLink, usePageMeta } from "../components/ui";

export function NotFound() {
  usePageMeta("Page not found");
  return (
    <section className="grain flex min-h-[80vh] items-center overflow-hidden bg-ink text-paper">
      <div className="container-site py-40">
        <p className="eyebrow text-bronze-light">404 · Off script</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] font-light md:text-7xl">
          This cue isn't in the <em className="text-bronze-light">running order.</em>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-paper/65">
          The page you're looking for has moved or doesn't exist.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/">Back to home</ButtonLink>
          <ButtonLink to="/portfolio" variant="outline-light">
            View portfolio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
