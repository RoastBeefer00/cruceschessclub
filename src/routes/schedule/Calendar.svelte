<script>
  export let month;

  let wednesdays = getWednesdays(month);

  import { months } from './months';

  let bars = [
    {
      "name": "Amaro Winery",
      "address": "402 S Melendres St, Las Cruces, NM 88005"
    },
    {
      "name": "Lucky Dog Billiards",
      "address": "245 E Lohman Ave, Las Cruces, NM 88001"
    },
  ]


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


<h2 class="title is-2 has-text-centered has-text-black"> {months[wednesdays[0].getMonth()]} </h2>

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
        <td></td>
        <td></td>
      {/if}
    </tr>
  {/each}
  </tbody>
</table>
