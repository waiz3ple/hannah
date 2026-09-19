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
- Contact form: enquiries go to info@hannahoyawoye.com via [FormSubmit](https://formsubmit.co). The **first** submission sends an activation email to that inbox — click the link once to start receiving enquiries. Optionally, set `VITE_CONTACT_ENDPOINT` to the FormSubmit alias URL afterwards to hide the address from the page source.
- Confirm items marked `TO CONFIRM` in `content.ts` (roles, dates, venues, figures).
- Add testimonials once permissions are in place.

## Deploy

Hosted on Namecheap shared hosting (Apache/cPanel). **Automatic:** every push to `main` builds and uploads via GitHub Actions (`.github/workflows/deploy.yml`) once the repository secrets `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` are set (optional: `FTP_SERVER_DIR`, default `/public_html/`; `VITE_CONTACT_ENDPOINT`). **Manual:** run `npm run build` and upload the **contents** of `dist/` (including the hidden `.htaccess`) to `public_html`. The `.htaccess` handles HTTPS, www → non-www, SPA routing and caching.
