<script>
  import Slider from "./Slider.svelte";
  export let instrumentVolume;
  export let editVolume;
</script>

<style>
  div {
    align-items: center;
    display: flex;
    height: 40px;
    width: 100%;
  }
</style>

<div>
  <!-- Is bound to the instrumentValue it is passed in the Instrument.svelte component -->
  <Slider value={instrumentVolume} updateValue={editVolume} min={-20} max={0} />
</div>
