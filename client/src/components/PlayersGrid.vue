<template lang="html">
	<div id="playersGrid">
		<!-- <player v-for="(player, index) in players" :key="index" :player="player" /> -->
        <ul>
            <li v-for="(player, index) in players" :key="index">{{player}}</li>
        </ul>
	</div>
</template>

<script>
import Player from './PlayerInfo';

export default {
    name: 'players-grid',
    // components: {
    //     'player': Player
    // },
    props: ['players']
}
</script>

<style lang="css" scoped>
#playersGrid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
</style>