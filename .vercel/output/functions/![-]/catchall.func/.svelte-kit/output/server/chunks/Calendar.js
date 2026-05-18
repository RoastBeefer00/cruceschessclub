import { F as fallback, D as escape_html, j as attr, af as stringify, A as ensure_array_like, z as element, m as bind_props, k as attr_class } from "./renderer.js";
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function Calendar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let month = $$props["month"];
    let useGoogleCalendar = fallback($$props["useGoogleCalendar"], true);
    let nextEventOnly = fallback($$props["nextEventOnly"], false);
    let serverEvents = fallback($$props["serverEvents"], null);
    let wednesdays = getWednesdays(month);
    let month_name;
    if (month > 11) {
      month_name = months[month - 12];
    } else {
      month_name = months[month];
    }
    let calendarEvents = [];
    let sortedEvents = [];
    if (serverEvents) {
      calendarEvents = Array.isArray(serverEvents) ? serverEvents : [];
      sortedEvents = getSortedEvents(calendarEvents);
    }
    function parseEventDate(event) {
      if (event.start.dateTime) {
        return new Date(event.start.dateTime);
      }
      const [y, m, d] = event.start.date.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    function getSortedEvents(events) {
      return events.map((event) => ({ ...event, dateObj: parseEventDate(event) })).sort((a, b) => a.dateObj - b.dateObj);
    }
    function getWednesdays(month_index) {
      var current_date = /* @__PURE__ */ new Date();
      var month2 = month_index;
      var year;
      if (month_index > 11) {
        year = current_date.getFullYear() + 1;
        month2 = month2 - 12;
      } else {
        year = current_date.getFullYear();
      }
      var d = new Date(year, month2), month2 = d.getMonth(), wednesdays2 = [];
      d.setDate(1);
      while (d.getDay() != 3) {
        d.setDate(d.getDate() + 1);
      }
      while (d.getMonth() == month2) {
        wednesdays2.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
      }
      return wednesdays2;
    }
    if (nextEventOnly) {
      $$renderer2.push("<!--[2-->");
      if (calendarEvents.length > 0) {
        $$renderer2.push("<!--[0-->");
        const event = calendarEvents[0];
        const eventDate = parseEventDate(event);
        $$renderer2.push(`<article class="border border-line bg-paper rounded-lg p-8 md:p-12 space-y-6"><div class="flex items-center gap-3"><span class="block h-px w-10 bg-accent" aria-hidden="true"></span> <span class="text-xs uppercase tracking-[0.22em] text-accent font-medium">Next event</span></div> <h3 class="font-display text-3xl md:text-5xl text-ink leading-tight tracking-tight">${escape_html(event.summary)}</h3> <dl class="grid gap-4 sm:grid-cols-2 text-ink-soft"><div class="space-y-1"><dt class="text-xs uppercase tracking-widest text-mute">Date</dt> <dd class="text-lg font-medium text-ink"><span class="hidden md:inline">${escape_html(eventDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }))}</span> <span class="md:hidden">${escape_html(eventDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        }))}</span></dd></div> `);
        if (event.start.dateTime) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="space-y-1"><dt class="text-xs uppercase tracking-widest text-mute">Time</dt> <dd class="text-lg font-medium text-ink">${escape_html(eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))}</dd></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></dl> `);
        if (event.location) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a${attr("href", `https://www.google.com/maps/search/?api=1&query=${stringify(encodeURIComponent(event.location))}`)} target="_blank" rel="noopener noreferrer" class="block border border-line rounded-md p-5 transition-soft hover:border-accent hover:text-accent"><div class="text-xs uppercase tracking-widest text-mute mb-1">Location</div> <div class="text-lg font-medium text-ink">${escape_html(event.location)}</div></a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></article>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="border border-line bg-paper-2/40 rounded-lg p-10 text-center text-mute"><p class="font-display text-xl text-ink mb-2">Schedule is being set</p> <p class="text-sm">Check back soon for the next meet-up.</p></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<section class="space-y-6"${attr("aria-label", `${stringify(month_name)} schedule`)}><header class="flex items-baseline justify-between border-b border-line pb-3"><h2 class="font-display text-3xl md:text-4xl text-ink tracking-tight">${escape_html(month_name)}</h2> <span class="text-xs uppercase tracking-[0.22em] text-mute">${escape_html(sortedEvents.length > 0 ? `${sortedEvents.length} ${sortedEvents.length === 1 ? "event" : "events"}` : "TBD")}</span></header> <ul class="space-y-3">`);
      if (sortedEvents.length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<!--[-->`);
        const each_array = ensure_array_like(sortedEvents);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let event = each_array[$$index];
          const hasTime = !!event.start?.dateTime;
          const card = event.location ? "a" : "div";
          $$renderer2.push(`<li>`);
          element(
            $$renderer2,
            card,
            () => {
              $$renderer2.push(`${attr("href", event.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}` : void 0)}${attr("target", event.location ? "_blank" : void 0)}${attr("rel", event.location ? "noopener noreferrer" : void 0)}${attr_class(`group grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-center p-5 md:p-6 border border-line rounded-md bg-paper transition-soft ${stringify(event.location ? "hover:border-accent hover:bg-paper-2/60" : "")}`)}`);
            },
            () => {
              $$renderer2.push(`<time${attr("datetime", event.dateObj.toISOString())} class="flex flex-col items-center justify-center w-16 md:w-20 py-3 border-r border-line pr-5 md:pr-7"><span class="text-[10px] md:text-xs uppercase tracking-[0.22em] text-accent font-medium">${escape_html(event.dateObj.toLocaleDateString("en-US", { weekday: "short" }))}</span> <span class="font-display text-3xl md:text-4xl text-ink leading-none mt-1">${escape_html(event.dateObj.getDate())}</span> <span class="text-[10px] md:text-xs uppercase tracking-widest text-mute mt-1">${escape_html(event.dateObj.toLocaleDateString("en-US", { month: "short" }))}</span></time> <div class="min-w-0 space-y-1"><div class="font-display text-xl md:text-2xl text-ink leading-tight truncate">${escape_html(event.summary || "TBD")}</div> <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">`);
              if (hasTime) {
                $$renderer2.push("<!--[0-->");
                $$renderer2.push(`<span>${escape_html(event.dateObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))}</span>`);
              } else {
                $$renderer2.push("<!--[-1-->");
                $$renderer2.push(`<span class="text-mute italic">Time TBD</span>`);
              }
              $$renderer2.push(`<!--]--> `);
              if (event.location) {
                $$renderer2.push("<!--[0-->");
                $$renderer2.push(`<span class="text-mute" aria-hidden="true">·</span> <span class="truncate text-ink-soft group-hover:text-accent transition-soft">${escape_html(event.location)}</span>`);
              } else {
                $$renderer2.push("<!--[-1-->");
              }
              $$renderer2.push(`<!--]--></div></div>`);
            }
          );
          $$renderer2.push(`</li>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(wednesdays);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let wednesday = each_array_1[$$index_1];
          $$renderer2.push(`<li><div class="grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-center p-5 md:p-6 border border-dashed border-line rounded-md bg-paper-2/30"><time${attr("datetime", wednesday.toISOString())} class="flex flex-col items-center justify-center w-16 md:w-20 py-3 border-r border-line pr-5 md:pr-7"><span class="text-[10px] md:text-xs uppercase tracking-[0.22em] text-mute font-medium">${escape_html(wednesday.toLocaleDateString("en-US", { weekday: "short" }))}</span> <span class="font-display text-3xl md:text-4xl text-ink-soft leading-none mt-1">${escape_html(wednesday.getDate())}</span> <span class="text-[10px] md:text-xs uppercase tracking-widest text-mute mt-1">${escape_html(wednesday.toLocaleDateString("en-US", { month: "short" }))}</span></time> <div class="text-mute italic text-sm">Details coming soon</div></div></li>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></ul></section>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { month, useGoogleCalendar, nextEventOnly, serverEvents });
  });
}
export {
  Calendar as C,
  months as m
};
