import { J as getContext, D as escape_html, ad as store_get, j as attr, k as attr_class, A as ensure_array_like, af as stringify, aa as slot, aj as unsubscribe_stores } from "../../chunks/renderer.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="bg-ink text-paper mt-24"><div class="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-12"><div class="md:col-span-4 space-y-3"><div class="flex items-center gap-3"><img src="/ccc.png" alt="" class="h-8 w-8"/> <span class="font-display text-xl">Cruces Chess Club</span></div> <p class="text-sm text-paper/70 max-w-xs leading-relaxed">A weekly chess community in Las Cruces, New Mexico. Open boards, friendly
        games, real coaching.</p></div> <nav class="md:col-span-4 grid grid-cols-2 gap-y-2 text-sm" aria-label="Footer"><a class="hover:text-accent transition-soft" href="/about">About</a> <a class="hover:text-accent transition-soft" href="/lessons">Lessons</a> <a class="hover:text-accent transition-soft" href="/schedule">Schedule</a> <a class="hover:text-accent transition-soft" href="/donate">Donate</a> <a class="hover:text-accent transition-soft" href="/support">Support</a> <a class="hover:text-accent transition-soft" href="/privacy">Privacy</a></nav> <div class="md:col-span-4 space-y-3"><div class="text-xs uppercase tracking-[0.22em] text-paper/60 font-medium">Play with us online</div> <a href="https://www.chess.com/club/cruces-chess-club" class="block max-w-xs border border-paper/15 rounded-md overflow-hidden hover:border-accent transition-soft"><img src="/affiliate/Digital Leaderboard Ad.png" alt="Join the Cruces Chess Club on chess.com" class="w-full h-auto block"/></a></div></div> <div class="border-t border-paper/10"><div class="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-paper/60"><span>© ${escape_html(year)} Cruces Chess Club · Las Cruces, NM</span> <span class="flex gap-4"><a href="/privacy" class="hover:text-accent transition-soft">Privacy</a> <a href="/support" class="hover:text-accent transition-soft">Support</a></span></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let path;
    let burgerOpen = false;
    const links = [
      { href: "/about", label: "About" },
      { href: "/lessons", label: "Lessons" },
      { href: "/schedule", label: "Schedule" },
      { href: "/donate", label: "Donate" }
    ];
    path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    $$renderer2.push(`<a href="#main" class="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] bg-ink text-paper px-3 py-2 rounded-md text-sm">Skip to content</a> <nav class="bg-paper/85 backdrop-blur border-b border-line text-ink sticky top-0 z-50" aria-label="Main navigation"><div class="max-w-6xl mx-auto px-6"><div class="flex justify-between items-center h-16"><a href="/" class="flex items-center gap-3 group transition-soft"><img src="/ccc.png" alt="" class="h-7 w-7 brightness-0"/> <span class="font-display text-lg md:text-xl text-ink group-hover:text-accent transition-soft">Cruces Chess Club</span></a> <button type="button" class="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 transition-soft" aria-label="Toggle navigation menu"${attr("aria-expanded", burgerOpen)} aria-controls="mobile-menu"><span${attr_class(`block w-6 h-px bg-ink transition-soft ${stringify("")}`)} aria-hidden="true"></span> <span${attr_class(`block w-6 h-px bg-ink transition-soft ${stringify("")}`)} aria-hidden="true"></span> <span${attr_class(`block w-6 h-px bg-ink transition-soft ${stringify("")}`)} aria-hidden="true"></span></button> <ul class="hidden md:flex items-center gap-1 text-sm"><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", link.href)}${attr_class(`relative px-4 py-2 transition-soft hover:text-accent ${stringify(path === link.href ? "text-ink after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-accent" : "text-ink-soft")}`)}>${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div id="mobile-menu"${attr_class(`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${stringify("max-h-0")}`)}><ul class="flex flex-col gap-1 text-base"><!--[-->`);
    const each_array_1 = ensure_array_like(links);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let link = each_array_1[$$index_1];
      $$renderer2.push(`<li><a${attr("href", link.href)}${attr_class(`block px-4 py-2 rounded-md transition-soft ${stringify(path === link.href ? "text-ink bg-paper-2" : "text-ink-soft hover:bg-paper-2")}`)}>${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div></nav> <main id="main" class="min-h-[60vh]"><!--[-->`);
    slot($$renderer2, $$props, "default", {}, null);
    $$renderer2.push(`<!--]--></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
