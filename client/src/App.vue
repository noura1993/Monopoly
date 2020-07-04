<template>
  <div id="app">
    <player-form></player-form>
    <players-grid :players="players" :properties="properties"></players-grid>
    <board-grid :properties="properties"/>
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
    this.playerBuysProperty();
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
    },

    playerBuysProperty: function () {
      //$emit event for this is in PlayersGrid.vue
      eventBus.$on('player-buys-property-update', (eventBusObject) => {
        eventBusObject.player.wallet -= eventBusObject.property.value;
        eventBusObject.player.properties.push(eventBusObject.property);

        PlayerService.updatePlayer(eventBusObject.player)
          .then(() => {
            PlayerService.getPlayers()
              .then((players) => this.players = players)
          })
      })
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
