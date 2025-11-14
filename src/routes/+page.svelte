<script>
  // import { navOptions } from  './Nav.svelte';	// import application navigation
  import Calendar from "./schedule/Calendar.svelte";
  import Carousel from "svelte-carousel";
  import ResizeObserver from "svelte-resize-observer";
  import { fly } from "svelte/transition";

  export let data;

  let index = 0;

  let current_date = new Date();
</script>

<section class="min-h-screen pb-32">
  <!-- Hero Section with Background -->
  <div
    class="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b border-gray-200 shadow-sm"
  >
    <div class="container mx-auto px-4 pt-12 pb-16 max-w-6xl">
      <div class="text-center space-y-6">
        <h1 class="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
          Welcome to
          <span
            class="block mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
          >
            Cruces Chess Club
          </span>
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Join Las Cruces' premier chess community for weekly games, lessons,
          and tournaments
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
        >
          <a
            href="/schedule"
            class="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            View Schedule
          </a>
          <a
            href="/about"
            class="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border-2 border-gray-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Calendar Section -->
  <div class="container mx-auto px-4 pt-16 max-w-6xl">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Upcoming Sessions
        </h2>
        <p class="text-gray-600">Join us every Wednesday evening</p>
      </div>
      <Calendar
        month={current_date.getMonth()}
        useGoogleCalendar={true}
        serverEvents={data.calendarEvents}
      />
    </div>
  </div>

  <!-- Bottom banner -->
  <div class="fixed bottom-0 left-0 right-0 z-40">
    <a
      class="flex justify-center"
      href="https://www.chess.com/club/cruces-chess-club"
    >
      <img
        class="mx-auto max-w-xl w-full h-auto"
        alt="bottom banner"
        src="affiliate/Digital Leaderboard Ad.png"
      />
    </a>
  </div>
</section>
