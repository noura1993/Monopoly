<template>
  <div class="player-info">
    <h3 :class="colourClass">Player Name: {{ player.name }}</h3>
        <p>Cash: £{{ player.wallet }}</p>
        <p>Colour: £{{ player.colour }}</p>
    <button v-on:click="deletePlayer">Delete This Player</button>
  </div>
  
</template>

<script>

import { eventBus } from '@/main';
import PlayerService from '@/services/PlayerService';

export default {
    name: 'player-info',
    props: ['players'],
    computed: {
    colourClass() {
      return this.player.colour ? 'red' : 'green';
      }
    },
    methods: {
        deletePlayer: function() {
            eventBus.$emit('delete-player', this.player._id);
        }
    }
}
</script>

<style lang="css" scoped>
.player-info {
  box-sizing: border-box;
  width: 32%;
  background: lightblue;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.red {
  color: red;
}

.green {
  color: green;
}

button{
  background: white;
  border-radius: 0;
  border: none;
  font-size: 12px;
  color: #333;
  padding: 5px 10px;
  display: block;
  margin-top: 20px;
  cursor: pointer;
}

h3 {
  margin-top: 0;
}

</style>