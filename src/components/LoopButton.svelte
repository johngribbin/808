<script>
  export let type;
  export let playing;
  export let updatePlaying;
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
  class:active={(type === 'play' && playing) || (type === 'stop' && !playing)}
  on:click={type === 'play' ? updatePlaying(true) : updatePlaying(false)}>
  {type}
</button>
