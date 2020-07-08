<template>
  <div class="corner-players-here">
    <img :src="require('../assets/' + img)" width="140" height="130" />
    <div class="corner-player-here" v-bind:style="{'background-color': firstPlayerColour }"></div>
    <div class="corner-player-here" v-bind:style="{'background-color': secondPlayerColour }"></div>
    <div class="corner-player-here" v-bind:style="{'background-color': thirdPlayerColour }"></div>
    <div class="corner-player-here" v-bind:style="{'background-color': fourthPlayerColour }"></div>
  </div>
</template>

<script>
export default {
  name: "corner-square",
  props: ["position", "players", "img"],
  computed: {
    firstPlayerColour: function() {
      if (this.players[0] && this.players[0].position === this.position) {
        return this.players[0].colour;
      }
      return "white";
    },
    secondPlayerColour: function() {
      if (this.players[1] && this.players[1].position === this.position) {
        return this.players[1].colour;
      }
      return "white";
    },
    thirdPlayerColour: function() {
      if (this.players[2] && this.players[2].position === this.position) {
        return this.players[2].colour;
      }
      return "white";
    },
    fourthPlayerColour: function() {
      if (this.players[3] && this.players[3].position === this.position) {
        return this.players[3].colour;
      }
      return "white";
    }
  }
};
</script>

<style>

.corner-players-here {
    height: 100%;
    width: 100%;
}

.corner-player-here {
  display: inline-block;
  height: 10%;
  width: 10%;
  margin-right: 5px;
}
</style>