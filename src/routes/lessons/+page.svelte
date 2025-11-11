<script>
    import Bio from "./Bio.svelte";
    import Coaches from "$lib/Coaches.json";

</script>

<section class="min-h-screen">
    <!-- Hero Section with Background -->
    <div class="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b border-gray-200 shadow-sm">
        <div class="container mx-auto px-4 pt-12 pb-16 max-w-7xl">
            <div class="text-center space-y-6">
                <h1 class="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                    Meet Our
                    <span class="block mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                        Coaches
                    </span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Looking to improve your game? We've got you covered. No matter where you are on your chess journey, we have a coach who can guide you to victory.
                </p>
            </div>
        </div>
    </div>

    <!-- Coaches Grid Section -->
    <div class="container mx-auto px-4 pt-16 pb-16 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {#each Coaches.Coaches as Coach}
                <Bio person={Coach}/> 
            {/each}
        </div>
    </div>
</section>
