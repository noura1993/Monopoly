<template>
  <div id="app">
    <player-form></player-form>
    <players-grid :players="players"></players-grid>
    <board-grid/>
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
      players: []
    }
  },
  components: {
    "board-grid": BoardGrid,
    "player-form": PlayerForm,
    "players-grid": PlayersGrid
  },
  mounted() {
    eventBus.$on('submit-player', (player) => {
      PlayerService.addPlayer(player)
      .then((addedPlayer) => {
        if (addedPlayer) {
          this.players.push(addedPlayer)
        }
        else {
          alert('Try again, nerd.')
        }
      })
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
