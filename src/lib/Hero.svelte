<script>
  export let eyebrow = "";
  export let title = "";
  export let accent = "";
  export let lead = "";
  export let align = "left";
</script>

<section
  class="bg-paper border-b border-line"
  aria-labelledby="hero-title"
>
  <div
    class="max-w-6xl mx-auto px-6 pt-20 pb-16 grid gap-10 md:grid-cols-12 md:gap-8"
    class:items-center={align === "left"}
    class:text-center={align === "center"}
  >
    <div
      class="space-y-6"
      class:md:col-span-7={align === "left"}
      class:md:col-span-12={align === "center"}
      class:max-w-3xl={align === "center"}
      class:mx-auto={align === "center"}
    >
      {#if eyebrow}
        <div
          class="flex items-center gap-3"
          class:justify-center={align === "center"}
        >
          <span class="block h-px w-10 bg-accent" aria-hidden="true"></span>
          <span
            class="text-xs uppercase tracking-[0.22em] text-accent font-medium"
          >
            {eyebrow}
          </span>
        </div>
      {/if}

      <h1
        id="hero-title"
        class="display-headline font-display font-semibold text-ink text-5xl md:text-7xl leading-[0.95]"
      >
        {title}
        {#if accent}
          <span class="block text-accent italic font-normal mt-1 md:mt-2">
            {accent}
          </span>
        {/if}
      </h1>

      {#if lead}
        <p
          class="text-lg md:text-xl text-ink-soft max-w-[52ch] leading-relaxed"
          class:mx-auto={align === "center"}
        >
          {lead}
        </p>
      {/if}

      {#if $$slots.cta}
        <div
          class="flex flex-col sm:flex-row gap-3 pt-2"
          class:justify-center={align === "center"}
        >
          <slot name="cta" />
        </div>
      {/if}
    </div>

    {#if $$slots.aside}
      <aside
        class="md:col-span-5"
        class:hidden={align === "center"}
        class:md:block={align === "center"}
      >
        <slot name="aside" />
      </aside>
    {/if}
  </div>
</section>
