<script>
    export let person;
</script>

<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 m-4 overflow-hidden border border-gray-200">
    <div class="flex flex-row items-stretch">
        <div class="w-1/3 flex-shrink-0 p-6 bg-gradient-to-br from-gray-50 to-white">
            <div class="flex items-center justify-center h-full">
                <img src="{person.Picture}" alt="{person.Name}" class="rounded-xl w-full h-auto object-cover shadow-md">
            </div>
        </div>
        <div class="flex-1 flex flex-col">
            <div class="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h3 class="text-3xl font-bold tracking-tight">{person.Name}</h3>
                <div class="h-1 w-20 bg-white/30 rounded-full mt-2"></div>
            </div>
        </div>
    </div>
    <div class="p-8 bg-gradient-to-b from-white to-gray-50">
        <div class="mb-6">
            <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span class="w-1 h-6 bg-gray-700 rounded-full"></span>
                Strengths
            </h4>
            <ul class="space-y-2.5 ml-1">
                {#each person.Strengths as strength}
                    <li class="text-gray-700 flex items-start gap-3">
                        <span class="text-gray-600 mt-1.5 flex-shrink-0">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                        <span class="leading-relaxed">{strength}</span>
                    </li>
                {/each}
            </ul>
        </div>
        <div class="pt-6 mt-6 border-t border-gray-200 space-y-2">
            <p class="text-gray-700 font-semibold flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {person.Phone}
            </p>
            <p class="text-gray-700 flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {person.Email}
            </p>
        </div>
    </div>
</div>
