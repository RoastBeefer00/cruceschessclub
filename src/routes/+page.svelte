<script>
    // import { navOptions } from  './Nav.svelte';	// import application navigation
    import Calendar from "./schedule/Calendar.svelte";
    import Carousel from "svelte-carousel";
    import ResizeObserver from "svelte-resize-observer";
    import { fly } from "svelte/transition";

    let index = 0;

    let current_date = new Date();
</script>

<section class="container mx-auto p-4 max-w-7xl">
    <!-- Greeting -->
    <div class="bg-gray-900 text-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-bold text-center">
            Welcome to Cruces Chess Club!
        </h1>
    </div>

    <!-- Calendar -->
    <div class="flex justify-center mt-6">
        <div class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4 m-1">
            <Calendar month={current_date.getMonth()} />
        </div>
    </div>

    <!-- Bottom banner -->
    <div class="fixed bottom-0 left-0 right-0 bg-transparent">
        <a class="flex justify-center" href="https://www.chess.com/club/cruces-chess-club">
            <img
                class="mx-auto"
                alt="bottom banner"
                src="affiliate/Digital Leaderboard Ad.png"
            />
        </a>
    </div>
</section>
