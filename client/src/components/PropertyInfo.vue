<template>
  <div class="property-info" :id="position" v-if="property">
    <div class="property-color" v-bind:style="{'background-color': property.colour }"></div>
      <div class="property-name">{{property.name}}</div>
      <div class="players-here">
        <div class="player-here" v-bind:style="{'background-color': firstPlayerColour }"></div>
        <div class="player-here" v-bind:style="{'background-color': secondPlayerColour }"></div>
        <div class="player-here" v-bind:style="{'background-color': thirdPlayerColour }"></div>
        <div class="player-here" v-bind:style="{'background-color': fourthPlayerColour }"></div>
      </div>
      <div v-if="property.value > 0" class="property-price" >Price: £{{property.value}}</div>
  </div>
</template>

<script>
export default {
    name: 'property-info',
    props: ['position', 'property', 'players'],
    computed: {
      firstPlayerColour: function() {
        if(this.players[0] && this.players[0].position === this.position) {
          return this.players[0].colour;
        }
        return "white";
      },
      secondPlayerColour: function() {
        if(this.players[1] && this.players[1].position === this.position) {
          return this.players[1].colour;
        }
        return "white";
      },
      thirdPlayerColour: function() {
        if(this.players[2] && this.players[2].position === this.position) {
          return this.players[2].colour;
        }
        return "white";
      },
      fourthPlayerColour: function() {
        if(this.players[3] && this.players[3].position === this.position) {
          return this.players[3].colour;
        }
        return "white";
      }
    }
}
</script>

<style>

.player-here {
  display: inline-block;
  height: 50%;
  width: 10%;
  margin-right: 5px;
}

.property-info {
  height: 100%;
}

.property-color {
    height: 15%;
}

.property-name {
    padding-top: 10%;
    margin: auto;
    height: 60px;
    width: 80px;
}

.players-here {
  height: 20%;
}

.property-price {
    padding-bottom: 10%;
}

</style>