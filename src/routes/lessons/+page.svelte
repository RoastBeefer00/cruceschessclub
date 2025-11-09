<script>
    import Bio from "./Bio.svelte";
    import Coaches from "$lib/Coaches.json";

</script>

<section class="container mx-auto p-6 max-w-7xl">
    <div class="bg-gray-900 text-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Meet our coaches</h2>
        <p class="text-lg md:text-xl text-gray-200"> 
            Looking to improve your game?  We've got you covered.  
            No matter where you are on your chess journey we have a coach 
            who can guide you to victory.
        </p>
    </div>
</section>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 max-w-7xl mx-auto">
{#each Coaches.Coaches as Coach}
    <Bio person={Coach}/> 
{/each}
</div>
