<template>
  <div id="app">
    <board-grid/>
  </div>
</template>

<script>
import BoardGrid from "./components/BoardGrid";

export default {
  name: 'App',
  components: {
    "board-grid": BoardGrid
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  /* background: url('./assets/monopoly.jpg') no-repeat; */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
