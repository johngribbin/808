<script>
  import SequenceButton from "./SequenceButton.svelte";
  export let sequenceName;
  export let updateSequence;
  export let updateBpm;

  let presets = [
    {
      sequence_name: "planet_rock",
      label: "Afrika Bambaataa",
      bpm: "127"
    },
    {
      sequence_name: "trans_europe_express",
      label: "Kraftwerk",
      bpm: "98"
    },
    {
      sequence_name: "jam_on_it",
      label: "Newcleus",
      bpm: "116"
    },
    {
      sequence_name: "confusion",
      label: "New Order",
      bpm: "119"
    },
    {
      sequence_name: "disco",
      label: "Disco",
      bpm: "126"
    }
  ];
</script>

<style>
  section {
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }
</style>

<section>
  <h3>BEATS</h3>
  {#each presets as preset}
    <SequenceButton
      {sequenceName}
      updateSequenceAndBpm={() => {
        updateSequence(preset.sequence_name);
        updateBpm(preset.bpm);
      }}
      presetSequenceName={preset.sequence_name}
      presetLabel={preset.label} />
  {/each}
</section>
