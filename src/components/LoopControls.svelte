<script>
  import Bpm from "./Bpm.svelte";
  import { blank } from "../sequences";
  export let bpm;
  export let updateBpm;
  export let playing;
  export let updatePlaying;
  export let sequenceName;
  export let updateSequence;
</script>

<style>
  section {
    border: 1px solid black;
    display: flex;
    padding: 1em;
  }

  .highlight {
    color: blue;
    font-weight: bold;
  }
</style>

<section>
  <Bpm {bpm} {updateBpm} />
  <button class={!playing ? 'highlight' : null} on:click={updatePlaying(false)}>
    Stop
  </button>
  <button class={playing ? 'highlight' : null} on:click={updatePlaying(true)}>
    Play
  </button>
  <button
    class:highlight={sequenceName === 'blank'}
    on:click={() => {
      updateSequence(blank, 'blank');
    }}>
    CLEAR
  </button>
</section>
