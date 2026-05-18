<script>
  export let person;
  export let index = 0;
  export let flip = false;
</script>

<article
  class="grid gap-8 md:grid-cols-12 py-12 md:py-16 border-b border-line"
>
  <figure
    class="md:col-span-5"
    class:md:order-2={flip}
  >
    <img
      src={`/${person.Picture}`}
      alt={`${person.Name}, Cruces Chess Club coach`}
      class="w-full aspect-[4/5] object-cover rounded-md"
    />
  </figure>

  <div
    class="md:col-span-7 flex flex-col justify-center space-y-6"
    class:md:order-1={flip}
  >
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <span class="block h-px w-8 bg-accent" aria-hidden="true"></span>
        <span
          class="text-xs uppercase tracking-[0.22em] text-accent font-medium"
        >
          Coach {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h2
        class="font-display text-4xl md:text-5xl text-ink leading-tight tracking-tight"
      >
        {person.Name}
      </h2>
    </div>

    {#if person.Bio}
      <div class="space-y-3 text-ink-soft leading-relaxed max-w-[60ch]">
        {#each person.Bio as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    {/if}

    <dl class="grid gap-2 text-sm max-w-md">
      <dt class="text-xs uppercase tracking-[0.22em] text-mute mb-1">
        Strengths
      </dt>
      {#each person.Strengths as strength, i}
        <dd class="flex items-baseline gap-4 text-ink-soft">
          <span class="font-mono text-mute text-xs">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{strength}</span>
        </dd>
      {/each}
    </dl>

    <div
      class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-4 border-t border-line text-sm"
    >
      <a
        href="mailto:{person.Email}"
        class="text-ink-soft hover:text-accent transition-soft underline-offset-4 hover:underline"
      >
        {person.Email}
      </a>
      <a
        href="tel:{person.Phone.replace(/[^0-9+]/g, '')}"
        class="text-ink-soft hover:text-accent transition-soft underline-offset-4 hover:underline"
      >
        {person.Phone}
      </a>
    </div>
  </div>
</article>
