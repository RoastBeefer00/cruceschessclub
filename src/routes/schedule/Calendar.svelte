<script>
  import { months } from './months';
  import Schedule from '$lib/Schedule.json';

  export let month;

  let wednesdays = getWednesdays(month);
  let month_name = months[month];
  let bars = Schedule[month_name];

  function getWednesdays(month_index) {
    var current_date = new Date();
    var year = current_date.getFullYear();
    var d = new Date(year, month_index),
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

    return wednesdays;
  }

</script>


<h2 class="title is-2 has-text-centered has-text-black"> {month_name} </h2>

<table class="table mx-auto is-bordered is-striped m-3">
  <thead>
    <th>Date</th>
    <th>Name</th>
    <th>Address</th>
  </thead>
  <tbody>
  {#each wednesdays as wednesday, count}
    <tr>
      <td> {wednesday.getMonth()+1}/{wednesday.getDate()}/{wednesday.getFullYear()} </td>
      {#if count < bars.length}
        <td> {bars[count].name} </td>
        <td> {bars[count].address} </td>
      {:else}
        <td>TBD</td>
        <td></td>
      {/if}
    </tr>
  {/each}
  </tbody>
</table>
