<script>
  export let bpm;
  export let updateBpm;
</script>

<style>
  label {
    align-items: center;
    display: flex;
  }

  #field {
    margin-right: 0.5em;
  }

  input[type="range"] {
    height: 38px;
    -webkit-appearance: none;
    margin: 10px 0;
    margin-left: 0.5em;
    max-width: 500px;
    width: 50%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #3071a9;
    border-radius: 5px;
    border: 1px solid #000000;
  }
  input[type="range"]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 30px;
    width: 15px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -11px;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #3071a9;
  }
  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #3071a9;
    border-radius: 5px;
    border: 1px solid #000000;
  }
  input[type="range"]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 30px;
    width: 15px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: #3071a9;
    border: 1px solid #000000;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #000000;
  }
  input[type="range"]::-ms-fill-upper {
    background: #3071a9;
    border: 1px solid #000000;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #000000;
  }
  input[type="range"]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 30px;
    width: 15px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #3071a9;
  }
</style>

<label>
  <input
    id="field"
    type="number"
    bind:value={bpm}
    min={0}
    max={180}
    on:change={updateBpm(this.value)} />
  BPM
  <input
    type="range"
    bind:value={bpm}
    min={0}
    max={180}
    on:change={updateBpm(this.value)} />
</label>
