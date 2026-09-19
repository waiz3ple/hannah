# Hannah Esan Oyawoye — Portfolio

Personal portfolio for Hannah Esan Oyawoye, Live Production Manager | Creative Project Manager | Event Curator.

Built with Vite, React, React Router, Tailwind CSS v4 and Motion.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Where things live

- `src/site/content.ts` — **all copy**: profile, projects/case studies, expertise, articles, contact details, media, testimonials. Edit this file to update the site.
- `src/site/pages/` — Home, About, Portfolio + Case Study, Expertise, Behind the Programme + Article, Media, Contact, 404.
- `src/site/components/` — layout (header/footer), shared UI, project artwork.
- `src/site/site.css` — theme tokens (charcoal / cream / bronze), fonts, utilities.

## Before launch (from the working document)

- Add photography: import images into a project's `image` / `gallery` fields, and add items to `media`.
- Confirm `contact.instagram` and set `profile.profileUrl` (PDF) in `content.ts`.
- Contact form: set `VITE_CONTACT_ENDPOINT` (e.g. a Formspree form URL) in `.env.local` / hosting env. Without it, the form falls back to a `mailto:` to `contact.email`.
- Confirm items marked `TO CONFIRM` in `content.ts` (roles, dates, venues, figures).
- Add testimonials once permissions are in place.

## Deploy

SPA rewrites are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`).
