<script>
  import Bio from "./Bio.svelte";
  import Hero from "$lib/Hero.svelte";
  import Coaches from "$lib/Coaches.json";
</script>

<svelte:head>
  <title>Lessons — Cruces Chess Club</title>
  <meta
    name="description"
    content="Meet the Cruces Chess Club coaches. Lessons across fundamentals, openings, middlegame, and endgame."
  />
  <meta property="og:title" content="Lessons — Cruces Chess Club" />
</svelte:head>

<Hero
  eyebrow="Coaching"
  title="Meet the"
  accent="coaches."
  lead="No matter where you are on your chess journey, there's a coach here who can guide you to your next milestone."
  align="left"
/>

<section class="max-w-6xl mx-auto px-6">
  {#each Coaches.Coaches as Coach, i}
    <Bio person={Coach} index={i} flip={i % 2 === 1} />
  {/each}
</section>
