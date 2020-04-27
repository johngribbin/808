<script>

</script>

<style>
  section {
    border: 1px solid red;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr;
  }

  h2 {
    border: 1px solid black;
    text-align: center;
    text-transform: uppercase;
    width: 40px;
  }

  #vol-header {
    padding-left: 20px;
  }
</style>

<section>

  <div />
  {#each Array(16) as _, index}
    <h2>{index + 1}</h2>
  {/each}
  <h2 id="vol-header">vol.</h2>
</section>
