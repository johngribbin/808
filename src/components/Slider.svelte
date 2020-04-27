<script>
  export let value;
  export let updateValue;
  export let min;
  export let max;
</script>

<style>
  input[type="range"] {
    background: transparent;
    border: none;
    height: 38px;
    -webkit-appearance: none;
    margin: 10px 0;
    margin-left: 0.5em;
    width: 100%;
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
    background: linear-gradient(
        0deg,
        #6dcff6 -8.33%,
        #0daaed 116.67%,
        #00deff 116.67%,
        #ffffff 116.67%
      ),
      #ffffff;
    border-radius: 5px;
    border: 1px solid #000000;
  }
  input[type="range"]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 7px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(
        0deg,
        #6dcff6 -8.33%,
        #0daaed 116.67%,
        #00deff 116.67%,
        #ffffff 116.67%
      ),
      #ffffff;
    box-shadow: 0px 6.15615px 4.78812px rgba(0, 0, 0, 0.6),
      inset 0px 0.684017px 0.684017px rgba(31, 29, 35, 0.75);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
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
    background: black;
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
    background: linear-gradient(
        0deg,
        #6dcff6 -8.33%,
        #0daaed 116.67%,
        #00deff 116.67%,
        #ffffff 116.67%
      ),
      #ffffff;
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
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: linear-gradient(
        0deg,
        #6dcff6 -8.33%,
        #0daaed 116.67%,
        #00deff 116.67%,
        #ffffff 116.67%
      ),
      #ffffff;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: linear-gradient(
        0deg,
        #6dcff6 -8.33%,
        #0daaed 116.67%,
        #00deff 116.67%,
        #ffffff 116.67%
      ),
      #ffffff;
  }
</style>

<input type="range" bind:value {min} {max} on:input={updateValue(this.value)} />
