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

<div class="container mx-auto p-6 max-w-7xl">
    <div class="bg-gray-900 text-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center">
            Where will we be?!
        </h2>
    </div>  
</div>

<div class="flex justify-center mt-6">
    <div class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 mx-auto my-3">
        <div class="flex justify-center mb-6">
            <div class="flex gap-2">
                <button 
                    class="px-4 py-2 rounded font-medium transition-colors { $month == current_date.getMonth() ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
                    on:click={() => handleSelect(current_date.getMonth())}
                >
                    {months[getAdjustedMonth(current_date.getMonth())]}
                </button>
                <button 
                    class="px-4 py-2 rounded font-medium transition-colors { $month == current_date.getMonth()+1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
                    on:click={() => handleSelect(current_date.getMonth()+1)}
                >
                    {months[getAdjustedMonth(current_date.getMonth()+1)]}
                </button>
                <button 
                    class="px-4 py-2 rounded font-medium transition-colors { $month == current_date.getMonth()+2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
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
