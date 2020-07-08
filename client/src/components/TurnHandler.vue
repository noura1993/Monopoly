<template>
  <div>
    <div class="turn-handler-container">
      <h2>Player: {{players[currentPlayerIndex].name}}</h2>
      <hr>
      <div class="show-dice-container">
        <div class="show-dice" :style="[{'background-image': 'url(' + require('../assets/' + this.dices[diceValues[0]-1]) + ') '}]"></div>
        <div class="show-dice" :style="[ {'background-image': 'url(' + require('../assets/' + this.dices[diceValues[1]-1]) + ') '}]"></div>
      </div>
      <h3>Current Position: {{ properties[players[currentPlayerIndex].position].name }}</h3>
      <button class="turn-handler-btn" v-on:click="handleBuy" :disabled="isBuyDisabled">Buy</button>
      <button class="turn-handler-btn" v-on:click="handleRent" :disabled="isPayRentDisabled">Pay Rent</button>
      <button class="turn-handler-btn" v-on:click="handleEndTurn" :disabled="isEndTurnDisabled">End Turn</button>
      <button class="turn-handler-btn" v-on:click="handleBankruptcy">Declare Bankruptcy</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import PlayerService from "../services/PlayerService";

export default {
  name: "turn-handler",
  props: ["properties", "players", "currentPlayerIndex", "diceValues"],
  data() {
    return {
      dices: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"]
    }
  },
  methods: {
    handleBuy: function() {
      eventBus.$emit("buy-property");
    },
    handleRent: function() {
      eventBus.$emit("pay-rent");
    },
    handleEndTurn: function() {
      eventBus.$emit("next-player");
    },
    handleBankruptcy: function() {
      eventBus.$emit("player-bankruptcy");
    },
    getBuyDisabled() {
        if (this.players[this.currentPlayerIndex]) {
        const propertyIndex = this.players[this.currentPlayerIndex].position;
        const propertyId = this.properties[propertyIndex]._id;
        let propertyAlreadyOwned = false;
        this.players.forEach(player => {
          player.properties.forEach(property => {
            if (property._id === propertyId) {
              propertyAlreadyOwned = true;
            }
          });
        });

        // Can not buy corner squares
        if (propertyIndex === 0 || propertyIndex === 9 || propertyIndex === 18 || propertyIndex === 27 || propertyIndex === 10
        || propertyIndex === 35 || propertyIndex === 31 || propertyIndex === 26 || propertyIndex === 33) {
            return true;
        }

        return propertyAlreadyOwned;
      }
    },
    getPayRentDisabled() {
        return this.players[this.currentPlayerIndex] && this.players[this.currentPlayerIndex].shouldPayRent === false;
    }
  },
  mounted() {
    if (this.players[this.currentPlayerIndex].position === 27) {
      alert("Uhmmm ... kind of bad news?? You are going to jail!");
      eventBus.$emit("put-in-jail");
    }

    if(this.players[this.currentPlayerIndex].position === 31) {
      alert("Oooft, bad luck. Pay £200 for Luxury Tax.")
      eventBus.$emit("tax")
    };

    if(this.players[this.currentPlayerIndex].position === 10) {
      eventBus.$emit("wisdom")
    };

    if(this.players[this.currentPlayerIndex].position === 35) {
      eventBus.$emit("wisdom2")
    };

    if(this.players[this.currentPlayerIndex].position === 26) {
      alert("Congratulation, you won £50 in a beauty contest");
      eventBus.$emit("chest1")
    }
    if(this.players[this.currentPlayerIndex].position === 33) {
      alert("You've been caught speeding, pay £50 fine");
      eventBus.$emit("chest2")
    }
  },
  computed: {
    isBuyDisabled: function() {
        return this.getBuyDisabled();
    },
    isPayRentDisabled: function() {
        return this.getPayRentDisabled();
    },
    isEndTurnDisabled: function() {
        return !this.getBuyDisabled() || !this.getPayRentDisabled();
    }
  }
};
</script>

<style>
.turn-handler-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  border: 1px solid black;
  padding: 1%;
}

.turn-handler-btn {
  font-size: 20px;
  border-radius: 35px;
  margin-top: 1.5%;
  margin-left: 10px;
  padding-left: 3%;
  padding-right: 3%;
  box-shadow: 3px 4px 0px 0px #8a2a21;
	background: linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
	background-color:#c62d1f;
	border-radius: 18px;
	border: 1px solid #d02718;
	display: inline-block;
	cursor: pointer;
	color:#ffffff;
	font-family: Arial;
	font-size: 20px;
	padding: 7px 25px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #810e05;
  outline: none;
}

.turn-handler-btn:hover {
  background-color: rgb(109, 192, 157);
  cursor: pointer;
  background: linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
	background-color: #f24437;
}

.turn-handler-btn:disabled {
   color:white;
   background: linear-gradient(to bottom, grey 5%, #c62d1f 100%);
   background-color:gray;
}

.turn-handler-btn:active {
	position: relative;
	top: 1px;
}

.turn-handler-btn:focus {
  outline: none;
}

.show-dice-container {
  width: 100%;
  height: 100%;
  text-align: center;
}

.show-dice {
  display: inline-block;
  width: 20%;
  height: 150px;
  background-repeat: no-repeat;  
  background-position: center;
}

</style>