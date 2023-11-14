<script>
    import Calendar from "./Calendar.svelte";
    import { months } from './months';
    import { writable } from "svelte/store";

    let current_date = new Date();
    let month = writable(current_date.getMonth());

    function handleSelect(choice) {
        console.log("Month: " + choice)
        $month = choice;
    }

    function getAdjustedMonth(month) {
        if (month > 11) {
            return month - 12;
        } else {
            return month;
        }
    }
</script>

<div class="container p-3">
    <div class="notification mx-auto is-dark">
        <h2 class="title is-2 has-text-centered">
            Where will we be?!
        </h2>
    </div>  
</div>

<div class="column is-desktop is-half is-offset-one-quarter">
    <div class="box mx-auto my-3">
        <div class="field is-grouped">
            <div class="control mx-auto">
                <button 
                    class="button { $month == current_date.getMonth() ? "is-dark" : "is-light"}"
                    on:click={() => handleSelect(current_date.getMonth())}
                >
                    {months[getAdjustedMonth(current_date.getMonth())]}
                </button>
                <button 
                    class="button { $month == current_date.getMonth()+1 ? "is-dark" : "is-light"}"
                    on:click={() => handleSelect(current_date.getMonth()+1)}
                >
                    {months[getAdjustedMonth(current_date.getMonth()+1)]}
                </button>
                <button 
                    class="button { $month == current_date.getMonth()+2 ? "is-dark" : "is-light"}"
                    on:click={() => handleSelect(current_date.getMonth()+2)}    
                >
                    {months[getAdjustedMonth(current_date.getMonth()+2)]}
                </button>
            </div>
        </div>
        {#if $month == current_date.getMonth()}
            <Calendar month={$month}/>
        {/if}
        {#if $month == current_date.getMonth()+1}
            <Calendar month={$month}/>
        {/if} 
        {#if $month == current_date.getMonth()+2}
            <Calendar month={$month}/>
        {/if}      
    </div>

</div>
<!-- 
<div class="box m-6">
    <figure class="image">
      <img src="club_pics/image9(1).jpeg" alt="club">
    </figure> 
</div> -->



<!-- <div class="container p-3">
    <div class="box m-3">
        <Calendar month={current_date.getMonth()}/>
    </div>
    <div class="box m-3">
        <Calendar month={current_date.getMonth()+1}/>
    </div>
    <div class="box m-3">
        <Calendar month={current_date.getMonth()+2}/>
    </div>
</div> -->
