<template lang="html">
<div>
	<div v-for="(player, index) in players" :key="player._id" :class="playerClass(index)">
        <p>Player name: {{player.name}}</p>
        <p>Wallet: {{player.wallet}}</p>
        <ul v-if="player.properties">
            <li v-for="(property, index) in player.properties" :key="index">{{property.name}}</li>
        </ul>
        <label for="player-chooses-property">Choose a property to buy below</label>
        <select id="player-chooses-property" v-model="propertyBuy">
            <option v-for="(property, index) in properties" :value="property" :key="index">{{property.name}}</option>
        </select>
        <button v-on:click="buyProperty(player)">Buy Property</button>
        <div v-if="player.properties.length > 0" id="container-for-selling-properties">
            <p>You can choose a property and sell it to another player below.</p>
            <select id="player-selling-buyer-select" v-model="playerToSellTo">
                <option v-for="(player, index) in players" :value="player" :key="player._id">{{player.name}}</option>
            </select>
            <select id="player-selling-property-select" v-model="propertySell">
                <option v-for="(property, index) in player.properties" :value="property" :key="index">{{property.name}}</option>
            </select>
            <button v-if="propertySell && playerToSellTo" v-on:click="sellProperty(player)">Sell {{propertySell.name}} this to {{playerToSellTo.name}}</button>
        </div>
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
            //checking if the player has enough funds for the property
            if (player.wallet < this.propertyBuy.value) {
                alert(`${player.name}: You don't have enough funds for ${this.propertyBuy.name}.`);
                return;
            }
            //checking if the player already owns the property
            let exitCondition = null;
            player.properties.forEach((property) => {
                if (property._id === this.propertyBuy._id) {
                    alert(`${player.name}: You already have ${this.propertyBuy.name} purchased.`);
                    exitCondition = true;
                }
            })
            if (exitCondition) { return; }

            //checking if another player already owns the property
            this.players.forEach((player) => {
                //NOTE: player name needs more work - it gets stuck on the same name sometimes
                player.properties.forEach((playerProperty) => {
                    if (playerProperty._id === this.propertyBuy._id) {
                        alert(`${player.name}: Sorry, ${playerProperty.name} is already owned by ${player}`)
                        exitCondition = true;
                    }
                })
            })
            if (exitCondition) { return; }

            //$on event for this is in App.vue
            eventBus.$emit('player-buys-property-update', {'player': player, 'property': this.propertyBuy})
        },

        sellProperty: function (playerSelling) {
            // console.log(playerSelling)
            eventBus.$emit('player-sells-property-update', {
                'playerSelling': playerSelling, 
                'playerToSellTo': this.playerToSellTo,
                'property': this.propertySell
            })
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