<template lang="html">
<div class="container">
<form v-on:submit.prevent="startGame">
   <div class="form-wrapper">
  <div id="header">
    <img src="../assets/uncleJack.png" width="600" height="250" text-align: center/>
  </div>
  <br>
  <label for="" >Choose number of players: </label>
  <select class="box" name="number-of-players" v-model="numOfPlayers" v-on:change="clearForm">
    <option value="2">2 players</option>
    <option value="3">3 players</option>
    <option value="4">4 players</option>
  </select>
  <br>
  <br>
  <br>
  <br>
  <div class="players-container">
    <div class="top-players">
      <div class="player1">
        <label for="name" size="100">Player 1: </label>
        <input type="text" placeholder="Enter your name.." v-model="name1">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour1">
        <option value="" disabled selected>Select a colour</option>
        <option value="#ff6699">Pink</option>
        <option value="#009999">Mint</option>
        <option value="#993366">Wine</option>
        <option value="#ff0000">Red</option>
      </select>
      </div>
      <div class="player2">
        <label for="name">Player 2: </label>
        <input type="text" id="name" placeholder="Enter your name.." v-model="name2">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour2">
        <option value="" disabled selected>Select a colour</option>
        <option value="#ff6699">Pink</option>
        <option value="#009999">Mint</option>
        <option value="#993366">Wine</option>
        <option value="#ff0000">Red</option>
      </select>
      </div>
      </div>
    <div class="bottom-players" v-if="this.numOfPlayers === '3' || this.numOfPlayers === '4'">
         <div class="player3">
        <label for="name">Player 3: </label>
        <input type="text" id="name" placeholder="Enter your name.." v-model="name3">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour3">
        <option value="" disabled selected>Select a colour</option>
        <option value="#ff6699">Pink</option>
        <option value="#009999">Mint</option>
        <option value="#993366">Wine</option>
        <option value="#ff0000">Red</option>
      </select>
      </div>
      <div class="player4" v-if="this.numOfPlayers === '4'">
        <label for="name">Player 4: </label>
        <input type="text" id="name" placeholder="Enter your name.." v-model="name4">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour4">
        <option value="" disabled selected>Select a colour</option>
        <option value="#ff6699">Pink</option>
        <option value="#009999">Mint</option>
        <option value="#993366">Wine</option>
        <option value="#ff0000">Red</option>
      </select>
      </div>
    </div>
    </div>
  <br>
  <br>
    <br>
    <input class="myButton" type="submit" value="Start Game"/>
  </div>
</form>
<br>
<button class="myButton" value="Continue Game" v-on:click="continueGame">Continue Game </button>
<br>
<br>
<a href="https://en.wikibooks.org/wiki/Monopoly/Official_Rules#:~:text=Each%20player%20is%20given%20%241%2C500,personal%20funds%20from%20the%20bank." class="myButton2">Rules</a></p>
</div>
</template>

<script>
import PlayerService from "../services/PlayerService";
import { eventBus } from "@/main";

export default {
  name: "player-form",
  data() {
    return {
      numOfPlayers: "2",
      name1: "",
      colour1: "",
      name2: "",
      colour2: "",
      name3: "",
      colour3: "",
      name4: "",
      colour4: ""
    };
  },
  methods: {
    savePlayer(name, colour) {
      PlayerService.addPlayer({
        name: name,
        colour: colour,
        wallet: 1500,
        properties: [],
        position: 0,
        isInJail: false,
        shouldPayRent: false
      }).then(addedPlayer => {
        if (!addedPlayer) {
          alert("Try again, nerd.");
        }
      });
    },
    startGame() {
      PlayerService.deletePlayers().then(() => {
        if (this.name1 != "" && this.colour1 != "") {
          this.savePlayer(this.name1, this.colour1);
        }
        if (this.name2 != "" && this.colour2 != "") {
          this.savePlayer(this.name2, this.colour2);
        }
        if (this.name3 != "" && this.colour3 != "") {
          this.savePlayer(this.name3, this.colour3);
        }
        if (this.name4 != "" && this.colour4 != "") {
          this.savePlayer(this.name4, this.colour4);
        }
        eventBus.$emit("start-game");
      });
    },
    continueGame() {
      eventBus.$emit("start-game");
    },
    clearForm() {
      this.name1 = "";
      this.name2 = "";
      this.name3 = "";
      this.name4 = "";
      this.colour1 = "";
      this.colour2 = "";
      this.colour3 = "";
      this.colour4 = "";
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  text-align: center;
}

.players-container {
  text-align: center;

}

.top-players {
  text-align: center;
}

.bottom-players {
  text-align: center;
}

.player1 {
  display: inline-block;
  text-align: center;
}
.player2 {
  display: inline-block;
  text-align: center;
}

.player3 {
  display: inline-block;
  text-align: center;
}

.player4 {
  display: inline-block;
  text-align: center;
}

.myButton {
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
.myButton:hover {
	background: linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
	background-color: #f24437;
}
.myButton:active {
	position: relative;
	top: 1px;
}

label {
  font-size: 25px;
}

a {
  color: white;
}

input[type=text] {
  width: 15em;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 20px;
  outline: none;
}

select {
  width: 10.3em;
  padding: 12px 20px;
  font-size: 20px;
  border: 1px solid #ccc;
  outline: none;
  color: rgb(121, 120, 120);
}



</style>



  
    
    
  