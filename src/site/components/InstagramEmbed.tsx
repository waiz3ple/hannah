import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";
let scriptLoading: Promise<void> | undefined;

/** Loads Instagram's official embed script once and reuses it across the app. */
function loadEmbedScript() {
  if (window.instgrm) return Promise.resolve();
  if (!scriptLoading) {
    scriptLoading = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptLoading = undefined;
        reject(new Error("Instagram embed script failed to load"));
      };
      document.body.appendChild(script);
    });
  }
  return scriptLoading;
}

/**
 * Official Instagram post / reel embed. The blockquote is created outside React's
 * control because embed.js swaps it for an iframe once it has rendered.
 */
export function InstagramEmbed({
  url,
  captioned = false,
  className = "",
}: {
  url: string;
  captioned?: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const quote = document.createElement("blockquote");
    quote.className = "instagram-media";
    quote.setAttribute("data-instgrm-permalink", url);
    quote.setAttribute("data-instgrm-version", "14");
    if (captioned) quote.setAttribute("data-instgrm-captioned", "");
    quote.style.cssText = "background:#fff;border:0;margin:0;padding:0;width:100%;max-width:540px;min-width:280px;";
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "View this post on Instagram";
    link.style.cssText = "display:block;padding:2rem;text-align:center;font-size:0.875rem;color:#87603a;";
    quote.appendChild(link);
    el.replaceChildren(quote);

    let cancelled = false;
    loadEmbedScript()
      .then(() => {
        if (!cancelled) window.instgrm?.Embeds.process();
      })
      .catch(() => {
        /* The plain link above remains as the fallback. */
      });

    return () => {
      cancelled = true;
      el.replaceChildren();
    };
  }, [url, captioned]);

  return <div ref={host} className={`instagram-embed ${className}`} />;
}
