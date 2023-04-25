<script>
    import Calendar from "./Calendar.svelte";

    let current_date = new Date();
</script>

<div class="hero is-dark m-3">
    <div class="hero-body">
        <h2 class="title is-2 has-text-centered">Where will we be?!</h2>
    </div>  
</div>
    


<div class="hero is-dark m-3">
    <div class="box m-3">
        <Calendar month={current_date.getMonth()}/>
    </div>
    <div class="box m-3">
        <Calendar month={current_date.getMonth()+1}/>
    </div>
    <div class="box m-3">
        <Calendar month={current_date.getMonth()+2}/>
    </div>
</div>
