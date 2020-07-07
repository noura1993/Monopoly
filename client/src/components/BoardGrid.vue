<template>
  <div class="board-wrapper">
    <roll-dice v-if="shouldShowRollDice" :players="players" :currentPlayerIndex="currentPlayerIndex"/>
    <turn-handler :properties="allProperties" :players="players" :currentPlayerIndex="currentPlayerIndex" :diceValue="diceValue" v-if="shouldShowTurnHandler"/>
    
    <div v-for="(player, thisIndex) in players" :key="thisIndex" :class="playerClass(thisIndex)">
      <player-info :players="players" :player="players[thisIndex]"/>
    </div>

    <div class="board">
        
      <div class="corner top-left-corner" v-for="index in freeParking" :key="index">
        <img src="../assets/freeParking.png" width="140" height="150"/>
      </div>

    <div class="row top-row">
      <div class="cell top-property property-container" v-for="index in topArray" :key="index">
          <property-info :property="allProperties[index]"/>
      </div>
    </div>

    <div class="corner bottom-right-corner" v-for="index in go" :key="index">
        <img src="../assets/go.gif" width="140" height="140"/>
      </div>


        <div class="corner top-right-corner" v-for="index in goToJail" :key="index">
          <img src="../assets/goToJail.gif" width="140" height="140"/>
      </div>

        <div class="corner bottom-left-corner" v-for="index in jail" :key="index">
          <img src="../assets/inJail.gif" width="140" height="150"/>
      </div>
 
    <div class="column left-column">
        <div class="cell left-property property-container" v-for="index in leftArray" :key="index">
        <property-info :property="allProperties[index]"/>
      </div>
    </div>
    <div class="center"></div>
    <div class="column right-column">
        <div class="cell right-property property-container" v-for="index in rightArray" :key="index">
        <property-info :property="allProperties[index]"/>
      </div>
    </div>
 
    <div class="row bottom-row">
       <div class="cell bottom-property property-container" v-for="index in bottomArray" :key="index">
        <property-info :property="allProperties[index]"/>
      </div>
    </div>
 
  </div>
  </div>
</template>

<script>
import PlayerService from '../services/PlayerService'
import RollDice from './RollDice';
import TurnHandler from './TurnHandler';
import PlayerInfo from './PlayerInfo';
import PropertyInfo from './PropertyInfo';
import { eventBus } from '@/main';

export default {
  name: "board-grid",
  data() {
    return {
      players: [],
      allProperties: [],
      go: [0],
      jail: [9],
      freeParking: [18],
      goToJail: [27],
      bottomArray: [8, 7, 6, 5, 4, 3, 2, 1],
      leftArray: [35, 34, 33, 32, 31, 30, 29, 28],
      topArray: [26, 25, 24, 23, 22, 21, 20, 19],
      rightArray: [17, 16, 15, 14, 13, 12, 11, 10],
      shouldShowRollDice: true,
      shouldShowTurnHandler: false,
      currentPlayerIndex: 0,
      diceValue: 0
    }
  },
  components: {
    "roll-dice": RollDice,
    "turn-handler": TurnHandler,
    "player-info": PlayerInfo,
    "property-info":PropertyInfo
  },
  methods: {
    playerClass: function (thisPlayerIndex) {
      return `player player${thisPlayerIndex + 1}`;
    }
  },
  mounted() {
    PlayerService.getProperties()
      .then((properties) => {
        this.allProperties = properties;
      });

    PlayerService.getPlayers()
    .then(result => {
      this.players = result;
    });

    eventBus.$on('next-player', () => {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.shouldShowRollDice = true;
      this.shouldShowTurnHandler = false;
    });

    eventBus.$on('buy-property', () => {  
      const propertyIndex = this.players[this.currentPlayerIndex].position; 
      const property = this.allProperties[propertyIndex];

      if (this.players[this.currentPlayerIndex].wallet < property.value) {
        alert(`${this.players[this.currentPlayerIndex].name}: You don't have enough funds for ${property.name}`);
        return;
      }

      this.players[this.currentPlayerIndex].properties.push(property);
      this.players[this.currentPlayerIndex].wallet -= property.value;

      PlayerService.updatePlayer(this.players[this.currentPlayerIndex])
        .then(() => {
          PlayerService.getPlayers()
            .then((players) => this.players = players)
        })
    });

    eventBus.$on('player-sells-property', (eventBusObject) => {
      eventBusObject.playerSelling.wallet += eventBusObject.sellValue;
      const index = eventBusObject.playerSelling.properties.findIndex((property) => property._id === eventBusObject.propertyBeingSold._id);
      eventBusObject.playerSelling.properties.splice(index, 1);
      PlayerService.updatePlayer(eventBusObject.playerSelling);

      eventBusObject.playerToSellTo.wallet -= eventBusObject.sellValue;
      eventBusObject.playerToSellTo.properties.push(eventBusObject.propertyBeingSold);
      PlayerService.updatePlayer(eventBusObject.playerToSellTo);
    });
    
    eventBus.$on("pay-rent", () => {
      const propertyIndex = this.players[this.currentPlayerIndex].position; 
      const propertyID = this.allProperties[propertyIndex]._id;
      const property = this.allProperties[propertyIndex];
      this.players[this.currentPlayerIndex].wallet -= property.rent_value;
      let owner = null;
      this.players.forEach((foundPlayer) => {
        foundPlayer.properties.forEach((playerProperty) => {
          if (playerProperty._id === propertyID) {
            owner = foundPlayer;
          }
        })
      })
      owner.wallet += property.rent_value;
      this.players[this.currentPlayerIndex].shouldPayRent = false;
      PlayerService.updatePlayer(this.players[this.currentPlayerIndex]);
      PlayerService.updatePlayer(owner);
    });
 
    eventBus.$on("roll-dice", (rollDiceValue) => {
      this.diceValue = rollDiceValue;
      this.shouldShowRollDice = false;
      this.shouldShowTurnHandler = true;
      this.players[this.currentPlayerIndex].position += rollDiceValue;
      if(this.players[this.currentPlayerIndex].position >= 36) {
        this.players[this.currentPlayerIndex].wallet += 200;
      }
      this.players[this.currentPlayerIndex].position = this.players[this.currentPlayerIndex].position % 36;

      const propertyIndex = this.players[this.currentPlayerIndex].position; 
      const propertyId = this.allProperties[propertyIndex]._id;
      this.players.forEach( player => {
        player.properties.forEach( property => {
          if(property._id === propertyId && this.players[this.currentPlayerIndex]._id !== player._id) {
              this.players[this.currentPlayerIndex].shouldPayRent = true;
          }
        })
      })
    });

    eventBus.$on("player-bankruptcy", () => {
      
      PlayerService.deletePlayer(this.players[this.currentPlayerIndex]._id)
        .then(() => {
          PlayerService.getPlayers()
            .then((players) => this.players = players)
        })
    });

    eventBus.$on("pay-fine", () => {
      if (this.players[this.currentPlayerIndex].wallet >= 50) {
        this.players[this.currentPlayerIndex].wallet -= 50;
        this.players[this.currentPlayerIndex].isInJail = false;
      }
      else {
        alert("You're very broke.")
      }
        
      PlayerService.updatePlayer(this.players[this.currentPlayerIndex])
        .then(() => {
          PlayerService.getPlayers()
            .then((players) => this.players = players);
        })
    });

    eventBus.$on("put-in-jail", () => {
      this.players[this.currentPlayerIndex].position = 9;
      this.players[this.currentPlayerIndex].isInJail = true;

      PlayerService.updatePlayer(this.players[this.currentPlayerIndex])
        .then(() => {
          PlayerService.getPlayers()
            .then((players) => this.players = players);
        })
    });

  }
};
</script>

<style>
.board-wrapper {
  text-align: center;
  display: grid;
  grid-template-columns: 250px 1280px 250px;
  grid-template-rows: 640px 640px;
  width: 1780px;
  margin: auto;
}

.player {
  border: 1px solid black; 
  text-align: left;
  font-size: 20px;
}

.player1 {
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 20px;
  margin-right: 20px;
}

.player2 {
  grid-column: 3;
  grid-row: 1;
  margin-bottom: 20px;
  margin-left: 20px;
}

.player3 {
  grid-column: 1;
  grid-row: 2;
  margin-right: 20px;
}

.player4 {
  grid-column: 3;
  grid-row: 2;
  margin-left: 20px;
}


.board {
  display: grid;
  grid-template-columns: 160px repeat(8, 120px) 160px;
  grid-template-rows: 160px repeat(8, 120px) 160px;
  background: black;
  border: 1px solid black;
  width: 1280px;
  margin: auto;
  grid-column: 2/3;
  grid-row: 1/3;
}

.cell {
    height: 157.5px;
    width: 117.5px;
}

.row {
  display: grid;
  grid-template-columns: repeat(8, 120px);
}

.column {
  display: grid;
  grid-template-rows: repeat(8, 120px);
}

.top-left-corner {
  grid-column: 1;
  grid-row: 1;
}

.top-row {
  grid-column: 2/10;
  grid-row: 1;
}

.top-right-corner {
  grid-column: 10;
  grid-row: 1;
}

.left-column {
  grid-column: 1;
  grid-row: 2/10;
}

.center {
  grid-column: 2/10;
  grid-row: 2/10;
  background: white;
  border: 1px solid black;
}

.right-column {
  grid-column: 10;
  grid-row: 2/10;
}

.bottom-right-corner {
  grid-column: 10;
  grid-row: 10;
}

.bottom-row {
  grid-column: 2/10;
  grid-row: 10;
}

.bottom-left-corner {
  grid-column: 1;
  grid-row: 10;
}

.property-container {
    background: white;
    border: 1px solid black;
}

.left-property {
    transform: translate(16.5%, -12.5%) rotate(90deg);
}

.right-property {
    transform: translate(16.5%, -12.5%) rotate(-90deg);
}

.corner {
    background: white;
    border: 1px solid black;
}
</style>