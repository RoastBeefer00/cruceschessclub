<script>
  import July_2023 from "./july_2023.svelte";
  import Hero from "$lib/Hero.svelte";
</script>

<svelte:head>
  <title>Tournaments — Cruces Chess Club</title>
  <meta
    name="description"
    content="Tournament recaps and annotated games from the Cruces Chess Club."
  />
  <meta property="og:title" content="Tournaments — Cruces Chess Club" />
</svelte:head>

<Hero
  eyebrow="Recap"
  title="Tournament"
  accent="archives."
  lead="Recaps, annotated games, and a look back at past Cruces Chess Club events."
  align="left"
/>

<July_2023 />
