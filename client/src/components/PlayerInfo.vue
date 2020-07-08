<template>
  <div class="player-info">
    <div v-bind:style="{'background-color': player.colour }">{{player.name}}</div>
      <div>Colour: {{player.colour}}</div>
      <div>Balance: {{player.wallet}}</div>
      <div>
        <p>Owned Properties:</p>
      <ul>
        <li :player="player" v-for="property in player.properties" :key="property._id">{{property.name}} <a v-if="!dropdownCondition" v-on:click="handleSell(property, player)" href="#">Sell</a></li>
        <form v-if="dropdownCondition" v-on:submit.prevent="handleSubmit">
        <select v-model="playerToSellTo">
          <option selected="true" disabled="disabled">Selling {{propertyBeingSold.name}}</option> 
          <option v-if="otherPlayer !== player" v-for="(otherPlayer, index) in players" :value="otherPlayer" :key="index">{{otherPlayer.name}}</option>
        </select>
        <input type="number" v-model.number="sellValue" placeholder="Sell value...">
        <button type="submit">Sell {{propertyBeingSold.name}}</button>
        <div>
        <a v-on:click="handleCancel" href="#">Cancel</a>
        </div>
        </form>
      </ul>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main.js'

export default {
    name: 'player-info',
    props: ['players', 'player'],
    data() {
      return {
        dropdownCondition: false,
        sellValue: null,
        playerToSellTo: null,
        propertyBeingSold: null,
        playerSelling: null
      }
    },
    methods: {
      handleSell: function(property, player) {
        this.dropdownCondition = true;
        this.propertyBeingSold = property;
        this.playerSelling = player;
      },

      handleSubmit: function () {
        eventBus.$emit('player-sells-property', {
          'playerSelling': this.playerSelling,
          'playerToSellTo': this.playerToSellTo,
          'propertyBeingSold': this.propertyBeingSold,
          'sellValue': this.sellValue
        })
        alert(`${this.playerSelling.name}: You've sold ${this.propertyBeingSold.name} to ${this.playerToSellTo.name}.`)
        this.dropdownCondition = false;
      },

      handleCancel: function () {
        this.dropdownCondition = false;
      }
    }
}
</script>

<style>


</style>