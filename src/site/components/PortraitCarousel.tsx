import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselSlide = { src: string; alt: string; caption?: string };

/**
 * Scroll-snap photo carousel that advances on its own, with a slow zoom on the
 * active slide. Swipe or drag to move manually; it pauses on hover and focus and
 * stays still when the visitor prefers reduced motion.
 */
export function PortraitCarousel({
  slides,
  label = "Photographs",
  interval = 4500,
  className = "",
}: {
  slides: CarouselSlide[];
  label?: string;
  interval?: number;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Bumped on every manual move so the autoplay timer starts a fresh interval.
  const [manualMoves, setManualMoves] = useState(0);
  const reduce = useReducedMotion();
  const count = slides.length;

  const current = () => {
    const el = track.current;
    return el ? Math.round(el.scrollLeft / el.clientWidth) : 0;
  };

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el || count === 0) return;
      const next = ((i % count) + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
      // Update straight away so dots and caption respond before the scroll settles;
      // the scroll listener keeps this correct for swipes.
      setIndex(next);
    },
    [count, reduce],
  );

  const move = (i: number) => {
    setManualMoves((n) => n + 1);
    goTo(i);
  };

  // Keep `index` in step with wherever the track has been scrolled or swiped to.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    const onResize = () => el.scrollTo({ left: Math.round(el.scrollLeft / el.clientWidth) * el.clientWidth });
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Autoplay. Advances from wherever the track actually is, so a swipe mid-interval
  // or a missed scroll event can never leave the timer stuck on one slide.
  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") goTo(current() + 1);
    }, interval);
    return () => window.clearInterval(id);
  }, [manualMoves, paused, reduce, count, interval, goTo]);

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={track}
        aria-roledescription="carousel"
        aria-label={label}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className="w-full shrink-0 snap-center overflow-hidden"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              className={`aspect-[4/5] w-full bg-sand object-cover object-[50%_25%] transition-transform ease-out ${
                i === index && !reduce ? "scale-[1.06] duration-[7000ms]" : "scale-100 duration-700"
              }`}
            />
          </li>
        ))}
      </ul>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => move(index - 1)}
            aria-label="Previous photograph"
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-ink/55 p-2 text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => move(index + 1)}
            aria-label="Next photograph"
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-ink/55 p-2 text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="min-h-5 text-sm text-stone" aria-live="polite">
          {slides[index]?.caption}
        </p>
        {count > 1 && (
          <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Choose photograph">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Photograph ${i + 1}`}
                onClick={() => move(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-stage ${
                  i === index ? "w-6 bg-bronze" : "w-1.5 bg-ink/20 hover:bg-ink/45"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
