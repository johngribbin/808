<script>
  import Beat from "./Beat.svelte";
  export let label;
  export let sample;
  export let sequence;
  export let updater;

  const instrumentPlayer = new Tone.Player(`${sample}`).toMaster();
</script>

<style>
  label {
    text-transform: uppercase;
  }
</style>

<div>
  <label>{label}</label>
  <!-- Index of beat is hardcoded into call to update checked state in sequence state -->
  {#each sequence as beat, index}
    <Beat
      {beat}
      {instrumentPlayer}
      updater={() => updater(index, !beat.checked)} />
  {/each}
</div>
