<template lang="html">
<div>
	<div v-for="(player, index) in players" :key="player._id" :class="playerClass(index)">
        <p>Player name: {{player.name}}</p>
        <p>Wallet: {{player.wallet}}</p>
        <ul v-if="player.properties">
            <li v-for="(property, index) in player.properties" :key="index">{{property.name}}</li>
        </ul>
        <label for="player-chooses-property">Choose a property below</label>
        <select id="player-chooses-property" v-on:change="buyProperty(player)" v-model="property">
            <option v-for="(property, index) in properties" :value="property" :key="index">{{property.name}}</option>
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
            property: null
        }
    },
    methods: {
        buyProperty: function (player) {
            if (player.wallet < this.property.value) {
                alert(`${player.name}: You don't have enough funds for ${this.property.name}`);
                return;
            }
            eventBus.$emit('player-buys-property-update', {'player': player, 'property': this.property})
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