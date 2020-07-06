<template>
  <div id="app">
    <player-form v-if="showForm"></player-form>
    <board-grid v-if="showBoardGrid"/>
  </div>
</template>

<script>
import {eventBus} from "./main"
import PlayerForm from "./components/PlayerForm";
import BoardGrid from "./components/BoardGrid";

export default {
  name: 'App',
  data() {
    return {
      showForm: true,
      showBoardGrid: false

    }
  },
  components: {
    "board-grid": BoardGrid,
    "player-form": PlayerForm
  },
  mounted() {
    eventBus.$on("start-game", () => {
      this.showForm = false;
      this.showBoardGrid = true;
    })
  },
  methods: {
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
