<script>
    // import { navOptions } from  './Nav.svelte';	// import application navigation
    import Calendar from "./schedule/Calendar.svelte";
    import Carousel from "svelte-carousel";
    import ResizeObserver from "svelte-resize-observer";
    import { fly } from 'svelte/transition';

    let index = 0;

    let current_date = new Date();
</script>

<section class="container p-1">
  <div class="notification mx-auto is-dark">
      <h1 class="title is-2 has-text-centered">Welcome to Cruces Chess Club!</h1>
  </div>
  <div class="column is-desktop is-half is-offset-one-quarter">
    <div class="box m-1">
        <Calendar month={current_date.getMonth()} />
    </div>
  </div>
</section>
