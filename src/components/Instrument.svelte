<script>
  import Beat from "./Beat.svelte";
  import Vol from "./Vol.svelte";
  export let label;
  export let sample;
  export let sequence;
  export let updateBeat;

  // Create a player for each Instrument that will be called by each Beat component as sequence plays
  const instrumentPlayer = new Tone.Player(`${sample}`).toMaster();
  // Set default setting of a Tone.Player to -6
  let instrumentVolume = -6;
  // Subscribe the volume of this instrument to the variable volume
  $: instrumentPlayer.volume.value = instrumentVolume;
</script>

<style>
  div {
    /* Grid is used to lock each beat in the sequece below the numbers rendered by the BeatHeaders component */
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr;
    margin-bottom: 0.5em;
  }

  label {
    text-transform: uppercase;
    font-weight: bold;
    text-align: right;
    margin-right: 1em;
    padding-top: 0.7em;
  }
</style>

<div>
  <label>{label}</label>
  <!-- Index of beat is hardcoded into call to update checked state in sequence state -->
  {#each sequence as beat, index}
    <Beat
      {beat}
      {instrumentPlayer}
      updateBeat={() => updateBeat(index, !beat.checked)} />
  {/each}

  <Vol
    {instrumentVolume}
    editVolume={newVolume => (instrumentVolume = newVolume)} />
</div>
