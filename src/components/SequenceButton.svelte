<script>
  // Passed from App.svelte
  export let sequenceName;
  // Passed from SequenceSelector.svelte;
  export let presetLabel;
  export let presetSequenceName;
  export let updateSequenceAndBpm;
</script>

<style>
  button {
    color: white;
    background: black;
  }

  .active {
    background: blue;
  }
</style>

<button
  class:active={presetSequenceName === sequenceName}
  on:click={updateSequenceAndBpm}>
  {presetLabel}
</button>
