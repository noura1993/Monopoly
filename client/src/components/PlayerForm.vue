<template lang="html">
<form v-on:submit.prevent="startGame">
  <div class="form-wrapper">
  <div id="header">
    <img src="../assets/uncleJack.png" width="600" height="250" text-align: center/>
  </div>
  <br>
  Choose number of players:
  <select class="box" name="number-of-players" v-model="numOfPlayers" v-on:change="clearForm">
    <option value="2">2 players</option>
    <option value="3">3 players</option>
    <option value="4">4 players</option>
  </select>
  <br>
  <br>
  <div class="players-container">
    <div class="top-players">
      <div class="player1">
        <label for="name">Player 1:</label>
        <input type="text" placeholder="Enter your name.." v-model="name1">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour1">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
      </div>
      <div class="player2">
        <label for="name">Player 2:</label>
        <input type="text" id="name" placeholder="Enter your name.." v-model="name2">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour2">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
      </div>
    </div>
    <div class="bottom-players" v-if="this.numOfPlayers === '3' || this.numOfPlayers === '4'">
         <div class="player3">
        <label for="name">Player 3:</label>
        <input type="text" id="name" placeholder="Enter your name.." v-model="name3">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour3">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
      </div>
      <div class="player4" v-if="this.numOfPlayers === '4'">
        <label for="name">Player 4:</label>
        <input type="text" id="name" placeholder="Enter your name.." v-model="name4">
        <br>
      <select class="box" name="colour-field" id="colour" v-model="colour4">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
      </div>
    </div>
  </div>
    <input class="start-game" type="submit" value="Start Game" v-on:click="startGame"/>
    <button class="start-game" value="Continue Game" v-on:click="continueGame">Continue Game </button>
    <br>
    <a href="https://en.wikibooks.org/wiki/Monopoly/Official_Rules#:~:text=Each%20player%20is%20given%20%241%2C500,personal%20funds%20from%20the%20bank." class="myButton2">Rules</a></p>
    </div>
  </form>
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
        position: 0
      }).then(addedPlayer => {
        if (!addedPlayer) {
          alert("Try again, nerd.");
        }
      });
    },
    startGame() {
      PlayerService.deletePlayers()
      .then(() => {
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
.top-players {
  display: flex;
}

.bottom-players {
  display: flex;
}

/* .h1 {
  font-family: sans-serif;
  color: #c62d1f;
  font-size: 24px;
}

.box {
  -webkit-box-shadow: 31px 28px 59px -17px rgba(0, 0, 0, 0.89);
  -moz-box-shadow: 31px 28px 59px -17px rgba(0, 0, 0, 0.89);
  box-shadow: 31px 28px 59px -17px rgba(0, 0, 0, 0.89);
}

.myButton {
  box-shadow: 3px 4px 0px 0px #8a2a21;
  background: linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
  background-color: #c62d1f;
  border-radius: 18px;
  border: 1px solid #d02718;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 24px;
  padding: 7px 25px;
  margin: 10px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #810e05;
}
.myButton:hover {
  background: linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
  background-color: #f24437;
}
.myButton:active {
  position: relative;
  top: 1px;
} */
</style>