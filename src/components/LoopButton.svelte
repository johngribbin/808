<script>
  export let type;
  export let playing;
  export let updatePlaying;
</script>

<style>
  div {
    align-items: center;
    background: linear-gradient(0deg, #121115, #121115), #ffffff;
    border: 1px solid rgba(65, 63, 71, 0.2);
    border-radius: 10px;
    box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.85);
    display: flex;
    height: 60px;
    width: 100px;
    text-align: center;
    justify-content: center;
  }

  button {
    background: linear-gradient(0deg, #111013 -2%, #1f1f23 104%, #28272c 104%),
      #ffffff;
    border: none;
    box-shadow: 0px 16px 10px rgba(0, 0, 0, 0.6),
      inset 0px 1px 2px rgba(31, 29, 35, 0.75);
    border-radius: 10px;
    color: grey;
    height: 50px;
    margin-top: 7px;
    width: 95%;
    font-size: 15px;
    font-weight: bold;
    text-shadow: 2px 1px 1px #000000;
    text-transform: uppercase;
  }

  button:focus {
    outline: none;
  }

  button:hover {
    cursor: pointer;
  }

  .active {
    background: linear-gradient(
        0deg,
        rgba(21, 20, 24, 0.9),
        rgba(21, 20, 24, 0.9)
      ),
      #ffffff;
    border: 1px solid rgba(65, 63, 71, 0.2);
    color: #46c0f2;
    text-shadow: 2px 1px 1px #000000;
  }
</style>

<div>
  <!-- TO DO - ADD a pause button -->
  {#if type === 'play'}
    <div on:click={updatePlaying(true)}>
      <button class:active={playing}>{type}</button>
    </div>
  {:else if type === 'stop'}
    <div on:click={updatePlaying(false)}>
      <button class:active={!playing}>{type}</button>
    </div>
  {/if}
</div>
