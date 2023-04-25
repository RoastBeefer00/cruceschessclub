<script>
    import { navOptions } from  './Nav.svelte';	// import application navigation
    import { fly } from 'svelte/transition';
    let selected = navOptions[0];	// keep track of the selected 'page' object (default to the about component since we must have local db connection established first)
    let intSelected = 0;	// selected page index

    let burgerOpen = false;

    function toggleBurger() {
        burgerOpen = !burgerOpen;
    }

    // change the selected component (the event.originalTarget.id is not accessible in Chrome so switched to event.srcElement.id)
    function changeComponent(event) {
        selected = navOptions[event.srcElement.id];
        intSelected = event.srcElement.id;
        toggleBurger();
    }
</script>



<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="chess-solid.svg" width="28" height="28">
    </a>
    <a href="/" class="navbar-item">
      Cruces Chess Club
    </a>

    <a  href="/" 
        role="button" 
        class="navbar-burger{ burgerOpen ? " is-active" : "" }" 
        aria-label="menu" 
        aria-expanded="false" 
        data-target="navbarBasicExample"
        on:click={toggleBurger}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu{ burgerOpen ? " is-active" : "" }">
    <div class="navbar-start">
        {#each navOptions as option, i}
            <a href="/" class={intSelected==i ? "navbar-item is-active" : "navbar-item"} on:click={changeComponent} id={i}>
                {option.page}
            </a>
        {/each}
    </div>>
  </div>
</nav>

<div class="container hero">
    <!-- this is where our main content is placed -->
    <svelte:component this={selected.component}/>
</div>

