<script>
  import { afterUpdate } from "svelte";
  export let beat;
  export let updateBeat;
  export let instrumentPlayer;

  afterUpdate(() => {
    // play instrument when this "beat" is active and checked in the sequence
    if (beat.checked && beat.active) {
      instrumentPlayer.start();
    }
  });
</script>

<style>
  label {
    align-items: center;
    border: 2px solid #c8c8c8;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    height: 40px;
    margin-right: 0.5em;
    width: 40px;
  }

  label:hover {
    cursor: pointer;
  }

  input {
    background: black;
    border: 4px solid black;
    border-radius: 50%;
    height: 50%;
    width: 50%;
    -webkit-appearance: none;
  }

  input:hover {
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  /* styles the label when checkbox is checked */
  .checked {
    background: rgba(255, 122, 230, 0.3);
    border-color: #ff7ae6;
    box-shadow: 0 0 5px #ff7ae6;
  }

  /* styles the input when checkbox is active */
  .active {
    background: #6dcff6;
    box-shadow: 0 0 5px #6dcff6;
  }
</style>

<label class:checked={beat.checked}>
  <input
    class:active={beat.active}
    type="checkbox"
    checked={beat.checked}
    on:click={updateBeat} />
</label>
