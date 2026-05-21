<script>
  import { onMount, onDestroy } from "svelte";

  export let inline = false;

  let theme = "system";
  let resolved = "light";
  let open = false;
  let mq;
  let rootEl;

  const options = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  function resolve(t) {
    if (t === "dark") return "dark";
    if (t === "light") return "light";
    return mq && mq.matches ? "dark" : "light";
  }

  function applyTheme(t) {
    resolved = resolve(t);
    document.documentElement.setAttribute("data-theme", resolved);
  }

  function setTheme(t) {
    theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
    applyTheme(t);
    open = false;
  }

  function handleClickOutside(e) {
    if (rootEl && !rootEl.contains(e.target)) open = false;
  }

  function handleKeydown(e) {
    if (e.key === "Escape") open = false;
  }

  function onSystemChange() {
    if (theme === "system") applyTheme("system");
  }

  onMount(() => {
    mq = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      theme = localStorage.getItem("theme") || "system";
    } catch (e) {
      theme = "system";
    }
    mq.addEventListener("change", onSystemChange);
    applyTheme(theme);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    if (mq) mq.removeEventListener("change", onSystemChange);
    if (typeof document !== "undefined") {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    }
  });

  $: currentLabel = options.find((o) => o.value === theme)?.label ?? "System";
</script>

{#if inline}
  <div class="flex gap-1">
    {#each options as opt}
      <button
        type="button"
        role="option"
        aria-selected={theme === opt.value}
        class="text-xs uppercase tracking-[0.18em] font-medium px-3 py-1.5 rounded-md border transition-soft {theme === opt.value
          ? 'border-accent text-accent'
          : 'border-line text-ink-soft hover:text-accent'}"
        on:click={() => setTheme(opt.value)}
      >
        {opt.label}
      </button>
    {/each}
  </div>
{:else}
  <div class="relative" bind:this={rootEl}>
    <button
      type="button"
      class="text-xs uppercase tracking-[0.18em] font-medium text-ink-soft hover:text-accent border border-line rounded-md px-3 py-1.5 transition-soft flex items-center gap-1.5"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label="Change color theme"
      on:click|stopPropagation={() => (open = !open)}
    >
      <span aria-hidden="true">
        {#if resolved === "dark"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
        {/if}
      </span>
      <span>{currentLabel}</span>
    </button>

    {#if open}
      <ul
        class="absolute right-0 mt-2 min-w-[8rem] bg-paper border border-line rounded-md shadow-soft py-1 z-50"
        role="listbox"
        aria-label="Theme options"
      >
        {#each options as opt}
          <li>
            <button
              type="button"
              role="option"
              aria-selected={theme === opt.value}
              class="block w-full text-left px-3 py-1.5 text-sm transition-soft hover:bg-paper-2 {theme ===
              opt.value
                ? 'text-accent'
                : 'text-ink-soft'}"
              on:click|stopPropagation={() => setTheme(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
