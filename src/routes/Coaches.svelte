<script>
    import Bio from "./Bio.svelte";
    import Coaches from "../lib/Coaches.json";

</script>

<section class="hero is-dark m-6">
    <div class="hero-body">
        <h2 class="title is-2">Meet our coaches</h2>
        <p> 
            Looking to improve your game?  We've got you covered.  
            No matter where you are on your chess journey we have a coach 
            who can guide you to victory.
        </p>
    </div>
</section>

<div class="columns is-multiline">
{#each Coaches.Coaches as Coach}
    <Bio person={Coach}/> 
{/each}
</div>