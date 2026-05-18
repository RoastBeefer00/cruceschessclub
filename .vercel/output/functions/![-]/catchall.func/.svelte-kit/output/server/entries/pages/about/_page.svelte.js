import { O as head } from "../../../chunks/renderer.js";
import { H as Hero } from "../../../chunks/Hero.js";
function _page($$renderer) {
  head("cwls5q", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>About — Cruces Chess Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="A Las Cruces organization dedicated to serving our chess community through financial support and outreach."/> <meta property="og:title" content="About — Cruces Chess Club"/>`);
  });
  Hero($$renderer, {
    eyebrow: "About the club",
    title: "A community",
    accent: "around the board.",
    lead: "A Las Cruces organization dedicated to serving our chess community through financial support and outreach.",
    align: "left"
  });
  $$renderer.push(`<!----> <section class="max-w-6xl mx-auto px-6 py-20"><div class="grid gap-10 md:grid-cols-12"><div class="md:col-span-8 space-y-6"><div class="flex items-center gap-3"><span class="block h-px w-10 bg-accent" aria-hidden="true"></span> <span class="text-xs uppercase tracking-[0.22em] text-accent font-medium">Our mission</span></div> <p class="font-display text-2xl md:text-3xl text-ink leading-snug max-w-[36ch]">To bring the community together to have fun and enjoy chess.</p> <p class="text-ink-soft text-lg leading-relaxed max-w-[60ch]">We support our members by providing chess boards and timers, and by
        enabling them to travel and compete at tournaments outside of Las
        Cruces. Every dollar that comes through the club goes back into
        equipment, entry fees, and outreach.</p></div> <aside class="md:col-span-4 border-l-2 border-accent pl-6 self-start"><p class="font-display italic text-xl text-ink-soft leading-snug">“Bringing the community together to enjoy chess.”</p> <p class="mt-3 text-xs uppercase tracking-[0.22em] text-mute">— Club founders</p></aside></div></section> <section class="bg-paper-2 border-y border-line"><figure><img src="/club_pics/image7(1).jpeg" alt="Cruces Chess Club members at a club gathering" class="w-full aspect-[21/9] object-cover"/> <figcaption class="max-w-6xl mx-auto px-6 py-4 text-sm italic text-mute">Wednesday meets — Las Cruces, New Mexico.</figcaption></figure></section>`);
}
export {
  _page as default
};
