<template lang="html">
<div>
	<div v-for="(player, index) in players" :key="player._id" :class="playerClass(index)">
        <p>Player name: {{player.name}}</p>
        <p>Wallet: {{player.wallet}}</p>
        <ul v-if="player.properties">
            <li v-for="(property, index) in player.properties" :key="index">{{property.name}}</li>
        </ul>
        <label for="player-chooses-property">Choose a property below</label>
        <select id="player-chooses-property" v-model="propertyBuy">
            <option v-for="(property, index) in properties" :value="property" :key="index">{{property.name}}</option>
        </select>
        <button v-on:click="buyProperty(player)">Buy Property</button>
        <select id="players-sells-property" v-model="playerToSellTo">
            <option v-for="(player, index) in players" :value="player" :key="player._id">{{player.name}}</option>
        </select>
	</div>
</div>
</template>

<script>
import Player from './PlayerInfo';
import {eventBus} from '../main'
import PlayerService from '../services/PlayerService';

export default {
    name: 'players-grid',
    data() {
        return {
            propertyBuy: null,
            propertySell: null,
            playerToSellTo: null
        }
    },
    methods: {
        buyProperty: function (player) {
            if (player.wallet < this.propertyBuy.value) {
                alert(`${player.name}: You don't have enough funds for ${this.propertyBuy.name}.`);
                return;
            }
            let exitCondition = null;
            player.properties.forEach((property) => {
                if (property._id === this.propertyBuy._id) {
                    alert(`${player.name}: You already have ${this.propertyBuy.name} purchased.`);
                    exitCondition = true;
                }
            })
            if (exitCondition) { return; }

            //$on event for this is in App.vue
            eventBus.$emit('player-buys-property-update', {'player': player, 'property': this.propertyBuy})
        },

        playerClass: function (playerIndex) {
            return `player-${playerIndex}`;
        }
    },
    props: ['players', 'properties']
}
</script>

<style lang="css" scoped>
#playersGrid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
</style>