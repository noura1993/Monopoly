<template>
  <div id="app">
    <player-form v-if="showForm"></player-form>
    <board-grid v-if="showBoardGrid"/>
  </div>
</template>

<script>
import {eventBus} from "./main"
import PlayerService from "./services/PlayerService"
import PlayerForm from "./components/PlayerForm";
import BoardGrid from "./components/BoardGrid";

export default {
  name: 'App',
  data() {
    return {
      showForm: true,
      showBoardGrid: false,
      players: []

    }
  },
  components: {
    "board-grid": BoardGrid,
    "player-form": PlayerForm
  },
  methods: {
    checkPlayerArray: function () {
      if (this.players.length > 0) {
        this.showForm = false;
        this.showBoardGrid = true;
      }
      else {
        alert("Can't really start a game without any players, or can we?");
      }
    }
  },
  mounted() {
    eventBus.$on("start-game", () => {
      PlayerService.getPlayers()
      .then(players => {
        if (players.length > 0) {
          this.showForm = false;
          this.showBoardGrid = true;
        } else {
          alert("Can't really start a game without any players, or can we?");
        }
        this.players = players
      })
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
}

</style>
