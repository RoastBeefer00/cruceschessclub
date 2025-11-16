<script>
  import { writable } from "svelte/store";
  import Carousel from "svelte-carousel";

  const images = writable([]);
  let loading = true;
  const imageModules = import.meta.glob("/static/club_pics/*.jpeg");

  // Load all images before rendering
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

<div class="container mx-auto p-6 max-w-7xl">
  <div
    class="bg-gray-900 text-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl"
  >
    <h2 class="text-4xl md:text-5xl font-bold text-center">Gallery</h2>
  </div>
</div>

<div class="flex justify-center mt-6">
  <div class="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4 mx-auto my-3">
    {#if loading}
      <div class="flex items-center justify-center h-[60vh] text-gray-500">
        <p>Loading images...</p>
      </div>
    {:else if $images.length > 0}
      <Carousel
        autoplay
        autoplayDuration={3000}
        pauseOnFocus
        arrows={true}
        dots={true}
      >
        {#each $images as src}
          <div class="flex items-center justify-center h-[60vh]">
            <img
              class="max-h-[50vh] max-w-[75vw] h-auto w-auto rounded object-contain"
              {src}
              alt="club"
            />
          </div>
        {/each}
      </Carousel>
    {:else}
      <div class="flex items-center justify-center h-[60vh] text-gray-500">
        <p>No images found</p>
      </div>
    {/if}
  </div>
</div>
