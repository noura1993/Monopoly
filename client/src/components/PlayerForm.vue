<template lang="html">
<form v-on:submit.prevent="handleSubmit">
  <div id="header">
    <img src="../assets/uncleJack.png" width="600" height="250" text-align: center/>
  </div>
    <h1>Add a player</h1>
    <label for="name">Player Name:</label>
    <input class="box" type="text" id="name" v-model="name" />

    <label for="colour">Colour:</label>
    <select class="box" name="colour-field" id="colour" v-model="colour">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
    </select>

    <input class="myButton" type="submit" name="submit" value="Save" />
    <button class="myButton" value="Play" v-on:click="startGame">Play</button>
    <a href="https://en.wikibooks.org/wiki/Monopoly/Official_Rules#:~:text=Each%20player%20is%20given%20%241%2C500,personal%20funds%20from%20the%20bank." class="myButton2">Rules</a></p>
  </form>
</template>

<script>
import PlayerService from "../services/PlayerService";
import { eventBus } from '@/main';

export default {
  name: 'player-form',
  data() {
    return {
      name: "",
      colour: "",
      wallet: 1500,
      properties: [],
      position: 0,
      // isTurn: false
    };
  },
  methods: {
    handleSubmit() {
      PlayerService.addPlayer(this.$data)
        .then((addedPlayer) => {
          if (!addedPlayer) {
            alert('Try again, nerd.');
          }
        });
      this.name = '';
      this.colour = '';
    },
    startGame() {
      eventBus.$emit("start-game");
      // eventBus.$emit("assign-first-player");
    }
  }
};
</script>

<style lang="css" scoped>
.h1 {
  font-family: sans-serif;
  color: #c62d1f;
  font-size: 24px;
}


.box {
  -webkit-box-shadow: 31px 28px 59px -17px rgba(0,0,0,0.89);
  -moz-box-shadow: 31px 28px 59px -17px rgba(0,0,0,0.89);
  box-shadow: 31px 28px 59px -17px rgba(0,0,0,0.89);
}

.myButton {
	box-shadow: 3px 4px 0px 0px #8a2a21;
	background:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
	background-color:#c62d1f;
	border-radius:18px;
	border:1px solid #d02718;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:24px;
	padding:7px 25px;
  margin: 10px;
	text-decoration:none;
	text-shadow:0px 1px 0px #810e05;
}
.myButton:hover {
	background:linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
	background-color:#f24437;
}
.myButton:active {
	position:relative;
	top:1px; }

</style>