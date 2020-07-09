<template>
  <div class="roll-dice-container">
    <h3 v-if="players[currentPlayerIndex]"> Player: {{players[currentPlayerIndex].name}} </h3>
    <hr>
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
            const rollDice1 = Math.floor(Math.random() * 6) + 1;
            const rollDice2 = Math.floor(Math.random() * 6) + 1;
            eventBus.$emit("roll-dice", [rollDice1, rollDice2]);
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

.dice-btn {
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

.dice-btn:hover {
  background-color: rgb(109, 192, 157);
  cursor: pointer;
  background: linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
	background-color: #f24437;
}

.dice-btn:disabled {
   color:white;
   background: linear-gradient(to bottom, grey 5%, #c62d1f 100%);
   background-color:gray;
}

.dice-btn:active {
	position: relative;
	top: 1px;
}

.dice-btn:focus {
  outline: none;
}

.hr {
  border: 1px solid black;
}
</style>