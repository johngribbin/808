<script>
  import { onMount } from "svelte";

  onMount(async () => {
    await Tone.start();
    console.log("Audio is ready");
  });

  let bpm = 120;
  // subscribe BPM of transport to bpm variable
  $: Tone.Transport.bpm.value = bpm;

  // sequences - default is four on floor
  const sequences = {
    one: {
      kick: [
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false
      ],
      snare: [
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false
      ],
      open_hat: [
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false
      ],
      closed_hat: [
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false
      ],
      selected: true
    },
    clear: {
      kick: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      snare: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      open_hat: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      closed_hat: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      selected: false
    }
  };

  // used to highlight the position in the loop
  let beatCount = 0;

  // create 4 drums
  const drums = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth()
  ];

  // assign instruments
  drums[0].oscillator.type = "triangle";
  drums[1].oscillator.type = "sine";
  drums[2].oscillator.type = "sawtooth";
  drums[3].oscillator.type = "square";

  // add some gain and attach to browser audio
  const gain = new Tone.Gain(0.6);
  gain.toMaster();
  drums.forEach(drum => drum.connect(gain));

  // get all rows
  const rows = document.getElementsByTagName("div");
  // notes that will be played by the insruments
  const notes = ["G5", "E4", "C3", "A2"];

  let index = 0;

  Tone.Transport.scheduleRepeat(repeat, "16n");

  function repeat(time) {
    // get the "step"
    let step = (index % 16) + 1;
    // Changes class on four checkboxes in current "column" to "highlight"
    beatCount = step;
    // Map through the 4 rows (instruments)
    for (let i = 0; i < rows.length; i++) {
      let drum = drums[i];
      let note = notes[i];
      let row = rows[i];
      let input = row.querySelector(`input:nth-child(${step})`);
      if (input.checked) drum.triggerAttackRelease(note, "16n", time);
    }
    index++;
  }

  const playLoop = () => {
    Tone.Transport.start();
  };

  const stopLoop = () => {
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

  .checkbox {
    background: white;
    border: 3px solid black;
    border-radius: 5px;
    -webkit-appearance: none;
    height: 40px;
    margin-right: 0.5em;
    width: 40px;
  }

  .checkbox:checked {
    background: #abd;
  }

  .flash {
    background: white;
    border: 3px solid red;
    border-radius: 5px;
    -webkit-appearance: none;
    height: 40px;
    margin-right: 0.5em;
    width: 40px;
  }

  section {
    border: 1px solid black;
    padding: 1em;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  p {
    margin-right: 1em;
  }
</style>

<main>
  <h1>808 Sequencer</h1>
  <section>
    <h2>KICK</h2>
    <div>
      {#each sequences.one.kick as beat, i}
        <input
          class={i + 1 === beatCount ? 'flash' : 'checkbox'}
          type="checkbox"
          checked={beat ? 'checked' : null} />
      {/each}
    </div>

    <h2>SNARE</h2>
    <div>
      {#each sequences.one.snare as beat, i}
        <input
          class={i + 1 === beatCount ? 'flash' : 'checkbox'}
          type="checkbox"
          checked={beat ? 'checked' : null} />
      {/each}
    </div>

    <h2>OPEN HAT</h2>
    <div>
      {#each sequences.one.open_hat as beat, i}
        <input
          class={i + 1 === beatCount ? 'flash' : 'checkbox'}
          type="checkbox"
          checked={beat ? 'checked' : null} />
      {/each}
    </div>

    <h2>CLOSED HAT</h2>
    <div>
      {#each sequences.one.closed_hat as beat, i}
        <input
          class={i + 1 === beatCount ? 'flash' : 'checkbox'}
          type="checkbox"
          checked={beat ? 'checked' : null} />
      {/each}
    </div>
  </section>

  <p>
    <input bind:value={bpm} />
    BPM
  </p>

  <button on:click={playLoop}>Play Loop</button>
  <button on:click={stopLoop}>Stop Loop</button>
</main>

<!-- TODO
- Look into syncing Tone.Transport with Tone.Draw  -->
