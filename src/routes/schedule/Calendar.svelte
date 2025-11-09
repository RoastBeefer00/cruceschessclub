<script>
  import { months } from "./months";
  import Schedule from "$lib/Schedule.json";

  export let month;

  let wednesdays = getWednesdays(month);
  let month_name;
  if (month > 11) {
    month_name = months[month - 12];
  } else {
    month_name = months[month];
  }
  let bars = Schedule[month_name];

  function getWednesdays(month_index) {
    var current_date = new Date();
    var month = month_index;
    var year;
    if (month_index > 11) {
      year = current_date.getFullYear() + 1;
      month = month - 12;
    } else {
      year = current_date.getFullYear();
    }
    console.log("(Year, Month): " + year + ", " + month);
    var d = new Date(year, month),
      month = d.getMonth(),
      wednesdays = [];

    d.setDate(1);

    // Get the first Wednesday in the Month
    while (d.getDay() != 3) {
      d.setDate(d.getDate() + 1);
    }

    while (d.getMonth() == month) {
      wednesdays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
    console.log(wednesdays);
    return wednesdays;
  }
</script>

<h2 class="text-4xl md:text-5xl font-bold text-center text-black mb-4">
  {month_name}
</h2>

<table
  class="table-auto mx-auto border-collapse border border-gray-300 m-3 w-full max-w-3xl"
>
  <thead class="bg-gray-100">
    <tr>
      <th class="border border-gray-300 px-4 py-2 text-left font-semibold"
        >Date</th
      >
      <th class="border border-gray-300 px-4 py-2 text-left font-semibold"
        >Name</th
      >
      <th class="border border-gray-300 px-4 py-2 text-left font-semibold"
        >Address</th
      >
    </tr>
  </thead>
  <tbody>
    {#each wednesdays as wednesday, count}
      <tr class="even:bg-gray-50 hover:bg-gray-100 transition-colors">
        <td class="border border-gray-300 px-4 py-2">
          {wednesday.getMonth() +
            1}/{wednesday.getDate()}/{wednesday.getFullYear()}
        </td>
        {#if count < bars.length}
          <td class="border border-gray-300 px-4 py-2"> {bars[count].name} </td>
          <td class="border border-gray-300 px-4 py-2">
            {bars[count].address}
          </td>
        {:else}
          <td class="border border-gray-300 px-4 py-2">TBD</td>
          <td class="border border-gray-300 px-4 py-2"></td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>
