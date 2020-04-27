<script>
  export let type;
  export let playing;
  export let updatePlaying;
</script>

<style>
  div {
    align-items: center;
    background: linear-gradient(0deg, #121115 0%, #1d1d21 100%), #1c1c20;
    display: flex;
    justify-content: center;
    height: 60px;
    width: 100px;
  }

  div:hover {
    cursor: pointer;
  }

  #stop-symbol--active {
    background: #121115;
    box-shadow: 0px 2px 1px rgba(255, 255, 255, 0.75);
    height: 30px;
    width: 30px;
  }

  #stop-symbol--inactive {
    background: linear-gradient(
        0deg,
        #4a4951 -4.17%,
        #58565f 108.33%,
        #58565f 108.33%,
        #58565f 108.33%
      ),
      #4cddff;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.6), inset 0px 1px 0px #645e70;
    height: 30px;
    width: 30px;
  }

  #play-symbol--active {
    background: #000000;
    box-shadow: 0px 2px 1px rgba(255, 255, 255, 0.75);
    transform: rotate(89.86deg);
    height: 30px;
    width: 30px;
  }

  #play-symbol--inactive {
    background: #000000;
    box-shadow: 0px 2px 1px rgba(255, 255, 255, 0.75);
    transform: rotate(89.86deg);
    height: 30px;
    width: 30px;
  }

  .active {
    background: linear-gradient(
        0deg,
        #6dcff6 0%,
        #0daaed 100%,
        #00deff 100%,
        #00deff 100%
      ),
      #ffffff;
    box-shadow: 0px 0px 18px rgba(0, 216, 255, 0.15),
      inset 0px 5px 10px rgba(0, 0, 0, 0.9);
  }
</style>

<div>
  {#if type === 'play'}
    <div class:active={playing} on:click={updatePlaying(true)}>
      <span id={playing ? 'play-symbol--active' : 'play-symbol--inactive'} />
    </div>
  {:else if type === 'stop'}
    <div class:active={!playing} on:click={updatePlaying(false)}>
      <span id={!playing ? 'stop-symbol--active' : 'stop-symbol--inactive'} />
    </div>
  {/if}
</div>
