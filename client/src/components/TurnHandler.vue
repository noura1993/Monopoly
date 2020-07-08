<template>
  <div>
    <div class="turn-handler-container">
      <h2>Player: {{players[currentPlayerIndex].name}}</h2>
      <hr class="turn-handler-hr" />
      <h3>Dice Result: {{diceValue}}</h3>
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
  props: ["properties", "players", "currentPlayerIndex", "diceValue"],
  data() {
    return {
      rollDiceValue: 0
    };
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
}

.turn-handler-btn:hover {
  background-color: rgb(109, 192, 157);
  cursor: pointer;
}

.turn-handler-btn:focus {
  outline: none;
}

.turn-handler-hr {
  border: 1px solid black;
}
</style>