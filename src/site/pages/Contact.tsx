import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { contact } from "../content";
import { PageHero, Reveal, usePageMeta } from "../components/ui";

type Status = "idle" | "sending" | "sent" | "error";

const fieldCls =
  "mt-2 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-stone/60 transition-colors focus:border-bronze focus:ring-0 focus:outline-none";
const labelCls = "eyebrow text-stone";

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function Contact() {
  usePageMeta(
    "Contact",
    "Enquiries about live productions, creative projects, event operations, collaborations and speaking opportunities.",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot — real visitors never see or fill this field.
    if (data.company_website) {
      setStatus("sent");
      return;
    }

    const payload = {
      "Full name": data.full_name,
      Email: data.email,
      Organisation: data.organisation || "—",
      "Project / event": data.project || "—",
      "Enquiry type": data.enquiry_type,
      "Event date": data.event_date || "—",
      Location: data.location || "—",
      Message: data.message,
      _subject: `New enquiry: ${data.enquiry_type} — ${data.project || data.full_name}`,
      _replyto: data.email,
      _template: "table",
    };

    setStatus("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error(json.message ?? `HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setError(`Your message couldn't be sent just now. Please try again, or email ${contact.email} directly.`);
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's Work <em className="text-bronze-light">Together</em>
          </>
        }
        intro="I am open to conversations around live productions, creative projects, event operations, production management, collaborations and speaking opportunities. If you would like to discuss a project, please use the form below."
      />

      <section className="container-site grid gap-16 py-20 md:py-28 lg:grid-cols-[1fr_2fr] lg:gap-24">
        <Reveal className="space-y-10">
          <div>
            <p className="eyebrow text-bronze-deep">Enquiries</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {contact.enquiryTypes.map((t) => (
                <li key={t} className="border border-ink/15 px-3 py-1 text-xs text-stone">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {(contact.email || contact.linkedin || contact.instagram) && (
            <div>
              <p className="eyebrow text-bronze-deep">Elsewhere</p>
              <ul className="mt-5 space-y-3 text-lg">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.linkedin && (
                  <li>
                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                      LinkedIn
                    </a>
                  </li>
                )}
                {contact.instagram && (
                  <li>
                    <a
                      href={`https://instagram.com/${contact.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      Instagram @{contact.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
          <p className="text-sm leading-relaxed text-stone">
            Your details are used only to respond to your enquiry and are never shared.
          </p>
        </Reveal>

        <Reveal>
          {status === "sent" ? (
            <div role="status" className="border border-ink/15 bg-cream p-10 md:p-14">
              <CheckCircle2 className="size-8 text-bronze-deep" />
              <h2 className="mt-6 font-display text-4xl font-light">Thank you.</h2>
              <p className="mt-4 max-w-md text-lg text-stone">
                Your enquiry is on its way. I'll get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm font-semibold text-bronze-deep underline-offset-4 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2" noValidate={false}>
              <div>
                <label htmlFor="full_name" className={labelCls}>
                  Full name *
                </label>
                <input id="full_name" name="full_name" required autoComplete="name" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  Email *
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="organisation" className={labelCls}>
                  Organisation
                </label>
                <input id="organisation" name="organisation" autoComplete="organization" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="project" className={labelCls}>
                  Project / event name
                </label>
                <input id="project" name="project" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="enquiry_type" className={labelCls}>
                  Enquiry type *
                </label>
                <select id="enquiry_type" name="enquiry_type" required defaultValue="" className={`${fieldCls} cursor-pointer`}>
                  <option value="" disabled>
                    Select…
                  </option>
                  {contact.enquiryTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="event_date" className={labelCls}>
                  Event date
                </label>
                <input id="event_date" name="event_date" type="date" min={today()} className={fieldCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="location" className={labelCls}>
                  Location
                </label>
                <input id="location" name="location" placeholder="City / venue" className={fieldCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelCls}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the project, scale and timeline…"
                  className={`${fieldCls} resize-y`}
                />
              </div>

              <div aria-hidden className="absolute -left-[9999px]">
                <label htmlFor="company_website">Leave this field empty</label>
                <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                {status === "error" ? (
                  <p role="alert" className="flex items-start gap-2 text-sm text-red-800">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    {error}
                  </p>
                ) : (
                  <p className="text-sm text-stone">* Required</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2.5 bg-ink px-8 py-4 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-bronze hover:text-ink disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      Sending <Loader2 className="size-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
