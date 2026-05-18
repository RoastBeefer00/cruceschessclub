import { O as head, A as ensure_array_like, j as attr, af as stringify, D as escape_html } from "../../../chunks/renderer.js";
import { H as Hero } from "../../../chunks/Hero.js";
function _page($$renderer) {
  const contacts = [
    {
      name: "Isaac",
      role: "General questions, scheduling",
      email: "isaac@isaachimself.com"
    },
    {
      name: "Jake",
      role: "Site, lessons, tournaments",
      email: "roastbeefer000@gmail.com"
    }
  ];
  head("1j5tn20", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Support — Cruces Chess Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Reach the Cruces Chess Club organizers for membership, scheduling, or site questions."/> <meta property="og:title" content="Support — Cruces Chess Club"/>`);
  });
  Hero($$renderer, {
    eyebrow: "Get in touch",
    title: "Need a hand?",
    accent: "We're here.",
    lead: "Reach out for membership, scheduling, lessons, or anything else club-related.",
    align: "left"
  });
  $$renderer.push(`<!----> <section class="max-w-3xl mx-auto px-6 py-16"><div class="grid gap-5 md:grid-cols-2"><!--[-->`);
  const each_array = ensure_array_like(contacts);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let contact = each_array[$$index];
    $$renderer.push(`<a${attr("href", `mailto:${stringify(contact.email)}`)} class="block border border-line rounded-md p-6 transition-soft hover:border-accent hover:bg-paper-2"><div class="text-xs uppercase tracking-[0.22em] text-accent mb-2">${escape_html(contact.role)}</div> <div class="font-display text-2xl text-ink mb-2">${escape_html(contact.name)}</div> <div class="text-ink-soft text-sm underline-offset-4 hover:underline">${escape_html(contact.email)}</div></a>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
export {
  _page as default
};
