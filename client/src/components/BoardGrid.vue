<template>
  <div class="board-wrapper">
    <!-- <roll-dice/> -->
    <turn-handler/>
    <div class="player player1">
      <div v-bind:style="{'background-color': this.players[0].colour }">Player1</div>
      <!-- <hr> -->
      <div>Name: {{this.players[0].name}}</div>
      <div>Colour: {{this.players[0].colour}}</div>
      <div>Balance: {{this.players[0].wallet}}</div>
      <div>Owned Properties: {{this.players[0].properties}}</div>
    </div>
    <div class="player player2">
      <div v-bind:style="{'background-color': this.players[1].colour }">Player2</div>
      <div>Name: {{this.players[1].name}}</div>
      <div>Colour: {{this.players[1].colour}}</div>
      <div>Balance: {{this.players[1].wallet}}</div>
      <div>Owned Properties: {{this.players[1].properties}}</div>
    </div>
     <div class="player player3">
      <div v-bind:style="{'background-color': this.players[2].colour }">Player3</div>
      <div>Name: {{this.players[2].name}}</div>
      <div>Colour: {{this.players[2].colour}}</div>
      <div>Balance: {{this.players[2].wallet}}</div>
      <div>Owned Properties: {{this.players[2].properties}}</div>
    </div>
    <div class="player player4">
      <div v-bind:style="{'background-color': this.players[3].colour }">Player4</div>
      <div>Name: {{this.players[3].name}}</div>
      <div>Colour: {{this.players[3].colour}}</div>
      <div>Balance: {{this.players[3].wallet}}</div>
      <div>Owned Properties: {{this.players[3].properties}}</div>
    </div>
      <div class="board">
        
    <div class="corner top-left-corner">
      <div class="corner-container">Free Parking</div>
    </div>
    <div class="row top-row">
      <div class="cell top-property property-container" v-for="property in top_properties" :key="property.name">
          <div class="property-color" v-bind:style="{'background-color': property.colour }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: £{{property.value}}</div>
      </div>
    </div>
    <div class="corner top-right-corner">
      <div class="corner-container">Go To Jail</div>
    </div>
    <div class="column left-column">
        <div class="cell left-property property-container" v-for="property in left_properties" :key="property.name">
          <div class="property-color" v-bind:style="{'background-color': property.colour }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: £{{property.value}}</div>
      </div>
    </div>
    <div class="center"></div>
    <div class="column right-column">
        <div class="cell right-property property-container" v-for="property in right_properties" :key="property.name">
          <div class="property-color" v-bind:style="{'background-color': property.colour }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: £{{property.value}}</div>
      </div>
    </div>
    <div class="corner bottom-right-corner">
      <div class="corner-container">Go</div>
    </div>
    <div class="row bottom-row">
       <div class="cell bottom-property property-container" v-for="property in bottom_properties" :key="property.name">
          <div class="property-color" v-bind:style="{'background-color': property.colour }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: £{{property.value}}</div>
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

export default {
  name: "board-grid",
  data() {
    return {
      players: [],
      top_properties: [],
      left_properties: [],
      right_properties: [],
      bottom_properties: []
    }
  },
  components: {
    "roll-dice": RollDice,
    "turn-handler": TurnHandler
  },
  beforeCreate() {
    PlayerService.getProperties()
      .then((properties) => {
        this.top_properties = properties.splice(0, 8);
        this.left_properties = properties.splice(0, 8);
        this.right_properties = properties.splice(0, 8);
        this.bottom_properties = properties.splice(0, 8);
      });
    PlayerService.getPlayers()
    .then(result => {
      this.players = result;
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

.property-color {
    height: 15%;
}

.property-name {
    padding-top: 10%;
    margin: auto;
    height: 80px;
    width: 80px;
}

.property-price {
    padding-bottom: 10%;
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