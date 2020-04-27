<script>
  export let instrumentVolume;
  export let editVolume;
</script>

<style>
  div {
    align-items: center;
    display: flex;
    height: 40px;
    width: 40px;
  }
</style>

<div>
  <input
    type="range"
    bind:value={instrumentVolume}
    min={-10}
    max={10}
    on:input={editVolume(this.value)} />
</div>
