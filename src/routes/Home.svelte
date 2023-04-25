<script>
    import Calendar from "./Calendar.svelte";
    import Carousel from "svelte-carousel";
    import { writable } from 'svelte/store';
    import ResizeObserver from "svelte-resize-observer";
    import { fly } from 'svelte/transition';

    let index = 0;

    const images = writable([]);
    // import Carousel from "./Pictures.svelte";


    const imageModules = import.meta.glob("../club_pics/*.jpeg");

    for (const modulePath in imageModules) {
        imageModules[modulePath]().then(({ default: imageUrl }) => {
        // console.log(modulePath, imageUrl);
        $images = [...$images, imageUrl];
        });
    }

    console.log(images);

    const next = () => {
		index = (index + 1) % $images.length
	}

    let current_date = new Date();
</script>

<section class="hero is-dark m-3">
    <!-- <Header>
        <h1><u>Welcome to Cruces Chess Club!</u></h1>
    </Header> -->
    <div class="hero-body">
        <h1 class="title is-2 has-text-centered">Welcome to Cruces Chess Club!</h1>
    </div>
    <div class="box m-3">
        <Calendar month={current_date.getMonth()} />
    </div>
</section>
<!-- <section>
    <Carousel />
</section> -->

<!-- {#each $images as image}
    
    <img src="{image}" alt="{image}" >
{/each} -->
<!-- <img src="/src/club_pics/image1.jpeg" alt="" > -->


<!-- <div class="box m-6">
    {#each [$images[index]] as src (index)}
        <figure class="image is-square m-6">
            <img {src} alt="" />	
        </figure>
    {/each}
    <button on:click={next}>Next!</button>
</div> -->
