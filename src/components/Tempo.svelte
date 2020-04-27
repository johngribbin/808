<script>
  import Slider from "./Slider.svelte";
  export let bpm;
  export let updateBpm;
</script>

<style>
  div {
    align-items: center;
    display: flex;
    height: 100%;
    width: 50%;
  }

  label {
    align-items: center;
    display: flex;
    margin: 0em 1em 0em 1em;
    font-weight: bold;
  }

  input {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      #16161a;
    border: none;
    color: white;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 45px;
    font-weight: bold;
    font-size: 18px;
    margin-top: 0.5em;
    padding: 0em 1em 0em 1em;
  }

  input:focus {
    outline: none;
  }

  #field {
    margin-right: 0.5em;
  }
</style>

<div>
  <h3>TEMPO</h3>
  <label>
    <input
      id="field"
      type="number"
      bind:value={bpm}
      min={0}
      max={180}
      on:input={updateBpm(this.value)} />
    BPM
  </label>

  <Slider value={bpm} updateValue={updateBpm} min={0} max={200} />
</div>
