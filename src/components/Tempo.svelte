<script>
  import Slider from "./Slider.svelte";
  export let bpm;
  export let updateBpm;
</script>

<style>
  label {
    align-items: center;
    display: flex;
  }

  #field {
    margin-right: 0.5em;
  }
</style>

<label>
  <input
    id="field"
    type="number"
    bind:value={bpm}
    min={0}
    max={180}
    on:input={updateBpm(this.value)} />
  BPM
  <Slider value={bpm} updateValue={updateBpm} min={0} max={200} />
</label>
