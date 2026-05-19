<script>
  import Hero from "$lib/Hero.svelte";

  const contacts = [
    {
      name: "Isaac",
      role: "General questions, scheduling",
      email: "isaac@isaachimself.com",
    },
    {
      name: "Jake",
      role: "Site, lessons, tournaments",
      email: "roastbeefer000@gmail.com",
    },
  ];
</script>

<svelte:head>
  <title>Support — Cruces Chess Club</title>
  <meta
    name="description"
    content="Reach the Cruces Chess Club organizers for membership, scheduling, or site questions."
  />
  <meta property="og:title" content="Support — Cruces Chess Club" />
</svelte:head>

<Hero
  eyebrow="Get in touch"
  title="Need a hand?"
  accent="We're here."
  lead="Reach out for membership, scheduling, lessons, or anything else club-related."
  align="left"
/>

<section class="max-w-3xl mx-auto px-6 py-16">
  <div class="grid gap-5 md:grid-cols-2">
    {#each contacts as contact}
      <a
        href="mailto:{contact.email}"
        class="block border border-line rounded-md p-6 transition-soft hover:border-accent hover:bg-paper-2"
      >
        <div class="text-xs uppercase tracking-[0.22em] text-accent mb-2">
          {contact.role}
        </div>
        <div class="font-display text-2xl text-ink mb-2">
          {contact.name}
        </div>
        <div class="text-ink-soft text-sm underline-offset-4 hover:underline">
          {contact.email}
        </div>
      </a>
    {/each}
  </div>
</section>
