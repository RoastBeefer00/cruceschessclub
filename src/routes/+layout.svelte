<script>
  import "../app.css";
  import { page } from "$app/stores";
  import Footer from "$lib/Footer.svelte";

  let burgerOpen = false;

  function toggleBurger() {
    burgerOpen = !burgerOpen;
  }

  function closeBurger() {
    burgerOpen = false;
  }

  $: path = $page.url.pathname;

  const links = [
    { href: "/about", label: "About" },
    { href: "/lessons", label: "Lessons" },
    { href: "/schedule", label: "Schedule" },
    { href: "/donate", label: "Donate" },
  ];
</script>

<a
  href="#main"
  class="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] bg-ink text-paper px-3 py-2 rounded-md text-sm"
>
  Skip to content
</a>

<nav
  class="bg-paper/85 backdrop-blur border-b border-line text-ink sticky top-0 z-50"
  aria-label="Main navigation"
>
  <div class="max-w-6xl mx-auto px-6">
    <div class="flex justify-between items-center h-16">
      <a
        href="/"
        class="flex items-center gap-3 group transition-soft"
      >
        <img src="/ccc.png" alt="" class="h-7 w-7 brightness-0 dark:invert" />
        <span
          class="font-display text-lg md:text-xl text-ink group-hover:text-accent transition-soft"
        >
          Cruces Chess Club
        </span>
      </a>

      <button
        type="button"
        class="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 transition-soft"
        aria-label="Toggle navigation menu"
        aria-expanded={burgerOpen}
        aria-controls="mobile-menu"
        on:click={toggleBurger}
      >
        <span
          class="block w-6 h-px bg-ink transition-soft {burgerOpen
            ? 'rotate-45 translate-y-2'
            : ''}"
          aria-hidden="true"
        ></span>
        <span
          class="block w-6 h-px bg-ink transition-soft {burgerOpen
            ? 'opacity-0'
            : ''}"
          aria-hidden="true"
        ></span>
        <span
          class="block w-6 h-px bg-ink transition-soft {burgerOpen
            ? '-rotate-45 -translate-y-2'
            : ''}"
          aria-hidden="true"
        ></span>
      </button>

      <ul class="hidden md:flex items-center gap-1 text-sm">
        {#each links as link}
          <li>
            <a
              href={link.href}
              class="relative px-4 py-2 transition-soft hover:text-accent
                {path === link.href
                ? 'text-ink after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-accent'
                : 'text-ink-soft'}"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div
      id="mobile-menu"
      class="md:hidden overflow-hidden transition-[max-height] duration-300 ease-out {burgerOpen
        ? 'max-h-96 pb-4'
        : 'max-h-0'}"
    >
      <ul class="flex flex-col gap-1 text-base">
        {#each links as link}
          <li>
            <a
              href={link.href}
              class="block px-4 py-2 rounded-md transition-soft
                {path === link.href
                ? 'text-ink bg-paper-2'
                : 'text-ink-soft hover:bg-paper-2'}"
              on:click={closeBurger}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<main id="main" class="min-h-[60vh]">
  <slot />
</main>

<Footer />
