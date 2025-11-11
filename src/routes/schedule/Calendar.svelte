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
  let loading = false;
  let error = null;

  // Use server-loaded events if available
  if (serverEvents) {
    calendarEvents = Array.isArray(serverEvents) ? serverEvents : [];
    console.log('🔍 [Calendar Debug] Using server-loaded events:', calendarEvents.length);
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
      console.log('🔍 [Calendar Debug] No calendar events loaded or Google Calendar not used');
      return null;
    }
    
    // Use local date string to avoid timezone issues
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    console.log('🔍 [Calendar Debug] Looking for event on:', dateStr);
    
    const event = calendarEvents.find(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      const eventDateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
      console.log('🔍 [Calendar Debug] Comparing with event date:', eventDateStr);
      return eventDateStr === dateStr;
    });
    
    if (event) {
      console.log('🔍 [Calendar Debug] Found event:', event);
    } else {
      console.log('🔍 [Calendar Debug] No event found for', dateStr);
    }
    
    return event;
  }

  onMount(async () => {
    // Skip fetching if we already have server-loaded events
    if (serverEvents && calendarEvents.length > 0) {
      console.log('🔍 [Calendar Debug] Skipping fetch, using server data');
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
          console.log('🔍 [Calendar Debug] Fetching next event only');
          console.log('🔍 [Calendar Debug] URL:', url);
        } else {
          const year = month > 11 ? new Date().getFullYear() + 1 : new Date().getFullYear();
          const actualMonth = month > 11 ? month - 12 : month;
          
          const timeMin = new Date(year, actualMonth, 1).toISOString();
          const timeMax = new Date(year, actualMonth + 1, 0, 23, 59, 59).toISOString();
          
          url = `/api/calendar?timeMin=${timeMin}&timeMax=${timeMax}`;
          console.log('🔍 [Calendar Debug] Fetching events for month');
          console.log('🔍 [Calendar Debug] URL:', url);
          console.log('🔍 [Calendar Debug] Time range:', { timeMin, timeMax });
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch calendar events');
        }
        
        const data = await response.json();
        calendarEvents = data.items || [];
        
        console.log('🔍 [Calendar Debug] Response data:', data);
        console.log('🔍 [Calendar Debug] Number of events:', calendarEvents.length);
        console.log('🔍 [Calendar Debug] Events:', JSON.stringify(calendarEvents, null, 2));
        
        // Debug: Test getEventForDate for each Wednesday
        console.log('🧪 [Debug] Testing getEventForDate for each Wednesday:');
        wednesdays.forEach((wednesday, index) => {
          console.log(`🧪 [Debug] Wednesday ${index + 1}:`, wednesday.toISOString().split('T')[0]);
          const event = getEventForDate(wednesday);
          console.log(`🧪 [Debug] Result:`, event ? `Found: ${event.summary}` : 'No event found');
        });
      } catch (err) {
        console.error('❌ [Calendar Debug] Error loading calendar:', err);
        error = err.message;
      } finally {
        loading = false;
      }
    }
  });
</script>

<div class="bg-white rounded-xl shadow-lg m-4 overflow-hidden border border-gray-200">
  <div class="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 md:p-6">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center">
      {month_name}
    </h2>
    <div class="h-1 w-24 bg-white/30 rounded-full mt-3 mx-auto"></div>
  </div>

  {#if loading}
    <div class="text-center p-8 text-gray-600">
      <svg class="animate-spin h-8 w-8 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading calendar...
    </div>
  {:else if error}
    <div class="text-center p-8">
      <div class="inline-flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span class="font-medium">Error: {error}</span>
      </div>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm md:text-base">
        <thead class="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
              Date
            </th>
            <th class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each wednesdays as wednesday}
            {#if calendarEvents.length > 0}
              {@const event = getEventForDate(wednesday)}
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-800 font-medium whitespace-nowrap text-xs md:text-base">
                  {wednesday.getMonth() + 1}/{wednesday.getDate()}/{wednesday.getFullYear()}
                </td>
                <td class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-xs md:text-base">
                  {#if event?.summary}
                    <span class="text-gray-700">{event.summary}</span>
                  {:else}
                    <span class="text-gray-400 italic">TBD</span>
                  {/if}
                </td>
                <td class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-xs md:text-base">
                  {#if event?.location}
                    <span class="text-gray-700">{event.location}</span>
                  {:else}
                    <span class="text-gray-400 italic">TBD</span>
                  {/if}
                </td>
              </tr>
            {:else}
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-800 font-medium whitespace-nowrap text-xs md:text-base">
                  {wednesday.getMonth() + 1}/{wednesday.getDate()}/{wednesday.getFullYear()}
                </td>
                <td class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-400 italic text-xs md:text-base">TBD</td>
                <td class="px-2 md:px-4 lg:px-6 py-3 md:py-4 text-gray-400 italic text-xs md:text-base">TBD</td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
