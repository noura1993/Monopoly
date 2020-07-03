<template lang="html">
<form v-on:submit.prevent="handleSubmit">
    <h1>Add a player</h1>
    <label for="name">Player Name:</label>
    <input type="text" id="name" name="name" v-model="name" required/>

    <label for="colour">Colour:</label>
    <input type="text" id="colour" name="colour" v-model="colour" required/>

    <input type="submit" name="submit" value="Save" />
  </form>
</template>

<script>

import { eventBus } from '@/main';

export default {
  name: 'player-form',
  data() {
    return {
      name: '',
      colour: '',
      wallet: 1500,
      position: 0,
      dice: null
    };
  },
  methods: {
    handleSubmit() {
      eventBus.$emit('submit-player', this.$data);
      this.name = this.colour = '';
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