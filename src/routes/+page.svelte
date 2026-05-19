<script>
  import Calendar from "./schedule/Calendar.svelte";
  import Hero from "$lib/Hero.svelte";
  import SectionHeading from "$lib/SectionHeading.svelte";

  export let data;

  let current_date = new Date();
</script>

<svelte:head>
  <title>Cruces Chess Club — Las Cruces, NM</title>
  <meta
    name="description"
    content="A weekly chess community in Las Cruces. Open boards, lessons, and tournaments every Wednesday."
  />
  <meta property="og:title" content="Cruces Chess Club" />
  <meta
    property="og:description"
    content="A weekly chess community in Las Cruces."
  />
  <meta property="og:type" content="website" />
</svelte:head>

<Hero
  eyebrow="Las Cruces, NM"
  title="A weekly home for"
  accent="serious play."
  lead="Open boards, lessons, and friendly games every Wednesday evening. Tournaments throughout the year."
  align="left"
>
  <svelte:fragment slot="cta">
    <a
      href="/schedule"
      class="inline-flex items-center justify-center px-6 py-3 bg-ink text-paper rounded-md font-medium transition-soft hover:bg-accent active:translate-y-px"
    >
      See the schedule
    </a>
    <a
      href="/about"
      class="inline-flex items-center justify-center px-6 py-3 border border-line text-ink rounded-md font-medium transition-soft hover:border-accent hover:text-accent active:translate-y-px"
    >
      About the club
    </a>
  </svelte:fragment>

  <svelte:fragment slot="aside">
    <Calendar
      month={current_date.getMonth()}
      useGoogleCalendar={true}
      nextEventOnly={true}
      serverEvents={data.calendarEvents}
    />
  </svelte:fragment>
</Hero>

<section class="bg-paper-2 border-b border-line">
  <div class="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-12">
    <div class="md:col-span-5 space-y-5">
      <SectionHeading
        eyebrow="What to expect"
        title="Casual games,"
        accent="real coaching."
      />
      <p class="text-ink-soft text-lg leading-relaxed">
        Whether you've never moved a pawn or you're chasing your next rating
        milestone, there's a board open for you. Bring your own set if you
        have one — we'll cover the rest.
      </p>
    </div>

    <ul class="md:col-span-7 grid gap-8 sm:grid-cols-3 text-sm">
      <li class="border-t border-line pt-5">
        <div
          class="text-xs uppercase tracking-[0.22em] text-accent font-medium mb-2"
        >
          01 — Boards
        </div>
        <p class="text-ink-soft leading-relaxed">
          Club-owned sets and clocks always available. No equipment required to
          show up.
        </p>
      </li>
      <li class="border-t border-line pt-5">
        <div
          class="text-xs uppercase tracking-[0.22em] text-accent font-medium mb-2"
        >
          02 — Coaching
        </div>
        <p class="text-ink-soft leading-relaxed">
          Five active coaches across openings, fundamentals, endgame, and
          scholastic play.
        </p>
      </li>
      <li class="border-t border-line pt-5">
        <div
          class="text-xs uppercase tracking-[0.22em] text-accent font-medium mb-2"
        >
          03 — Tournaments
        </div>
        <p class="text-ink-soft leading-relaxed">
          Rated and unrated events through the year — and travel support for
          members.
        </p>
      </li>
    </ul>
  </div>
</section>

<section class="relative">
  <figure>
    <img
      src="/club_pics/image7(1).jpeg"
      alt="Cruces Chess Club members gathered for a Wednesday evening meet"
      class="w-full aspect-[16/7] object-cover"
    />
  </figure>
</section>
