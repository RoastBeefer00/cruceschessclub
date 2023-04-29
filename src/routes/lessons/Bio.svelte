<script>
  import Page from "../+page.svelte";

    export let person;
</script>

<div class="column">
<div class="box m-3">
    <!-- <article class="media">
        <figure class="media-left">
        <p class="image is-128x128 is-square">
            <img src="{person.Picture}">
        </p>
        </figure>
        <div class="media-content">
            <article class="message is-dark">
                <div class="message-header">
                    <h3 class="title has-text-white">{person.Name}</h3>
                </div>
                <div class="message-body">
                    <h4 class="title">Strengths</h4>
                    <ul>
                        {#each person.Strengths as strength}
                            <li>{strength}</li>
                        {/each}
                    </ul><br>
                    <p>{person.Phone} - {person.Email}</p>
                </div>
                
            </article>

        </div>
    </article> -->
    <div class="columns is-mobile">
        <div class="column is-one-third is-align-self-center">
            <p class="image is-flex-grow-0">
                <img src="{person.Picture}">
            </p>
        </div>
        <div class="column">
            <div class="hero is-dark p-3">
                <h3 class="title">{person.Name}</h3>
            </div>
        </div>
    </div>
    <div class="hero">
        <h4 class="title is-underlined">Strengths</h4>
        <ul>
            {#each person.Strengths as strength}
                <li>{strength}</li>
            {/each}
        </ul>
        <p class="mt-5">{person.Phone}</p>
        <p> {person.Email}</p>
    </div>
</div>
</div>
