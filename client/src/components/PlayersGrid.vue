<template lang="html">
<div>
	<div v-for="(player, index) in players" :key="index" :class="playerClass(index)">
        <p>{{player.name}}</p>
        <label for="player-chooses-property">Choose a property below</label>
        <select id="player-chooses-property" v-on:change="buyProperty(player._id)" v-model="property">
            <option v-for="(property, index) in properties" :value="property" :key="index">{{property.name}}</option>
        </select>
	</div>
</div>
</template>

<script>
import Player from './PlayerInfo';

export default {
    name: 'players-grid',
    data() {
        return {
            property: null
        }
    },
    methods: {
        buyProperty: function (playerId) {
            
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