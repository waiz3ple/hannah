import type { Project } from "../content";

const tones: Record<Project["tone"], { spot: string; haze: string }> = {
  bronze: { spot: "rgba(212,176,137,0.55)", haze: "rgba(135,96,58,0.45)" },
  ember: { spot: "rgba(232,140,90,0.5)", haze: "rgba(150,60,40,0.45)" },
  gold: { spot: "rgba(238,200,120,0.5)", haze: "rgba(150,110,40,0.45)" },
  violet: { spot: "rgba(170,140,230,0.45)", haze: "rgba(80,50,140,0.5)" },
  teal: { spot: "rgba(120,200,190,0.4)", haze: "rgba(30,90,95,0.5)" },
};

/**
 * Stage-lit title card shown until real production photography is supplied
 * via `project.image`.
 */
export function ProjectArt({
  project,
  size = "card",
  className = "",
}: {
  project: Project;
  size?: "card" | "hero";
  className?: string;
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} at ${project.venue}`}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const tone = tones[project.tone];
  const hero = size === "hero";

  return (
    <div
      aria-hidden
      className={`grain relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink p-6 text-paper md:p-8 ${className}`}
      style={{
        backgroundImage: `radial-gradient(ellipse 55% 70% at 50% -10%, ${tone.spot}, transparent 70%), radial-gradient(ellipse 90% 60% at 50% 115%, ${tone.haze}, transparent 70%)`,
      }}
    >
      {/* light beams */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-40 mix-blend-screen"
        style={{
          background: `conic-gradient(from 180deg at 50% -5%, transparent 162deg, ${tone.spot} 172deg, transparent 180deg, ${tone.spot} 188deg, transparent 198deg)`,
        }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="eyebrow text-paper/70">{project.venue}</span>
        {project.date && <span className="eyebrow text-paper/50">{project.date}</span>}
      </div>
      <div className="relative">
        <div className="mb-4 h-px w-12 bg-paper/40" />
        <p
          className={`font-display leading-[0.95] font-light tracking-tight ${hero ? "text-4xl sm:text-5xl md:text-7xl" : "text-3xl md:text-4xl"}`}
        >
          {project.title}
        </p>
        {project.subtitle && (
          <p className={`mt-2 font-display italic text-paper/70 ${hero ? "text-2xl" : "text-lg"}`}>{project.subtitle}</p>
        )}
      </div>
    </div>
  );
}
