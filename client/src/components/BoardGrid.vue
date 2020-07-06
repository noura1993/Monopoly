<template>
  <div class="board-wrapper">
    <roll-dice v-if="shouldShowRollDice"/>
    <turn-handler :properties="allProperties" :players="players" :currentPlayerIndex="currentPlayerIndex" v-if="shouldShowTurnHandler"/>
    <div class="player player1">
      <player-info :player="this.players[0]"/>
    </div>
    <div class="player player2">
      <player-info :player="this.players[1]"/>
    </div>
     <div class="player player3">
      <player-info :player="this.players[2]"/>
    </div>
    <div class="player player4">
      <player-info :player="this.players[3]"/>
    </div>
      <div class="board">
        
      <div class="corner top-left-corner" v-for="index in freeParking" :key="index">
      <property-info :property="allProperties[index]"/>
      </div>

    <div class="row top-row">
      <div class="cell top-property property-container" v-for="index in topArray" :key="index">
          <property-info :property="allProperties[index]"/>
      </div>
    </div>

    <div class="corner bottom-right-corner" v-for="index in go" :key="index">
      <property-info :property="allProperties[index]"/>
      </div>


        <div class="corner top-right-corner" v-for="index in goToJail" :key="index">
          <property-info :property="allProperties[index]"/>
      </div>

          <div class="corner bottom-left-corner" v-for="index in jail" :key="index">
          <property-info :property="allProperties[index]"/>
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
      currentPlayerIndex: 0
    }
  },
  components: {
    "roll-dice": RollDice,
    "turn-handler": TurnHandler,
    "player-info": PlayerInfo,
    "property-info":PropertyInfo
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
      let exitCondition = null;

      if (this.players[this.currentPlayerIndex].wallet < property.value) {
        alert(`${this.players[this.currentPlayerIndex].name}: You don't have enough funds for ${property.name}`);
        return;
      }

      this.players[this.currentPlayerIndex].properties.forEach((ownedProperty) => {
        if (ownedProperty._id === property._id) {
          alert(`${this.players[this.currentPlayerIndex].name}: You already have ${property.name} purchased.`);
          exitCondition = true;
        }
      })
      if (exitCondition) { return; }

      this.players.forEach((player) => {
        player.properties.forEach((playerProperty) => {
          if (playerProperty._id === property._id) {
            alert(`${this.players[this.currentPlayerIndex].name}: Sorry, this is already owned by ${player.name}`)
            exitCondition = true;
          }
        })
      })
      if (exitCondition) { return; }

      this.players[this.currentPlayerIndex].properties.push(property);
      this.players[this.currentPlayerIndex].wallet -= property.value;

      PlayerService.updatePlayer(this.players[this.currentPlayerIndex])
        .then(() => {
          PlayerService.getPlayers()
            .then((players) => this.players = players)
        })
    });
    
    eventBus.$on("roll-dice", (rollDiceValue) => {
      this.shouldShowRollDice = false;
      this.shouldShowTurnHandler = true;
      this.players[this.currentPlayerIndex].position += rollDiceValue;
      this.players[this.currentPlayerIndex].position = this.players[this.currentPlayerIndex].position % 36;
    })
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