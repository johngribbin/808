<script>
  import { onMount } from "svelte";
  import { cloneSequence } from "./utils";
  import {
    planet_rock,
    confusion,
    trans_europe_express,
    jam_on_it,
    disco,
    blank
  } from "./sequences";
  import { instruments } from "./instruments";
  import LoopControls from "./components/LoopControls.svelte";
  import SequenceSelector from "./components/SequenceSelector.svelte";
  import BeatHeaders from "./components/BeatHeaders.svelte";
  import Instrument from "./components/Instrument.svelte";

  onMount(async () => {
    await Tone.start();
  });
  // BPM of the sequencer
  let bpm = 126;
  // Subscribe BPM of Tone Transport to bpm variable
  $: Tone.Transport.bpm.value = bpm;
  // Set default sequence to "planet rock" by Afrika Bambaataa
  let sequenceName = "planet_rock";
  let sequence = [];
  // Subscribe sequence variable to changes in sequence name to load in a different sequence
  $: if (sequenceName === "planet_rock") {
    sequence = cloneSequence(planet_rock);
  } else if (sequenceName === "confusion") {
    sequence = cloneSequence(confusion);
  } else if (sequenceName === "trans_europe_express") {
    sequence = cloneSequence(trans_europe_express);
  } else if (sequenceName === "jam_on_it") {
    sequence = cloneSequence(jam_on_it);
  } else if (sequenceName === "disco") {
    sequence = cloneSequence(disco);
  } else if (sequenceName === "blank") {
    sequence = cloneSequence(blank);
  }
  // Ued by start and stop buttons and Tone.Transport
  let playing = false;
  // Subscribe the start and stop of the Transport to playing variable
  $: playing ? Tone.Transport.start() : Tone.Transport.stop();
  // Tracks the transport clock
  let index = 0;
  // Subcribe beatCount to index and "16n" value passed to scheduleRepeat
  $: beatCount = index % 16;
  // Pass to the scheduleRepeat call on Tone.Transport
  function repeat(time) {
    // Highlight "beats" in the sequence by toggling the value of active key on each beat object during loop
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
    // Update index to keep track of transort clock
    index++;
  }
  // Call repeat function in time with the Transport
  Tone.Transport.scheduleRepeat(repeat, "16n");

  // Start and stop player with space bar
  document.body.onkeyup = event => {
    if (event.keyCode == 32) {
      event.preventDefault();
      playing = !playing;
    }
  };
</script>

<style>
  main {
    background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(255, 255, 255, 0.35) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      #121115;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.5);
    height: 100%;
    overflow: hidden;
  }

  #sequencer {
    border: 2px solid #46c0f2;
    box-shadow: 1px 1px 3px #000000;
    border-radius: 10px;
    color: white;
    padding: 2em;
    width: 1200px;
    margin: 5em auto;
  }

  #beat-section {
    padding: 1em;
  }
</style>

<main>
  <section id="sequencer">
    <LoopControls
      {bpm}
      updateBpm={newBpm => (bpm = newBpm)}
      {playing}
      updatePlaying={bool => (playing = bool)}
      {sequenceName}
      updateSequence={newSequenceName => (sequenceName = newSequenceName)} />
    <SequenceSelector
      {sequenceName}
      updateSequence={newSequenceName => (sequenceName = newSequenceName)}
      updateBpm={newBpm => (bpm = newBpm)} />
    <section id="beat-section">
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
  </section>
</main>

<!-- TODO
- update default volume
- change title of page and get a favicon
- Need a paused state, the current "stopped" state is more like pause
- Need triangle shapes
- Style checked beats with a solid background, then the faded pink on top
- Move some helpers to utils
- start and stop the player with space bar
- Make slider a component
- Make two different button components
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
- The value of 16 could be made a variable to toggle, so if changed to 8, then update the number of beats rendered and the repeat function and the "16n" value passed to transport schedule
-->
