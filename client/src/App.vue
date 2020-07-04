<template>
  <div id="app">
    <player-form></player-form>
    <board-grid/>
    <ul>
      <li v-for="(player, index) in playersTEMP" :key="index">{{player}}</li>
    </ul>
  </div>
</template>

<script>
import {eventBus} from "./main"
import PlayerService from "./services/PlayerService"
import PlayersGrid from "./components/PlayersGrid"
import PlayerForm from "./components/PlayerForm"
import BoardGrid from "./components/BoardGrid";

export default {
  name: 'App',
  data() {
    return {
      playersTEMP: []
    }
  },
  components: {
    "board-grid": BoardGrid,
    "player-form": PlayerForm,
    "player-grid": PlayersGrid
  },
  mounted() {
    eventBus.$on('submit-player', (player) => {
      PlayerService.addPlayer(player)
      .then((data) => this.playersTEMP.push(data))
    })
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
