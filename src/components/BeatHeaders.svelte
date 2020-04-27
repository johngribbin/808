<script>

</script>

<style>
  section {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr;
  }

  h2 {
    text-align: center;
    text-transform: uppercase;
    width: 40px;
  }

  #vol-header {
    width: 100%;
  }
</style>

<section>
  <!-- Div is used to create grid spacing above the instrument names -->
  <div />
  {#each Array(16) as _, index}
    <h2>{index + 1}</h2>
  {/each}
  <h2 id="vol-header">vol.</h2>
</section>
