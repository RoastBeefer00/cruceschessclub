<script>
  import "../app.css";
  import { page } from "$app/stores";

  let burgerOpen = false;
  let selected = 0;

  function toggleBurger() {
    burgerOpen = !burgerOpen;
  }

  function handleSelect(id) {
    selected = id;
    toggleBurger();
  }

  $: path = $page.url.pathname;
</script>

<nav
  class="bg-gray-900 text-white fixed top-0 left-0 right-0 z-50"
  aria-label="main navigation"
>
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Brand section -->
      <div class="flex items-center space-x-2">
        <a
          class="flex items-center hover:bg-gray-800 px-3 py-2 rounded transition-colors"
          href="/"
        >
          <img src="ccc.png" width="30" height="40" alt="chess" class="mr-2" />
        </a>
        <a
          href="/"
          class="flex items-center hover:bg-gray-800 px-3 py-2 rounded transition-colors text-2xl font-bold"
        >
          Cruces Chess Club
        </a>
      </div>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 hover:bg-gray-800 rounded transition-colors"
        aria-label="menu"
        aria-expanded={burgerOpen}
        on:click={toggleBurger}
      >
        <span
          class="block w-6 h-0.5 bg-white transition-all {burgerOpen
            ? 'rotate-45 translate-y-2'
            : ''}"
          aria-hidden="true"
        ></span>
        <span
          class="block w-6 h-0.5 bg-white transition-opacity {burgerOpen
            ? 'opacity-0'
            : ''}"
          aria-hidden="true"
        ></span>
        <span
          class="block w-6 h-0.5 bg-white transition-all {burgerOpen
            ? '-rotate-45 -translate-y-2'
            : ''}"
          aria-hidden="true"
        ></span>
      </button>

      <!-- Desktop menu -->
      <div class="hidden md:flex md:items-center md:space-x-1">
        <a
          href="/about"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/about'
            ? 'bg-gray-800'
            : ''}"
        >
          About
        </a>
        <a
          href="/lessons"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/lessons'
            ? 'bg-gray-800'
            : ''}"
        >
          Lessons
        </a>
        <a
          href="/schedule"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/schedule'
            ? 'bg-gray-800'
            : ''}"
        >
          Schedule
        </a>
        <a
          href="/gallery"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/gallery'
            ? 'bg-gray-800'
            : ''}"
        >
          Gallery
        </a>
        <a
          href="/tournaments"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/tournaments'
            ? 'bg-gray-800'
            : ''}"
        >
          Tournaments
        </a>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden {burgerOpen ? 'block' : 'hidden'} pb-4">
      <div class="flex flex-col space-y-1">
        <a
          href="/about"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/about'
            ? 'bg-gray-800'
            : ''}"
          on:click={toggleBurger}
        >
          About
        </a>
        <a
          href="/lessons"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/lessons'
            ? 'bg-gray-800'
            : ''}"
          on:click={toggleBurger}
        >
          Lessons
        </a>
        <a
          href="/schedule"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/schedule'
            ? 'bg-gray-800'
            : ''}"
          on:click={toggleBurger}
        >
          Schedule
        </a>
        <a
          href="/gallery"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/gallery'
            ? 'bg-gray-800'
            : ''}"
          on:click={toggleBurger}
        >
          Gallery
        </a>
        <a
          href="/tournaments"
          class="px-4 py-2 rounded hover:bg-gray-800 transition-colors {path ===
          '/tournaments'
            ? 'bg-gray-800'
            : ''}"
          on:click={toggleBurger}
        >
          Tournaments
        </a>
      </div>
    </div>
  </div>
</nav>

<div class="mt-16">
  <slot />
</div>
