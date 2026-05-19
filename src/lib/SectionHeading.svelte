<script>
  export let eyebrow = "";
  export let title = "";
  export let accent = "";
</script>

<header class="space-y-4">
  {#if eyebrow}
    <div class="flex items-center gap-3">
      <span class="block h-px w-10 bg-accent" aria-hidden="true"></span>
      <span
        class="text-xs uppercase tracking-[0.22em] text-accent font-medium"
      >
        {eyebrow}
      </span>
    </div>
  {/if}
  <h2
    class="font-display text-3xl md:text-4xl text-ink leading-tight tracking-tight"
  >
    {title}
    {#if accent}
      <span class="text-accent italic font-normal">{accent}</span>
    {/if}
  </h2>
</header>
