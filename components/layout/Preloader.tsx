import Image from "next/image";
import { site } from "@/content/site";
import { animations } from "@/content/animations";

/**
 * Preloader markup. It is display:none by default (see globals.css) and only
 * shown when the inline script below adds `preload` to <html> — i.e. a real
 * browser with JavaScript, first page of the visit, motion allowed, not a bot.
 * The page content underneath is fully rendered HTML, so crawlers are unaffected.
 */
export function Preloader() {
  if (!animations.preloader.enabled) return null;
  return (
    <div id="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <Image src={site.logo.src} alt="" width={site.logo.width * 2.2} height={site.logo.height * 2.2} unoptimized priority />
        <span className="preloader-bar" />
      </div>
    </div>
  );
}

/** Runs in <head> before first paint. Kept tiny and dependency-free. */
export function headScript() {
  const p = animations.preloader;
  const cfg = JSON.stringify({ on: p.enabled, once: p.oncePerSession, min: p.minMs, max: p.maxMs });
  return `(function(){var d=document.documentElement,c=${cfg};
var bot=/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|google-inspectiontool|gptbot|claude|perplexity/i.test(navigator.userAgent)||navigator.webdriver;
if(bot){d.classList.add('is-bot');return;}
d.classList.add('js');
try{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!c.on||rm||(c.once&&sessionStorage.getItem('ax-pl')))return;
sessionStorage.setItem('ax-pl','1');d.classList.add('preload');
var t0=Date.now(),done=false;
function end(){if(done)return;done=true;d.classList.add('preload-done');setTimeout(function(){d.classList.remove('preload','preload-done')},450);}
setTimeout(end,c.max);
window.addEventListener('load',function(){setTimeout(end,Math.max(0,c.min-(Date.now()-t0)));});
}catch(e){}})();`;
}
