<template>
  <div class="player-info">
    <div class="player-color" v-bind:style="{'background-color': player.colour }">{{player.name}}</div>
    <br>
    <div class="player-details">
      <div>Balance: £{{player.wallet}}</div>
      <div>
        <p>Owned Properties:</p>
        <ul>
          <li :player="player" v-for="property in player.properties" :key="property._id">{{property.name}} <a v-if="!dropdownCondition" v-on:click="handleSell(property, player)" href="#">Sell</a></li>
          <form v-if="dropdownCondition" v-on:submit.prevent="handleSubmit">
            <select v-model="playerToSellTo">
              <option selected="true" disabled="disabled">Sell to...</option> 
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
        if (this.playerToSellTo.wallet < this.sellValue) {
          alert(`${this.playerToSellTo.name} does not have enough money to buy ${this.propertyBeingSold.name} from ${this.playerSelling.name}.`)
          return;
        }
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
.player-color {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.player-details {
  padding-left: 15px;
}
</style>