<template lang="html">
<div>
	<div v-for="(player, index) in players" :key="index" :class="playerClass(index)">
        <p>Player name: {{player.name}}</p>
        <p>Wallet: {{player.wallet}}</p>
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
            property: null,
            player: null
        }
    },
    methods: {
        buyProperty: function (player) {
            const propertyValue = this.property.value;
            const playerId = player._id;
            if (player.wallet > this.property.value) {
                player.wallet -= this.property.value;
                player.properties.push(this.property)
            }
            else {
                alert(`${player.name}: You don't have enough funds for ${this.property.name}`)
            }
            PlayerService.updatePlayer(player)
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