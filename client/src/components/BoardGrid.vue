<template>
  <div class="board-wrapper">
    <!-- <roll-dice/> -->
    <!-- <turn-handler/> -->
      <div class="board">
        
    <div class="corner top-left-corner">
      <div class="corner-container">Free Parking</div>
    </div>
    <div class="row top-row">
      <div class="cell top-property property-container" v-for="(property, index) in top_properties" :key="index">
          <div class="property-color" v-bind:style="{'background-color': 'red' }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: {{property.value}}</div>
      </div>
    </div>
    <div class="corner top-right-corner">
      <div class="corner-container">Go To Jail</div>
    </div>
    <div class="column left-column">
        <div class="cell left-property property-container" v-for="(property, index) in left_properties" :key="index">
          <div class="property-color" v-bind:style="{'background-color': 'yellow' }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: {{property.value}}</div>
      </div>
    </div>
    <div class="center"></div>
    <div class="column right-column">
        <div class="cell right-property property-container" v-for="(property, index) in right_properties" :key="index">
          <div class="property-color" v-bind:style="{'background-color': 'green' }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: {{property.value}}</div>
      </div>
    </div>
    <div class="corner bottom-right-corner">
      <div class="corner-container">Go</div>
    </div>
    <div class="row bottom-row">
       <div class="cell bottom-property property-container" v-for="(property, index) in bottom_properties" :key="index">
          <div class="property-color" v-bind:style="{'background-color': 'blue' }"></div>
          <div class="property-name">{{property.name}}</div>
          <div class="property-price">Price: {{property.value}}</div>
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
  components: {
    "roll-dice": RollDice,
    "turn-handler": TurnHandler
  },
  data() {
    return {
      top_properties: [],
      left_properties: [],
      right_properties: [],
      bottom_properties: []
    }
  },
  mounted() {
    PlayerService.getProperties()
      .then((properties) => {
        this.top_properties = properties.splice(0, 8);
        this.left_properties = properties.splice(0, 8);
        this.right_properties = properties.splice(0, 8);
        this.bottom_properties = properties.splice(0, 8);
      })
  }
};
</script>

<style>
.board-wrapper {
    text-align: center;
}

.board {
  display: grid;
  grid-template-columns: 160px repeat(8, 120px) 160px;
  grid-template-rows: 160px repeat(8, 120px) 160px;
  background: black;
  border: 1px solid black;
  width: 1280px;
  margin: auto;
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