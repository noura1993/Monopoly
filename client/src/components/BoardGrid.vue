<template>
  <div class="board-wrapper">
    <roll-dice v-if="showRollDice"/>
    <turn-handler :properties="properties" :players="players" :currentPlayerIndex="currentPlayerIndex" v-if="showTurnHandler"/>
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
        
    <div class="corner top-left-corner">
      <div class="corner-container">Free Parking</div>
    </div>
    <div class="row top-row">
      <div class="cell top-property property-container" v-for="property in topProperties" :key="property.name">
          <property-info :property="property"/>
      </div>
    </div>
    <div class="corner top-right-corner">
      <div class="corner-container">Go To Jail</div>
    </div>
    <div class="column left-column">
        <div class="cell left-property property-container" v-for="property in leftProperties" :key="property.name">
        <property-info :property="property"/>
      </div>
    </div>
    <div class="center"></div>
    <div class="column right-column">
        <div class="cell right-property property-container" v-for="property in rightProperties" :key="property.name">
        <property-info :property="property"/>
      </div>
    </div>
    <div class="corner bottom-right-corner">
      <div class="corner-container">Go</div>
    </div>
    <div class="row bottom-row">
       <div class="cell bottom-property property-container" v-for="property in bottomProperties" :key="property.name">
        <property-info :property="property"/>
      </div>
    </div>
    <div class="corner bottom-left-corner">
      <div class="corner-container">In Jail/Just Visiting</div>
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
      topProperties: [],
      leftProperties: [],
      rightProperties: [],
      bottomProperties: [],
      showRollDice: false,
      showTurnHandler: true,
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
        this.topProperties = properties.splice(0, 8);
        this.leftProperties = properties.splice(0, 8);
        this.rightProperties = properties.splice(0, 8);
        this.bottomProperties = properties.splice(0, 8);
      });
    PlayerService.getPlayers()
    .then(result => {
      this.players = result;
    })
    eventBus.$on('next-player', () => {
      this.currentPlayerIndex += 1;
      if(this.currentPlayerIndex === this.players.length) {
        this.currentPlayerIndex = 0;
      }
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