<script>
  import Tempo from "./Tempo.svelte";
  import LoopButton from "./LoopButton.svelte";
  import SequenceButton from "./SequenceButton.svelte";
  export let bpm;
  export let updateBpm;
  export let playing;
  export let updatePlaying;
  export let sequenceName;
  export let updateSequence;
</script>

<style>
  section {
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }

  div {
    display: flex;
    width: 45%;
    justify-content: space-between;
  }
</style>

<section>
  <Tempo {bpm} {updateBpm} />
  <div>
    <SequenceButton
      {sequenceName}
      updateSequenceAndBpm={() => {
        updateSequence('blank');
        updateBpm(120);
      }}
      presetSequenceName={'blank'}
      presetLabel={'Clear'} />
    <LoopButton {playing} {updatePlaying} type="stop" />
    <LoopButton {playing} {updatePlaying} type="play" />
  </div>
</section>
