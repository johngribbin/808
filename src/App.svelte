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
  // update to an arry of arrays, first index is row, second index would be the "beat"
  // Could be an array or arrays, with each item an object
  // const sequence = [
  // 	[{checked: true, active: false}, ...], // kick
  // 		[{checked: true, active: false}, ...], // snare
  // 			[{checked: true, active: false}, ...], // closed hat
  // 				[{checked: true, active: false}, ...], // open hat
  // ]

  // each "row" can be an instrument, that will contain as many "beats" as the length of the sequence it receives
  // <Instrument sample='./drum' sequence='./row_its_concerned_with' updater = {(beatIndex, isChecked) => sequence[rowIndex][beat].checked = isChecked} />
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
  drums[0].oscillator.type = "triangle"; //
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

  let index = 0;

  Tone.Transport.scheduleRepeat(repeat, "16n");

  function repeat(time) {
    // get the "step"
    let step = (index % 16) + 1;
    // Changes class on four checkboxes in current "column" to "highlight"
    beatCount = step;
    // Map through the 4 rows (instruments)
    for (let i = 0; i < rows.length; i++) {
      // index will be used to trigger the drum
      // looping over the sequence as opposed to rows!
      let drum = drums[i];

      let row = rows[i];
      let input = row.querySelector(`input:nth-child(${step})`);
      if (input.checked) drum.triggerAttackRelease("C4", "16n", time);
    }
    index++;
  }

  const playLoop = () => {
    Tone.Transport.start();
  };

  const stopLoop = () => {
    Tone.Transport.stop();
  };

  const setSequence = selectedSequence => {
    Object.keys(sequences).map(function(key, index) {
      console.log(sequences);

      if (key === selectedSequence) {
        return { ...sequences.key, selected: true };
      } else {
        return { ...sequences.key, selected: false };
      }
    });

    console.log(sequences);
  };

  const kick = new Tone.Player("./samples/808_kick.wav").toMaster();

  const hitKick = () => {
    kick.start();
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

    <!-- {#each sequence as instrument, rowIndex}
				<Instrument sample='./drum' sequence='./row_its_concerned_with' label='Kick' updater = {(beatIndex, isChecked) => sequence[rowIndex][beat].checked = isChecked} />
		
		{/each} -->

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
  <button on:click={setSequence('clear')}>Clear</button>
  <button on:click={hitKick}>Hit Kick</button>
</main>

<!-- TODO
- Set up global state for the UI and triggering the sounds
- Add numbers of steps to top
- Look into syncing Tone.Transport with Tone.Draw  
- Add some effects like reverb
- Add option to change the sequence
- Add button to clear the sequence
- Update tempo with a svelte slider 
- Add a curve on tempo updates
- Add a possible arpeggiator 
- Break out rows and beats
- Breaking down the global stat
-->
