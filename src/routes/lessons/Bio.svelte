<script>
    export let person;
</script>

<div class="bg-white rounded-lg shadow-md m-3 overflow-hidden">
    <div class="flex flex-row items-center">
        <div class="w-1/3 flex-shrink-0 p-4">
            <div class="flex items-center justify-center">
                <img src="{person.Picture}" alt="coach" class="rounded-lg w-full h-auto object-cover">
            </div>
        </div>
        <div class="flex-1">
            <div class="bg-gray-900 text-white p-4 rounded-r-lg">
                <h3 class="text-2xl font-bold">{person.Name}</h3>
            </div>
        </div>
    </div>
    <div class="p-6">
        <h4 class="text-xl font-bold underline mb-3">Strengths</h4>
        <ul class="list-disc list-inside space-y-1 mb-5">
            {#each person.Strengths as strength}
                <li class="text-gray-700">{strength}</li>
            {/each}
        </ul>
        <p class="mt-5 text-gray-800 font-medium">{person.Phone}</p>
        <p class="text-gray-800">{person.Email}</p>
    </div>
</div>
