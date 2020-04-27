<script>
  import { afterUpdate } from "svelte";
  export let beat;
  export let updateBeat;
  export let instrumentPlayer;

  afterUpdate(() => {
    if (beat.checked && beat.active) {
      instrumentPlayer.start();
    }
  });
</script>

<style>
  input {
    background: white;
    border: 3px solid black;
    border-radius: 5px;
    -webkit-appearance: none;
    height: 40px;
    margin-right: 0.5em;
    width: 40px;
  }

  input:checked {
    background: #abd;
  }

  .active {
    border: 3px solid red;
    border-radius: 5px;
    -webkit-appearance: none;
    height: 40px;
    margin-right: 0.5em;
    width: 40px;
  }
</style>

<input
  class={beat.active ? 'active' : ''}
  type="checkbox"
  checked={beat.checked}
  on:click={updateBeat} />
