<script>
  import { onMount } from "svelte";
  import SelectSequence from "./components/SelectSequence.svelte";
  import Instrument from "./components/Instrument.svelte";
  import Bpm from "./components/Bpm.svelte";

  onMount(async () => {
    await Tone.start();
  });

  // The global sequence state
  let sequence = [
    // Instrument 1
    [
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false }
    ],
    // Instrument 2
    [
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false }
    ],
    // Instrument 3
    [
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false }
    ],
    // Instrument 4
    [
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: true, active: false },
      { checked: false, active: false },
      { checked: false, active: false },
      { checked: false, active: false }
    ]
  ];

  // Instrument labels and sample passed to each instrument component (row in the sequencer)
  const instruments = [
    { label: "kick", sample: "./samples/808_kick.wav" },
    {
      label: "snare",
      sample: "./samples/808_snare.wav"
    },
    {
      label: "open hat",
      sample: "./samples/808_open_hat.wav"
    },
    {
      label: "closed hat",
      sample: "./samples/808_closed_hat.wav"
    }
  ];

  // Tracks the transport clock
  let index = 0;

  function repeat(time) {
    // Get the current position of
    let beatCount = index % 16;

    sequence = sequence.map(instrument => {
      return instrument.map((beat, beatIndex) => {
        if (beatIndex === beatCount) {
          // highlight the beat in the sequence that is active
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

  const updateSequence = newSequence => {
    sequence = newSequence;
  };

  const play = () => {
    Tone.Transport.start();
  };

  const stop = () => {
    Tone.Transport.stop();
  };
</script>

<style>
  main {
    padding: 1em;
    max-width: 1000px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;

    font-size: 4em;
    font-weight: 100;
    text-transform: uppercase;
  }

  section {
    border: 1px solid black;
    padding: 1em;
  }
</style>

<main>
  <h1>808 Sequencer</h1>
  <section>
    <button on:click={play}>Play</button>
    <button on:click={stop}>Stop</button>
    <Bpm />
  </section>
  <SelectSequence {sequence} />
  <section>
    {#each instruments as instrument, rowIndex}
      <!-- Each row in the sequencer renders an Instrument component -->
      <Instrument
        label={instrument.label}
        sample={instrument.sample}
        sequence={sequence[rowIndex]}
        updater={(beatIndex, isChecked) => (sequence[rowIndex][beatIndex].checked = isChecked)} />
    {/each}
  </section>

</main>

<!-- TODO
- Add numbers of steps to top
- Look into syncing Tone.Transport with Tone.Draw  
- Add some effects like reverb
- Add option to change the sequence
- Add button to clear the sequence
- Update tempo with a svelte slider 
- Add a curve on tempo updates
- Add a possible arpeggiator 
-->
