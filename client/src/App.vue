<template>
  <div id="app">
    <player-form></player-form>
    <players-grid :players="players"></players-grid>
    <board-grid :properties="properties"/>
    <ul>
      <li v-for="(property, index) in properties" :key="index">{{property}}</li>
    </ul>
  </div>
</template>

<script>
import {eventBus} from "./main"
import PlayerService from "./services/PlayerService";

import PlayersGrid from "./components/PlayersGrid";
import PlayerForm from "./components/PlayerForm";
import BoardGrid from "./components/BoardGrid";

export default {
  name: 'App',
  data() {
    return {
      players: [],
      properties: []
    }
  },
  components: {
    "board-grid": BoardGrid,
    "player-form": PlayerForm,
    "players-grid": PlayersGrid
  },
  mounted() {
    this.addPlayerToPlayerList();
    this.getFullListOfProperties();
  },
  methods: {
    addPlayerToPlayerList: function () {
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
    },

    getFullListOfProperties: function () {
      PlayerService.getProperties()
        .then((properties) => this.properties = properties);
    }
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
