<script>
  import { writable } from "svelte/store";
  import Carousel from "svelte-carousel";
  import Hero from "$lib/Hero.svelte";

  const images = writable([]);
  let loading = true;
  const imageModules = import.meta.glob("/static/club_pics/*.jpeg");

  async function loadImages() {
    const imagePromises = Object.entries(imageModules).map(
      async ([path, resolver]) => {
        const module = await resolver();
        return module.default.replace("/static/", "");
      },
    );

    const loadedImages = await Promise.all(imagePromises);
    $images = loadedImages;
    loading = false;
  }

  loadImages();
</script>

<svelte:head>
  <title>Gallery — Cruces Chess Club</title>
  <meta
    name="description"
    content="Photos from Cruces Chess Club meetings, tournaments, and events."
  />
  <meta property="og:title" content="Gallery — Cruces Chess Club" />
</svelte:head>

<Hero
  eyebrow="Photos"
  title="Club"
  accent="moments."
  lead="Wednesday meets, tournaments, and the occasional after-game."
  align="left"
/>

<section
  class="max-w-5xl mx-auto px-6 py-16"
  aria-label="Photo gallery"
>
  <div class="border border-line rounded-md bg-paper-2/40 overflow-hidden">
    {#if loading}
      <div
        class="aspect-[16/10] flex items-center justify-center text-mute"
        role="status"
        aria-live="polite"
      >
        <span class="animate-pulse text-sm uppercase tracking-[0.22em]">
          Loading images…
        </span>
      </div>
    {:else if $images.length > 0}
      <Carousel
        autoplay
        autoplayDuration={6000}
        pauseOnFocus
        arrows={true}
        dots={true}
      >
        {#each $images as src, i}
          <div
            class="aspect-[16/10] flex items-center justify-center"
            aria-roledescription="slide"
            aria-label={`Photo ${i + 1} of ${$images.length}`}
          >
            <img
              {src}
              alt={`Cruces Chess Club photo ${i + 1}`}
              class="max-h-[70vh] w-auto max-w-full object-contain"
            />
          </div>
        {/each}
      </Carousel>
    {:else}
      <div class="aspect-[16/10] flex items-center justify-center text-mute">
        <p>No images found</p>
      </div>
    {/if}
  </div>
</section>
