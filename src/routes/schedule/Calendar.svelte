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

  // Use server-loaded events if available
  if (serverEvents) {
    calendarEvents = Array.isArray(serverEvents) ? serverEvents : [];
    sortedEvents = getSortedEvents(calendarEvents);
    console.log(
      "🔍 [Calendar Debug] Using server-loaded events:",
      calendarEvents.length,
    );
  }

  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  function getSortedEvents(events) {
    // Get the target year and month for this component instance
    const targetYear =
      month > 11 ? new Date().getFullYear() + 1 : new Date().getFullYear();
    const targetMonth = month > 11 ? month - 12 : month;

    return events
      .map((event) => {
        const dateStr = event.start.date || event.start.dateTime;
        // For all-day events, parse without timezone conversion
        const dateObj = event.start.date
          ? new Date(event.start.date + "T00:00:00") // Force local timezone
          : new Date(event.start.dateTime);

        return {
          ...event,
          dateObj,
        };
      })
      .filter((event) => {
        // Only include events that match this component's month
        return (
          event.dateObj.getFullYear() === targetYear &&
          event.dateObj.getMonth() === targetMonth
        );
      })
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
    console.log("(Year, Month): " + year + ", " + month);
    var d = new Date(year, month),
      month = d.getMonth(),
      wednesdays = [];

    d.setDate(1);

    // Get the first Wednesday in the Month
    while (d.getDay() != 3) {
      d.setDate(d.getDate() + 1);
    }

    while (d.getMonth() == month) {
      wednesdays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
    console.log(wednesdays);
    return wednesdays;
  }

  function getEventForDate(date) {
    if (!useGoogleCalendar || calendarEvents.length === 0) {
      console.log(
        "🔍 [Calendar Debug] No calendar events loaded or Google Calendar not used",
      );
      return null;
    }

    // Use local date string to avoid timezone issues
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    console.log("🔍 [Calendar Debug] Looking for event on:", dateStr);

    const event = calendarEvents.find((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      const eventDateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;
      console.log(
        "🔍 [Calendar Debug] Comparing with event date:",
        eventDateStr,
      );
      return eventDateStr === dateStr;
    });

    if (event) {
      console.log("🔍 [Calendar Debug] Found event:", event);
    } else {
      console.log("🔍 [Calendar Debug] No event found for", dateStr);
    }

    return event;
  }

  onMount(async () => {
    // Skip fetching if we already have server-loaded events
    if (serverEvents && calendarEvents.length > 0) {
      console.log("🔍 [Calendar Debug] Skipping fetch, using server data");
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
          console.log("🔍 [Calendar Debug] Fetching next event only");
          console.log("🔍 [Calendar Debug] URL:", url);
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
          console.log("🔍 [Calendar Debug] Fetching events for month");
          console.log("🔍 [Calendar Debug] URL:", url);
          console.log("🔍 [Calendar Debug] Time range:", { timeMin, timeMax });
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch calendar events");
        }

        const data = await response.json();
        calendarEvents = data.items || [];
        sortedEvents = getSortedEvents(calendarEvents);

        console.log("🔍 [Calendar Debug] Response data:", data);
        console.log(
          "🔍 [Calendar Debug] Number of events:",
          calendarEvents.length,
        );
        console.log(
          "🔍 [Calendar Debug] Events:",
          JSON.stringify(calendarEvents, null, 2),
        );

        // Debug: Test getEventForDate for each Wednesday
        console.log("🧪 [Debug] Testing getEventForDate for each Wednesday:");
        wednesdays.forEach((wednesday, index) => {
          console.log(
            `🧪 [Debug] Wednesday ${index + 1}:`,
            wednesday.toISOString().split("T")[0],
          );
          const event = getEventForDate(wednesday);
          console.log(
            `🧪 [Debug] Result:`,
            event ? `Found: ${event.summary}` : "No event found",
          );
        });
      } catch (err) {
        console.error("❌ [Calendar Debug] Error loading calendar:", err);
        error = err.message;
      } finally {
        loading = false;
      }
    }
  });
</script>

<div
  class="bg-white rounded-xl shadow-lg m-4 overflow-hidden border border-gray-200"
>
  {#if !nextEventOnly}
    <div class="bg-linear-to-r from-gray-800 to-gray-900 text-white p-4 md:p-6">
      <h2
        class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center"
      >
        {month_name}
      </h2>
      <div class="h-1 w-24 bg-white/30 rounded-full mt-3 mx-auto"></div>
    </div>
  {/if}

  {#if loading}
    <div class="text-center p-8 text-gray-600">
      <svg
        class="animate-spin h-8 w-8 mx-auto mb-3 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Loading calendar...
    </div>
  {:else if error}
    <div class="text-center p-8">
      <div
        class="inline-flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">Error: {error}</span>
      </div>
    </div>
  {:else if nextEventOnly}
    {#if calendarEvents.length > 0}
      {@const event = calendarEvents[0]}
      {@const eventDate = new Date(event.start.dateTime || event.start.date)}
      <div class="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-50 to-white">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <div
            class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide"
          >
            Next Event
          </div>

          <h3
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            {event.summary}
          </h3>

          <div
            class="flex flex-col md:flex-row items-center justify-center gap-6 text-lg md:text-xl text-gray-700"
          >
            <div class="flex items-center gap-2">
              <svg
                class="w-6 h-6 text-blue-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="font-semibold">
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
              </span>
            </div>

            {#if event.start.dateTime}
              <div class="flex items-center gap-2">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="font-semibold">
                  {eventDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            {/if}
          </div>

          {#if event.location}
            <a
              href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
                event.location,
              )}"
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Google Maps"
              class="block bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex items-start justify-center gap-3">
                <svg
                  class="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div class="text-left">
                  <div
                    class="text-sm text-gray-500 uppercase tracking-wide mb-1"
                  >
                    Location
                  </div>
                  <div class="text-lg md:text-xl font-medium text-gray-900">
                    {event.location}
                  </div>
                </div>
              </div>
            </a>
          {/if}

          <!-- {#if event.description} -->
          <!--   <div class="text-gray-700 text-base md:text-lg leading-relaxed mt-6"> -->
          <!--     {event.description} -->
          <!--   </div> -->
          <!-- {/if} -->
        </div>
      </div>
    {:else}
      <div class="text-center p-12 text-gray-500">
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="text-xl font-medium">No upcoming events scheduled</p>
      </div>
    {/if}
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm md:text-base">
        <thead
          class="bg-linear-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200"
        >
          <tr>
            <th
              class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              Address
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#if sortedEvents.length > 0}
            {#each sortedEvents as event}
              <tr class="hover:bg-gray-50 transition-colors">
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-800 font-medium text-xs md:text-base"
                >
                  <div
                    class="flex flex-col md:flex-row md:items-center md:gap-1"
                  >
                    <span class="whitespace-nowrap">
                      {event.dateObj.getMonth() +
                        1}/{event.dateObj.getDate()}/{event.dateObj.getFullYear()}
                    </span>
                    <span class="text-gray-400 text-xs md:text-base"
                      >({getDayName(event.dateObj.getDate(), "en-US")})</span
                    >
                  </div>
                </td>
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-xs md:text-base"
                >
                  {#if event.start?.dateTime}
                    <span class="text-gray-700"
                      >{event.dateObj.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}</span
                    >
                  {:else}
                    <span class="text-gray-400 italic">TBD</span>
                  {/if}
                </td>
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-xs md:text-base"
                >
                  {#if event.summary}
                    <span class="text-gray-700">{event.summary}</span>
                  {:else}
                    <span class="text-gray-400 italic">TBD</span>
                  {/if}
                </td>
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-xs md:text-base"
                >
                  {#if event.location}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
                        event.location,
                      )}"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in Google Maps"
                      class="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {event.location}
                    </a>
                  {:else}
                    <span class="text-gray-400 italic">TBD</span>
                  {/if}
                </td>
              </tr>
            {/each}
          {:else}
            {#each wednesdays as wednesday}
              <tr class="hover:bg-gray-50 transition-colors">
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-800 font-medium whitespace-nowrap text-xs md:text-base"
                >
                  {wednesday.getMonth() +
                    1}/{wednesday.getDate()}/{wednesday.getFullYear()}
                </td>
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-400 italic text-xs md:text-base"
                  >TBD</td
                >
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-400 italic text-xs md:text-base"
                  >TBD</td
                >
                <td
                  class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-400 italic text-xs md:text-base"
                  >TBD</td
                >
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  {/if}
</div>
