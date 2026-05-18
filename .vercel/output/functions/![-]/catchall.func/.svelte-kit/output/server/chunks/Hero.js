import { a4 as sanitize_slots, F as fallback, k as attr_class, D as escape_html, aa as slot, m as bind_props } from "./renderer.js";
function Hero($$renderer, $$props) {
  const $$slots = sanitize_slots($$props);
  let eyebrow = fallback($$props["eyebrow"], "");
  let title = fallback($$props["title"], "");
  let accent = fallback($$props["accent"], "");
  let lead = fallback($$props["lead"], "");
  let align = fallback($$props["align"], "left");
  $$renderer.push(`<section class="bg-paper border-b border-line" aria-labelledby="hero-title"><div${attr_class("max-w-6xl mx-auto px-6 pt-20 pb-16 grid gap-10 md:grid-cols-12 md:gap-8", void 0, {
    "items-center": align === "left",
    "text-center": align === "center"
  })}><div${attr_class("space-y-6", void 0, {
    "md:col-span-7": align === "left",
    "md:col-span-12": align === "center",
    "max-w-3xl": align === "center",
    "mx-auto": align === "center"
  })}>`);
  if (eyebrow) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div${attr_class("flex items-center gap-3", void 0, { "justify-center": align === "center" })}><span class="block h-px w-10 bg-accent" aria-hidden="true"></span> <span class="text-xs uppercase tracking-[0.22em] text-accent font-medium">${escape_html(eyebrow)}</span></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <h1 id="hero-title" class="display-headline font-display font-semibold text-ink text-5xl md:text-7xl leading-[0.95]">${escape_html(title)} `);
  if (accent) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<span class="block text-accent italic font-normal mt-1 md:mt-2">${escape_html(accent)}</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></h1> `);
  if (lead) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p${attr_class("text-lg md:text-xl text-ink-soft max-w-[52ch] leading-relaxed", void 0, { "mx-auto": align === "center" })}>${escape_html(lead)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if ($$slots.cta) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div${attr_class("flex flex-col sm:flex-row gap-3 pt-2", void 0, { "justify-center": align === "center" })}><!--[-->`);
    slot($$renderer, $$props, "cta", {}, null);
    $$renderer.push(`<!--]--></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div> `);
  if ($$slots.aside) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<aside${attr_class("md:col-span-5", void 0, { "hidden": align === "center", "md:block": align === "center" })}><!--[-->`);
    slot($$renderer, $$props, "aside", {}, null);
    $$renderer.push(`<!--]--></aside>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div></section>`);
  bind_props($$props, { eyebrow, title, accent, lead, align });
}
export {
  Hero as H
};
