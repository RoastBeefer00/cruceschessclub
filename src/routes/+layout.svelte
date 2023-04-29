<script>
  import "../app.scss";
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

<nav class="navbar is-dark" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="chess-solid.svg" width="28" height="28" alt="chess">
    </a>
    <a href="/" class="navbar-item">
      Cruces Chess Club
    </a>

    <a  href="#" 
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
      <a href="/about" class="navbar-item{path == "/about" ? " is-active": ""}" on:click={toggleBurger}>
        About
      </a>
      <a href="/lessons" class="navbar-item{path == "/lessons" ? " is-active": ""}" on:click={toggleBurger}>
        Lessons
      </a>
      <a href="/schedule" class="navbar-item{path == "/schedule" ? " is-active": ""}" on:click={toggleBurger}>
        Schedule
      </a>
      <a href="/gallery" class="navbar-item{path == "/gallery" ? " is-active": ""}" on:click={toggleBurger}>
        Gallery
      </a>
    </div>
  </div>
</nav>

<slot />
