<template lang="html">
<form v-on:submit.prevent="handleSubmit">
    <h1>Add a player</h1>
    <label for="name">Player Name:</label>
    <input type="text" id="name" v-model="name" />

    <label for="colour">Colour:</label>
    <select name="colour-field" id="colour" v-model="colour">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
    </select>

    <input type="submit" name="submit" value="Save" />
    <button value="Play" v-on:click="startGame">Play</button>
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
      position: 0
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
      eventBus.$emit("start-game")
    }
  }
};
</script>

<style lang="css" scoped>
form {
  font-size: 16px;
}

input[type="text"],
input[type="colour"] {
  padding: 7px;
  margin: 0 10px;
}

input[type="submit"] {
  background: lightblue;
  border-radius: 0;
  border: none;
  font-size: 16px;
  color: #333;
  padding: 5px 10px;
  display: block;
  margin-top: 20px;
  cursor: pointer;
}

</style>