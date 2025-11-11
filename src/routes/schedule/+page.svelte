<script>
    import Calendar from "./Calendar.svelte";
    import { months } from './months';
    import { writable } from "svelte/store";

    export let data;

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

<section class="min-h-screen">
    <!-- Hero Section with Background -->
    <div class="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b border-gray-200 shadow-sm">
        <div class="container mx-auto px-4 pt-12 pb-16 max-w-6xl">
            <div class="text-center space-y-6">
                <h1 class="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                    <span class="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                        Schedule
                    </span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Find out when and where we'll be meeting next
                </p>
            </div>
        </div>
    </div>

    <!-- Calendar Section -->
    <div class="container mx-auto px-4 pt-16 pb-16 max-w-6xl">
        <!-- Month Selector -->
        <div class="flex justify-center mb-8">
            <div class="inline-flex gap-2 bg-white rounded-full shadow-lg p-2 border border-gray-200">
                <button 
                    class="px-6 py-3 rounded-full font-semibold transition-all { $month == current_date.getMonth() ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}"
                    on:click={() => handleSelect(current_date.getMonth())}
                >
                    {months[getAdjustedMonth(current_date.getMonth())]}
                </button>
                <button 
                    class="px-6 py-3 rounded-full font-semibold transition-all { $month == current_date.getMonth()+1 ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}"
                    on:click={() => handleSelect(current_date.getMonth()+1)}
                >
                    {months[getAdjustedMonth(current_date.getMonth()+1)]}
                </button>
                <button 
                    class="px-6 py-3 rounded-full font-semibold transition-all { $month == current_date.getMonth()+2 ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}"
                    on:click={() => handleSelect(current_date.getMonth()+2)}    
                >
                    {months[getAdjustedMonth(current_date.getMonth()+2)]}
                </button>
            </div>
        </div>

        <!-- Calendar -->
        <div class="max-w-4xl mx-auto">
            {#if $month == current_date.getMonth()}
                <Calendar month={$month} useGoogleCalendar={true} serverEvents={data.calendarEvents[$month] || []}/>
            {/if}
            {#if $month == current_date.getMonth()+1}
                <Calendar month={$month} useGoogleCalendar={true} serverEvents={data.calendarEvents[$month] || []}/>
            {/if} 
            {#if $month == current_date.getMonth()+2}
                <Calendar month={$month} useGoogleCalendar={true} serverEvents={data.calendarEvents[$month] || []}/>
            {/if}      
        </div>
    </div>
</section>
