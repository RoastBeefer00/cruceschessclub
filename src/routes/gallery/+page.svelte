<script>
    import { writable } from 'svelte/store';
    import { fly, fade } from 'svelte/transition';
    
    const images = writable([]);
    const imageModules = import.meta.glob("/static/club_pics/*.jpeg");

    for (const modulePath in imageModules) {
        imageModules[modulePath]().then(({ default: imageUrl }) => {
        // console.log(modulePath, imageUrl);
        $images = [...$images, imageUrl.replace("/static/", "")];
        });
    }

    let index = 0;
    
    const next = () => {
      index = (index + 1) % $images.length
    }

    const previous = () => {
      index = (index - 1) % $images.length
    }

</script>

<div class="container p-3">
  <div class="notification mx-auto is-dark">
      <h2 class="title is-2 has-text-centered">
          Gallery
      </h2>
  </div>  
</div>

{#each [$images[index]] as src (index)}
<div class="column is-desktop is-two-thirds is-offset-2">
  <div class="box mx-auto my-3 p-2">
    <figure class="image mb-2"  in:fade="{{ duration: 400 }}">
      <img class="mx-auto" src="{src}" alt="club">
    </figure>
    <div class="columns is-mobile">
      <div class="column is-half">
        <figure class="image is-pulled-right is-32x32">
          <img src="arrow-left-solid.svg" alt="previous" on:click={previous}>
        </figure>  
      </div>
      <div class="column is-half">
        <figure class="image is-32x32">
          <img src="arrow-right-solid.svg" alt="next" on:click={next}>
        </figure>
      </div>
    </div>    
  </div>
</div>


{/each}

<style>
  .box {
    height: 60vh;
    max-width: 80vw;
  }

  .box img {
    height: auto;
    width: auto;
    max-height: 50vh;
    max-width: 75vw;
  }

  .box figure {
    height: 50vh;
  }
</style>