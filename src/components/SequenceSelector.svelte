<script>
  import {
    disco,
    planet_rock,
    confusion,
    trans_europe_express,
    jam_on_it
  } from "../sequences";

  export let sequence;
  export let sequenceName;
  export let updateSequence;
  export let updateBpm;
</script>

<style>
  section {
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }

  .highlight {
    color: blue;
    font-weight: bold;
  }
</style>

<section>
  <h3>BEATS</h3>

  <button
    class:highlight={sequenceName === 'planet_rock'}
    on:click={() => {
      updateSequence(planet_rock, 'planet_rock');
      updateBpm(127);
    }}>
    Afrika Bambaataa
  </button>
  <button
    class:highlight={sequenceName === 'confusion'}
    on:click={() => {
      updateSequence(confusion, 'confusion');
      updateBpm(119);
    }}>
    New Order
  </button>
  <button
    class:highlight={sequenceName === 'trans_europe_express'}
    on:click={() => {
      updateSequence(trans_europe_express, 'trans_europe_express');
      updateBpm(98);
    }}>
    Kraftwerk
  </button>
  <button
    class:highlight={sequenceName === 'jam_on_it'}
    on:click={() => {
      updateSequence(jam_on_it, 'jam_on_it');
      updateBpm(116);
    }}>
    Newcleus
  </button>
  <button
    class:highlight={sequenceName === 'disco'}
    on:click={() => {
      updateSequence(disco, 'disco');
      updateBpm(126);
    }}>
    Disco
  </button>
</section>
