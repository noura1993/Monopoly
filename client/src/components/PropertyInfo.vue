<template>
  <div class="property-info" v-if="property">
    <div class="property-color" v-bind:style="{'background-color': property.colour }"></div>
      <div class="property-name">{{property.name}}</div>
      <div v-if="property.value" class="property-price">Price: £{{property.value}}</div>
  </div>
</template>

<script>
export default {
    name: 'property-info',
    props: ['property']
}
</script>

<style>

.property-info {
  height: 100%;
}

.property-color {
    height: 15%;
}

.property-name {
    padding-top: 10%;
    margin: auto;
    height: 80px;
    width: 80px;
}

.property-price {
    padding-bottom: 10%;
}

</style>