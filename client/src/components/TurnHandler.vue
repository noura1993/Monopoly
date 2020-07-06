<template>
<div>
  <div class="turn-handler-container">
      <h2 >Turn: {{players[currentPlayerIndex].name}}</h2>
      <hr class="turn-handler-hr">
      <h3>Dice Result: {{diceValue}}</h3>
      <h3>Current Position: {{ properties[players[currentPlayerIndex].position].name }}</h3>
      <button v-on:click="handleBuy" class="turn-handler-btn">Buy</button>
      <button v-on:click="handleRent" class="turn-handler-btn">Pay Rent</button>
      <button v-on:click="handleEndTurn" class="turn-handler-btn">End Turn</button>
      <button v-on:click="handleBankruptcy" class="turn-handler-btn">Declare Bankruptcy</button>
  </div>
</div>
</template>

<script>
import {eventBus} from '../main.js'
import PlayerService from '../services/PlayerService'

export default {
    name: 'turn-handler',
    props: ['properties', 'players', 'currentPlayerIndex'],
    data() {
        return {
            // diceValue: null
        }
    },
    computed: {
        diceValue: function () {
            eventBus.$on('roll-dice', (rollDiceValue) => {
            return rollDiceValue; 
            })
        }
    },
    methods: {
        handleBuy: function () {
            eventBus.$emit("buy-property");
        },
        handleRent: function () {

        },
        handleDiceRoll: function () {
            eventBus.$emit("roll-dice");
        },
        handleEndTurn: function () {
            eventBus.$emit("next-player");
        },
        handleBankruptcy: function () {
            eventBus.$emit("player-bankruptcy")
        }
    }

}
</script>

<style>
.turn-handler-container {
    position: absolute;
    left: 50%;
    transform:translate(-50%, -50%);
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