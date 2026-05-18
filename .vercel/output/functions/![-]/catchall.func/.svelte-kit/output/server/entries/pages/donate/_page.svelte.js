import { O as head, A as ensure_array_like, j as attr, D as escape_html } from "../../../chunks/renderer.js";
import { H as Hero } from "../../../chunks/Hero.js";
function _page($$renderer) {
  const amounts = [
    { value: 25, note: "Tournament entry for a junior" },
    { value: 50, note: "A new club clock" },
    { value: 100, note: "A full board + pieces set" }
  ];
  const donateMailto = "mailto:roastbeefer000@gmail.com?subject=Cruces%20Chess%20Club%20donation";
  head("5j3k8c", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Donate — Cruces Chess Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Support the Cruces Chess Club. Your contribution funds boards, clocks, tournament entries, and outreach."/> <meta property="og:title" content="Donate — Cruces Chess Club"/>`);
  });
  Hero($$renderer, {
    eyebrow: "Support us",
    title: "Help fund the next",
    accent: "generation.",
    lead: "Every contribution goes straight back into the club — equipment, tournament fees, and getting kids to the board.",
    align: "left"
  });
  $$renderer.push(`<!----> <section class="max-w-6xl mx-auto px-6 py-16"><div class="grid gap-12 md:grid-cols-12"><div class="md:col-span-7 space-y-5 text-ink-soft text-lg leading-relaxed"><div class="flex items-center gap-3 mb-2"><span class="block h-px w-10 bg-accent" aria-hidden="true"></span> <span class="text-xs uppercase tracking-[0.22em] text-accent font-medium">Where it goes</span></div> <p class="font-display text-2xl md:text-3xl text-ink leading-snug">100% of donations stay in the club.</p> <p>Boards, clocks, and pieces wear out faster than you'd think with a busy
        Wednesday meet. Donations keep the equipment fresh so any new player
        can sit down and start a game.</p> <p>Tournament entry fees are the biggest barrier for our junior members —
        contributions cover entry, travel, and lodging for kids competing
        outside Las Cruces.</p> <p>Scholastic outreach: chess sets, instructional material, and after-school
        coaching at local schools.</p></div> <aside class="md:col-span-5"><div class="border border-line rounded-md p-6 md:p-8 space-y-5 bg-paper-2/40"><div class="text-xs uppercase tracking-[0.22em] text-accent font-medium">Make a contribution</div> <ul class="space-y-3"><!--[-->`);
  const each_array = ensure_array_like(amounts);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let amount = each_array[$$index];
    $$renderer.push(`<li><a${attr("href", donateMailto)} class="flex items-baseline justify-between border border-line rounded-md px-4 py-3 transition-soft hover:border-accent hover:bg-paper active:translate-y-px"><span class="font-display text-2xl text-ink">$${escape_html(amount.value)}</span> <span class="text-xs text-mute uppercase tracking-widest">${escape_html(amount.note)}</span></a></li>`);
  }
  $$renderer.push(`<!--]--></ul> <a${attr("href", donateMailto)} class="block text-center text-sm text-accent underline-offset-4 hover:underline transition-soft">Other amount →</a> <p class="text-xs text-mute italic">Donations are arranged by email for now. Online giving is coming soon.</p></div></aside></div> <div class="mt-20 max-w-3xl"><div class="flex items-center gap-3 mb-6"><span class="block h-px w-10 bg-accent" aria-hidden="true"></span> <span class="text-xs uppercase tracking-[0.22em] text-accent font-medium">Questions</span></div> <div class="divide-y divide-line border-y border-line"><details class="group py-4"><summary class="flex items-center justify-between cursor-pointer text-ink font-medium list-none"><span>Is the club a registered 501(c)(3)?</span> <span class="text-accent transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span></summary> <p class="mt-3 text-ink-soft text-base leading-relaxed">We're working on the paperwork. Reach out by email and we'll share
          current status before your contribution.</p></details> <details class="group py-4"><summary class="flex items-center justify-between cursor-pointer text-ink font-medium list-none"><span>Can I donate equipment instead of money?</span> <span class="text-accent transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span></summary> <p class="mt-3 text-ink-soft text-base leading-relaxed">Yes — boards, clocks, books, and software licenses are all welcome.
          Email us first so we can confirm what's most needed.</p></details> <details class="group py-4"><summary class="flex items-center justify-between cursor-pointer text-ink font-medium list-none"><span>Do you sponsor specific players?</span> <span class="text-accent transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span></summary> <p class="mt-3 text-ink-soft text-base leading-relaxed">Travel and entry support is offered to active club members on a
          case-by-case basis, with priority for juniors and first-time
          tournament players.</p></details></div></div></section>`);
}
export {
  _page as default
};
