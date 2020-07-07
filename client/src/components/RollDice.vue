<template>
  <div class="roll-dice-container">
    <button class="dice-btn" v-on:click="rollDice" :disabled="isRollDiceDisabled" >Roll Dice</button>
    <button class="dice-btn" v-on:click="payFine" :disabled="isPayFineDisabled" >Pay Fine</button>
    <button class="dice-btn" v-on:click="declareBankruptcy">Declare Bankruptcy</button>
  </div>
</template>

<script>
import {eventBus} from '../main.js';

export default {
    name: 'roll-dice',
    props: ["players", "currentPlayerIndex"],
    methods: {
        rollDice: function() {
            const rollDiceValue = Math.floor(Math.random() * 11) + 2;
            eventBus.$emit("roll-dice", rollDiceValue);
        },
        declareBankruptcy: function () {
            eventBus.$emit("player-bankruptcy");
        },
        payFine: function() {
            eventBus.$emit("pay-fine");
        }
    },
    computed: {
       isRollDiceDisabled: function() {
           return this.players[this.currentPlayerIndex] && this.players[this.currentPlayerIndex].isInJail === true;
       },
       isPayFineDisabled: function() {
           return this.players[this.currentPlayerIndex] && this.players[this.currentPlayerIndex].isInJail === false;
       }
    }
}
</script>

<style>
.roll-dice-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  border: 1px solid black;
  padding: 1%;
}

.dice-btn {
  font-size: 20px;
  border-radius: 35px;
}

.dice-btn:hover {
  background-color: rgb(109, 192, 157);
  cursor: pointer;
}

.dice-btn:focus {
  outline: none;
}
</style>