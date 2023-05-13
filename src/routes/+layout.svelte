<script>
  import "../app.scss";
  import { page } from "$app/stores";

  let burgerOpen = false;
  
  function toggleBurger() {
    burgerOpen = !burgerOpen;
  }

   $: path = $page.url.pathname;
</script>

<nav class="navbar is-dark is-fixed-top" aria-label="main navigation">
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
    <div class="navbar-end">
        <button class="button is-success m-2" on:click={toggleBurger}>
            <a href="/donate" class="has-text-white">
                DONATE
            </a>
        </button> 
    </div>
  </div>
</nav>

<slot />
