<script>
  import { onMount } from "svelte";
  import { instruments } from "./instruments";
  import { planet_rock } from "./sequences";
  import LoopControls from "./components/LoopControls.svelte";
  import SequenceSelector from "./components/SequenceSelector.svelte";
  import BeatHeaders from "./components/BeatHeaders.svelte";
  import Instrument from "./components/Instrument.svelte";
  import Bpm from "./components/Bpm.svelte";

  onMount(async () => {
    await Tone.start();
  });
  // BPM of the sequencer
  let bpm = 126;
  // Subscribe BPM of Tone Transport to bpm variable
  $: Tone.Transport.bpm.value = bpm;
  // set default sequence to "planet rock" by Bambaataa
  let sequence = cloneSequence(planet_rock);

  let sequenceName = "planet_rock";
  // Ued by start and stop buttons and Tone.Transport
  let playing = false;
  // Subscribe the start and stop of the Transport to playing variable
  $: playing ? Tone.Transport.start() : Tone.Transport.stop();
  // Tracks the transport clock
  let index = 0;
  // Pass to the scheduleRepeat call on Tone.Transport
  function repeat(time) {
    // Use "16n" value passed to scheduleRepeat to get beatCount
    let beatCount = index % 16;
    // Highlights the "beats" in the sequence by toggling the "active" key value during each loop
    sequence = sequence.map(instrument => {
      return instrument.map((beat, beatIndex) => {
        if (beatIndex === beatCount) {
          // highlights the beat in the sequence that is active
          return { ...beat, active: true };
        } else {
          return { ...beat, active: false };
        }
      });
    });
    // Update index with each loop of transort clock time
    index++;
  }

  Tone.Transport.scheduleRepeat(repeat, "16n");

  // const can be assigned
  // nested objects within the array were being mutated
  // so this creates a clone to ensure the original sequence can always be selected
  function cloneSequence(sequence) {
    return sequence.map(instrument => instrument.map(beat => ({ ...beat })));
  }
</script>

<style>
  main {
    padding: 1em;
    width: 1200px;
    margin: 0 auto;
  }

  section {
    border: 1px solid black;
    padding: 1em;
  }
</style>

<main>
  <LoopControls
    {bpm}
    updateBpm={newBpm => (bpm = newBpm)}
    {playing}
    updatePlaying={bool => (playing = bool)}
    {sequence}
    {sequenceName}
    updateSequence={(newSequence, newSequenceName) => ((sequence = cloneSequence(newSequence)), (sequenceName = newSequenceName))} />
  <SequenceSelector
    {sequence}
    {sequenceName}
    updateSequence={(newSequence, newSequenceName) => ((sequence = cloneSequence(newSequence)), (sequenceName = newSequenceName))}
    updateBpm={newBpm => (bpm = newBpm)} />
  <section>
    <BeatHeaders />
    {#each instruments as instrument, rowIndex}
      <!-- Each row in the sequencer renders an Instrument component -->
      <Instrument
        label={instrument.label}
        sample={instrument.sample}
        sequence={sequence[rowIndex]}
        updateBeat={(beatIndex, isChecked) => (sequence[rowIndex][beatIndex].checked = isChecked)} />
    {/each}
  </section>
</main>

<!-- TODO
- Update all sliders with on:input that was added to volume of instruments
- Remove export from files not receiving the value
- Caight a bug where "Clear" did work as expected after jamming on a cleared out kit for a few minutes
- Work out why the slider doesn't change state until you release mouse
- Move slider into its own component file
- Not mobile responsive (although I have ideas)
- Add more instruments (ideally all the 808 sounds)
- Look into syncing Tone.Transport with Tone.Draw 
- Look into issue of sounds going out of sync just slightly
- Add overall volume bar
- Add some effects like reverb
- Add a "ramp up" on tempo updates
- Add a randomized arpeggiator sound to jam along with
-->
