<script>
  import Bpm from "./Bpm.svelte";
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
    border: 1px solid black;
    display: flex;
    padding: 1em;
  }
</style>

<section>
  <Bpm {bpm} {updateBpm} />
  <LoopButton {playing} {updatePlaying} type="stop" />
  <LoopButton {playing} {updatePlaying} type="play" />
  <SequenceButton
    {sequenceName}
    updateSequenceAndBpm={() => {
      updateSequence('blank');
      updateBpm(120);
    }}
    presetSequenceName={'blank'}
    presetLabel={'Clear'} />
</section>
