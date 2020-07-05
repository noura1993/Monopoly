<template>
  <div id="app">
    <player-form></player-form>
    <players-grid :properties="properties" :players="players"></players-grid>
    <!-- <turn-handler :properties="properties" :players="players"></turn-handler> -->
    <!-- <roll-dice></roll-dice> -->
    <board-grid :properties="properties"/>
  </div>
</template>

<script>
import {eventBus} from "./main"
import PlayerService from "./services/PlayerService";

import PlayersGrid from "./components/PlayersGrid";
import TurnHandler from "./components/TurnHandler";
import PlayerForm from "./components/PlayerForm";
import BoardGrid from "./components/BoardGrid";
import RollDice from "./components/RollDice";

export default {
  name: 'App',
  data() {
    return {
      players: [],
      properties: []
    }
  },
  components: {
    "roll-dice": RollDice,
    "board-grid": BoardGrid,
    "player-form": PlayerForm,
    "turn-handler": TurnHandler,
    "players-grid": PlayersGrid
  },
  mounted() {
    this.addPlayerToPlayerList();
    this.getFullListOfProperties();
    this.playerBuysProperty();
    this.playerSellsProperty();
  },
  methods: {
    getPlayers: function () {
      PlayerService.getPlayers()
        .then((players) => this.players = players)
    },

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
          // .then(() => {
          //   PlayerService.getPlayers()
          //     .then((players) => this.players = players)
          // })
      })
    },

    playerSellsProperty: function () {
      //$emit event for this in in PlayersGrid.vue
      eventBus.$on('player-sells-property-update', (eventBusObject) => {
        //Player selling adding sale value to wallet, removing property from their list
        //and updating their database info
        eventBusObject.playerSelling.wallet += eventBusObject.saleValue;
        const index = eventBusObject.playerSelling.properties.findIndex((property) => property._id === eventBusObject.property._id);
        eventBusObject.playerSelling.properties.splice(index, 1);
        PlayerService.updatePlayer(eventBusObject.playerSelling);

        //Player buying deducting sale value from wallet, adding property to their list
        //and updating their database info
        eventBusObject.playerToSellTo.wallet -= eventBusObject.saleValue;
        eventBusObject.playerToSellTo.properties.push(eventBusObject.property);
        PlayerService.updatePlayer(eventBusObject.playerToSellTo)
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
