<template>
  <div class="board">
    <div class="corner top-left-corner">
      <div class="corner-container">Free Parking</div>
    </div>
    <div class="row top-row">
      <div class="property-container" v-for="property in Array.from(Array(8).keys())" :key="property">
          <div class="property-color">Color</div>
          <div class="property-name">Name</div>
          <div class="property-price">Price</div>
      </div>
    </div>
    <div class="corner top-right-corner">
      <div class="corner-container">Go To Jail</div>
    </div>
    <div class="column left-column">
        <div class="left-property property-container" v-for="property in Array.from(Array(8).keys())" :key="property">
          <div class="property-color">Color</div>
          <div class="property-name">Name</div>
          <div class="property-price">Price</div>
      </div>
    </div>
    <div class="center"></div>
    <div class="column right-column">
        <div class="property-container" v-for="property in Array.from(Array(8).keys())" :key="property">
          <div class="property-color">Color</div>
          <div class="property-name">Name</div>
          <div class="property-price">Price</div>
      </div>
    </div>
    <div class="corner bottom-right-corner">
      <div class="corner-container">Go</div>
    </div>
    <div class="row bottom-row">
       <div class="property-container" v-for="property in Array.from(Array(8).keys())" :key="property">
          <div class="property-color">Color</div>
          <div class="property-name">Name</div>
          <div class="property-price">Price</div>
      </div>
    </div>
    <div class="corner bottom-left-corner">
      <div class="corner-container">In Jail/Just Visiting</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.board {
  display: grid;
  grid-template-columns: 160px repeat(8, 120px) 160px;
  grid-template-rows: 160px repeat(8, 120px) 160px;
  grid-gap: 3px;
  background: black;
  border: 2px solid black;
}

.row {
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(8, 120px);
}

.column {
  display: grid;
  grid-gap: 3px;
  grid-template-rows: repeat(8, 120px);
}

.top-left-corner {
  grid-column: 1;
  grid-row: 1;
}

.top-row {
  grid-column: 2/10;
  grid-row: 1;
}

.top-right-corner {
  grid-column: 10;
  grid-row: 1;
}

.left-column {
  grid-column: 1;
  grid-row: 2/10;
}

.center {
  grid-column: 2/10;
  grid-row: 2/10;
  background: white;
}

.right-column {
  grid-column: 10;
  grid-row: 2/10;
}

.bottom-right-corner {
  grid-column: 10;
  grid-row: 10;
}

.bottom-row {
  grid-column: 2/10;
  grid-row: 10;
}

.bottom-left-corner {
  grid-column: 1;
  grid-row: 10;
}

.property-container {
    background: white;
}

.left-property {
    height: 160px;
    width: 120px;
    transform: translate(16%, -12%) rotate(90deg);
}

.corner {
    background: white;
}
</style>