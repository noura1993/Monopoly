<template>
  <div class="player-info">
    <div v-bind:style="{'background-color': player.colour }">{{player.name}}</div>
      <div>Colour: {{player.colour}}</div>
      <div>Balance: {{player.wallet}}</div>
      <div>Owned Properties: {{player.properties.map(property => property.name)}}</div>
  </div>
</template>

<script>
export default {
    name: 'player-info',
    props: ['player']
}
</script>

<style>


</style>