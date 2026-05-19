<script>
  import Calendar from "./Calendar.svelte";
  import Hero from "$lib/Hero.svelte";
  import { months } from "./months";
  import { writable } from "svelte/store";

  export let data;

  let current_date = new Date();
  let month = writable(current_date.getMonth());

  function handleSelect(choice) {
    $month = choice;
  }

  function getAdjustedMonth(month) {
    if (month > 11) {
      return month - 12;
    } else {
      return month;
    }
  }

  $: monthChoices = [
    current_date.getMonth(),
    current_date.getMonth() + 1,
    current_date.getMonth() + 2,
  ];
</script>

<svelte:head>
  <title>Schedule — Cruces Chess Club</title>
  <meta
    name="description"
    content="Find out when and where the Cruces Chess Club is meeting next."
  />
  <meta property="og:title" content="Schedule — Cruces Chess Club" />
</svelte:head>

<Hero
  eyebrow="Meetings"
  title="The"
  accent="schedule."
  lead="Find out when and where we'll be meeting next."
  align="left"
/>

<section class="max-w-5xl mx-auto px-6 py-16 space-y-10">
  <div class="flex justify-center">
    <div
      class="grid grid-cols-3 w-full max-w-md border border-line rounded-md overflow-hidden bg-paper"
      role="tablist"
      aria-label="Select month"
    >
      {#each monthChoices as choice}
        <button
          type="button"
          role="tab"
          aria-selected={$month === choice}
          class="px-4 py-3 text-sm font-medium text-center transition-soft
            {$month === choice
            ? 'bg-ink text-paper'
            : 'text-ink-soft hover:bg-paper-2'}"
          on:click={() => handleSelect(choice)}
        >
          {months[getAdjustedMonth(choice)]}
        </button>
      {/each}
    </div>
  </div>

  {#each monthChoices as choice}
    {#if $month === choice}
      <Calendar
        month={choice}
        useGoogleCalendar={true}
        serverEvents={data.calendarEvents[choice] || []}
      />
    {/if}
  {/each}
</section>
