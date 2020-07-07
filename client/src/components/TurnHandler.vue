<template>
<div>
  <div class="turn-handler-container">
      <h2 >Turn: {{players[currentPlayerIndex].name}}</h2>
      <hr class="turn-handler-hr">
      <h3>Dice Result: {{diceValue}}</h3>
      <h3>Current Position: {{ properties[players[currentPlayerIndex].position].name }}</h3>
      <button :disabled="disableBuy" v-on:click="handleBuy" class="turn-handler-btn">Buy</button>
      <button :disabled="disableRent" v-on:click="handleRent" class="turn-handler-btn">Pay Rent</button>
      <button :disabled="disableEndTurn" v-on:click="handleEndTurn" class="turn-handler-btn">End Turn</button>
      <button v-on:click="handleBankruptcy" class="turn-handler-btn">Declare Bankruptcy</button>
  </div>
</div>
</template>

<script>
import {eventBus} from '../main.js'
import PlayerService from '../services/PlayerService'

export default {
    name: 'turn-handler',
    props: ['properties', 'players', 'currentPlayerIndex', 'diceValue'],
    data() {
        return {
            rollDiceValue: 0,
            disableBuy: null,
            disableRent: null,
            disableEndTurn: null
        }
    },
    methods: {
        handleBuy: function () {
            this.players.forEach((player) => {
                player.properties.forEach((playerProperty) => {
                    if (playerProperty._id === this.properties[this.players[this.currentPlayerIndex].position]._id) {
                        this.disableBuy = true
                        this.disableEndTurn = true;
                    }
                })
            })
            this.players[this.currentPlayerIndex].properties.forEach((playerProperty) => {
                if (playerProperty._id === this.properties[this.players[this.currentPlayerIndex].position]._id) {
                        this.disableBuy = true;
                        this.disableEndTurn = false;
                    }
            })
            eventBus.$emit("buy-property");
        },
        handleRent: function () {
            this.disableEndTurn = false;
            eventBus.$emit("pay-rent");
        },
        handleEndTurn: function () {
            eventBus.$emit("next-player");
        },
        handleBankruptcy: function () {
            eventBus.$emit("player-bankruptcy");
        }
    },
    mounted() {
        if(this.players[this.currentPlayerIndex].position === 27) {
            alert("Uhmmm ... kind of bad news?? You are going to jail!")
            eventBus.$emit("put-in-jail")
        }
        this.disableBuy = false;
        this.disableRent = false;
        this.disableEndTurn = false;
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