<script>
  import { months } from "./months";
  import { onMount } from "svelte";

  export let month;
  export let useGoogleCalendar = true;
  export let nextEventOnly = false;
  export let serverEvents = null;

  let wednesdays = getWednesdays(month);
  let month_name;
  if (month > 11) {
    month_name = months[month - 12];
  } else {
    month_name = months[month];
  }
  let calendarEvents = [];
  let sortedEvents = [];
  let loading = false;
  let error = null;

  if (serverEvents) {
    calendarEvents = Array.isArray(serverEvents) ? serverEvents : [];
    sortedEvents = getSortedEvents(calendarEvents);
  }

  function parseEventDate(event) {
    const start = event?.start;
    if (!start) return new Date(NaN);
    if (start.dateTime) {
      return new Date(start.dateTime);
    }
    if (start.date) {
      const [y, m, d] = start.date.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date(NaN);
  }

  function getSortedEvents(events) {
    return events
      .map((event) => ({
        ...event,
        dateObj: parseEventDate(event),
      }))
      .sort((a, b) => a.dateObj - b.dateObj);
  }

  function getWednesdays(month_index) {
    var current_date = new Date();
    var month = month_index;
    var year;
    if (month_index > 11) {
      year = current_date.getFullYear() + 1;
      month = month - 12;
    } else {
      year = current_date.getFullYear();
    }
    var d = new Date(year, month),
      month = d.getMonth(),
      wednesdays = [];

    d.setDate(1);
    while (d.getDay() != 3) {
      d.setDate(d.getDate() + 1);
    }
    while (d.getMonth() == month) {
      wednesdays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
    return wednesdays;
  }

  onMount(async () => {
    if (serverEvents && calendarEvents.length > 0) {
      return;
    }

    if (useGoogleCalendar) {
      loading = true;
      error = null;

      try {
        let url;

        if (nextEventOnly) {
          const timeMin = new Date().toISOString();
          url = `/api/calendar?timeMin=${timeMin}&maxResults=1`;
        } else {
          const year =
            month > 11
              ? new Date().getFullYear() + 1
              : new Date().getFullYear();
          const actualMonth = month > 11 ? month - 12 : month;

          const timeMin = new Date(year, actualMonth, 1).toISOString();
          const timeMax = new Date(
            year,
            actualMonth + 1,
            0,
            23,
            59,
            59,
          ).toISOString();

          url = `/api/calendar?timeMin=${timeMin}&timeMax=${timeMax}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch calendar events");
        }

        const data = await response.json();
        calendarEvents = data.items || [];
        sortedEvents = getSortedEvents(calendarEvents);
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
  });
</script>

{#if loading}
  <div
    class="border border-line bg-paper-2/40 rounded-lg py-12 text-center text-mute"
    role="status"
    aria-live="polite"
  >
    <span class="animate-pulse text-sm uppercase tracking-[0.22em]">
      Loading calendar…
    </span>
  </div>
{:else if error}
  <div
    class="border border-line bg-accent-soft rounded-lg p-6 text-danger"
    role="alert"
  >
    <span class="font-medium">Calendar error:</span>
    <span>{error}</span>
  </div>
{:else if nextEventOnly}
  {#if calendarEvents.length > 0}
    {@const event = calendarEvents[0]}
    {@const eventDate = parseEventDate(event)}
    <article
      class="border border-line bg-paper rounded-lg p-8 md:p-12 space-y-6"
    >
      <div class="flex items-center gap-3">
        <span class="block h-px w-10 bg-accent" aria-hidden="true"></span>
        <span
          class="text-xs uppercase tracking-[0.22em] text-accent font-medium"
        >
          Next event
        </span>
      </div>

      <h3
        class="font-display text-3xl md:text-5xl text-ink leading-tight tracking-tight"
      >
        {event.summary}
      </h3>

      <dl
        class="grid gap-4 sm:grid-cols-2 text-ink-soft"
      >
        <div class="space-y-1">
          <dt class="text-xs uppercase tracking-widest text-mute">Date</dt>
          <dd class="text-lg font-medium text-ink">
            <span class="hidden md:inline">
              {eventDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span class="md:hidden">
              {eventDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </dd>
        </div>

        {#if event.start.dateTime}
          <div class="space-y-1">
            <dt class="text-xs uppercase tracking-widest text-mute">Time</dt>
            <dd class="text-lg font-medium text-ink">
              {eventDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </dd>
          </div>
        {/if}
      </dl>

      {#if event.location}
        <a
          href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
            event.location,
          )}"
          target="_blank"
          rel="noopener noreferrer"
          class="block border border-line rounded-md p-5 transition-soft hover:border-accent hover:text-accent"
        >
          <div class="text-xs uppercase tracking-widest text-mute mb-1">
            Location
          </div>
          <div class="text-lg font-medium text-ink">
            {event.location}
          </div>
        </a>
      {/if}
    </article>
  {:else}
    <div
      class="border border-line bg-paper-2/40 rounded-lg p-10 text-center text-mute"
    >
      <p class="font-display text-xl text-ink mb-2">
        Schedule is being set
      </p>
      <p class="text-sm">Check back soon for the next meet-up.</p>
    </div>
  {/if}
{:else}
  <section class="space-y-6" aria-label="{month_name} schedule">
    <header class="flex items-baseline justify-between border-b border-line pb-3">
      <h2 class="font-display text-3xl md:text-4xl text-ink tracking-tight">
        {month_name}
      </h2>
      <span class="text-xs uppercase tracking-[0.22em] text-mute">
        {sortedEvents.length > 0
          ? `${sortedEvents.length} ${sortedEvents.length === 1 ? "event" : "events"}`
          : "TBD"}
      </span>
    </header>

    <ul class="space-y-3">
      {#if sortedEvents.length > 0}
        {#each sortedEvents as event}
          {@const hasTime = !!event.start?.dateTime}
          {@const card = event.location
            ? "a"
            : "div"}
          <li>
            <svelte:element
              this={card}
              href={event.location
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
                : undefined}
              target={event.location ? "_blank" : undefined}
              rel={event.location ? "noopener noreferrer" : undefined}
              class="group grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-center p-5 md:p-6 border border-line rounded-md bg-paper transition-soft
                {event.location
                ? 'hover:border-accent hover:bg-paper-2/60'
                : ''}"
            >
              <time
                datetime={event.dateObj.toISOString()}
                class="flex flex-col items-center justify-center w-16 md:w-20 py-3 border-r border-line pr-5 md:pr-7"
              >
                <span
                  class="text-[10px] md:text-xs uppercase tracking-[0.22em] text-accent font-medium"
                >
                  {event.dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span
                  class="font-display text-3xl md:text-4xl text-ink leading-none mt-1"
                >
                  {event.dateObj.getDate()}
                </span>
                <span
                  class="text-[10px] md:text-xs uppercase tracking-widest text-mute mt-1"
                >
                  {event.dateObj.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </time>

              <div class="min-w-0 space-y-1">
                <div class="font-display text-xl md:text-2xl text-ink leading-tight truncate">
                  {event.summary || "TBD"}
                </div>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                  {#if hasTime}
                    <span>
                      {event.dateObj.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  {:else}
                    <span class="text-mute italic">Time TBD</span>
                  {/if}
                  {#if event.location}
                    <span class="text-mute" aria-hidden="true">·</span>
                    <span
                      class="truncate text-ink-soft group-hover:text-accent transition-soft"
                    >
                      {event.location}
                    </span>
                  {/if}
                </div>
              </div>
            </svelte:element>
          </li>
        {/each}
      {:else}
        {#each wednesdays as wednesday}
          <li>
            <div
              class="grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-center p-5 md:p-6 border border-dashed border-line rounded-md bg-paper-2/30"
            >
              <time
                datetime={wednesday.toISOString()}
                class="flex flex-col items-center justify-center w-16 md:w-20 py-3 border-r border-line pr-5 md:pr-7"
              >
                <span
                  class="text-[10px] md:text-xs uppercase tracking-[0.22em] text-mute font-medium"
                >
                  {wednesday.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span
                  class="font-display text-3xl md:text-4xl text-ink-soft leading-none mt-1"
                >
                  {wednesday.getDate()}
                </span>
                <span
                  class="text-[10px] md:text-xs uppercase tracking-widest text-mute mt-1"
                >
                  {wednesday.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </time>
              <div class="text-mute italic text-sm">
                Details coming soon
              </div>
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </section>
{/if}
