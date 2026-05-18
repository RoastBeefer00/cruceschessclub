import { O as head, A as ensure_array_like, j as attr, ad as store_get, k as attr_class, af as stringify, D as escape_html, aj as unsubscribe_stores, m as bind_props } from "../../../chunks/renderer.js";
import { C as Calendar, m as months } from "../../../chunks/Calendar.js";
import { H as Hero } from "../../../chunks/Hero.js";
import { w as writable } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let monthChoices;
    let data = $$props["data"];
    let current_date = /* @__PURE__ */ new Date();
    let month = writable(current_date.getMonth());
    function getAdjustedMonth(month2) {
      if (month2 > 11) {
        return month2 - 12;
      } else {
        return month2;
      }
    }
    monthChoices = [
      current_date.getMonth(),
      current_date.getMonth() + 1,
      current_date.getMonth() + 2
    ];
    head("19rgvlq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Schedule — Cruces Chess Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Find out when and where the Cruces Chess Club is meeting next."/> <meta property="og:title" content="Schedule — Cruces Chess Club"/>`);
    });
    Hero($$renderer2, {
      eyebrow: "Meetings",
      title: "The",
      accent: "schedule.",
      lead: "Find out when and where we'll be meeting next.",
      align: "left"
    });
    $$renderer2.push(`<!----> <section class="max-w-5xl mx-auto px-6 py-16 space-y-10"><div class="flex justify-center"><div class="grid grid-cols-3 w-full max-w-md border border-line rounded-md overflow-hidden bg-paper" role="tablist" aria-label="Select month"><!--[-->`);
    const each_array = ensure_array_like(monthChoices);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let choice = each_array[$$index];
      $$renderer2.push(`<button type="button" role="tab"${attr("aria-selected", store_get($$store_subs ??= {}, "$month", month) === choice)}${attr_class(`px-4 py-3 text-sm font-medium text-center transition-soft ${stringify(store_get($$store_subs ??= {}, "$month", month) === choice ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-2")}`)}>${escape_html(months[getAdjustedMonth(choice)])}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <!--[-->`);
    const each_array_1 = ensure_array_like(monthChoices);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let choice = each_array_1[$$index_1];
      if (store_get($$store_subs ??= {}, "$month", month) === choice) {
        $$renderer2.push("<!--[0-->");
        Calendar($$renderer2, {
          month: choice,
          useGoogleCalendar: true,
          serverEvents: data.calendarEvents[choice] || []
        });
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
