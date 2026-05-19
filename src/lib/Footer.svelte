<script>
  const year = new Date().getFullYear();
</script>

<footer class="bg-ink text-paper mt-24">
  <div class="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-12">
    <div class="md:col-span-4 space-y-3">
      <div class="flex items-center gap-3">
        <img src="/ccc.png" alt="" class="h-8 w-8 brightness-0 invert dark:invert-0" />
        <span class="font-display text-xl">Cruces Chess Club</span>
      </div>
      <p class="text-sm text-paper/70 max-w-xs leading-relaxed">
        A weekly chess community in Las Cruces, New Mexico. Open boards, friendly
        games, real coaching.
      </p>
    </div>

    <nav
      class="md:col-span-4 grid grid-cols-2 gap-y-2 text-sm"
      aria-label="Footer"
    >
      <a class="hover:text-accent transition-soft" href="/about">About</a>
      <a class="hover:text-accent transition-soft" href="/lessons">Lessons</a>
      <a class="hover:text-accent transition-soft" href="/schedule">Schedule</a>
      <a class="hover:text-accent transition-soft" href="/donate">Donate</a>
      <a class="hover:text-accent transition-soft" href="/support">Support</a>
      <a class="hover:text-accent transition-soft" href="/privacy">Privacy</a>
    </nav>

    <div class="md:col-span-4 space-y-3">
      <div
        class="text-xs uppercase tracking-[0.22em] text-paper/60 font-medium"
      >
        Play with us online
      </div>
      <a
        href="https://www.chess.com/club/cruces-chess-club"
        class="block max-w-xs border border-paper/15 rounded-md overflow-hidden hover:border-accent transition-soft"
      >
        <img
          src="/affiliate/Digital Leaderboard Ad.png"
          alt="Join the Cruces Chess Club on chess.com"
          class="w-full h-auto block"
        />
      </a>
    </div>
  </div>

  <div class="border-t border-paper/10">
    <div
      class="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-paper/60"
    >
      <span>© {year} Cruces Chess Club · Las Cruces, NM</span>
      <span class="flex gap-4">
        <a href="/privacy" class="hover:text-accent transition-soft">Privacy</a>
        <a href="/support" class="hover:text-accent transition-soft">Support</a>
      </span>
    </div>
  </div>
</footer>
