<template>
  <div class="turn-handler-container">
      <h2>Turn:</h2>
      <hr class="turn-handler-hr">
      <h3>Total Moves:</h3>
      <h3>Position:</h3>
      <button class="turn-handler-btn">Buy</button>
      <button class="turn-handler-btn">Pay Rent</button>
      <button class="turn-handler-btn">End Turn</button>
      <button class="turn-handler-btn">Declare Bankruptcy</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.turn-handler-container {
    position: absolute;
    left: 50%;
    transform:translate(-50%, -50%);
    top: 50%;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
    border: 1px solid black;
    padding: 1%;
}

.turn-handler-btn {
    font-size: 20px;
    border-radius: 35px;
    margin-top: 1.5%;
    margin-left: 10px;
    padding-left: 3%;
    padding-right: 3%;
}

.turn-handler-btn:hover {
    background-color: rgb(109, 192, 157);
    cursor: pointer;
}

.turn-handler-btn:focus {
    outline: none;
}

.turn-handler-hr {
    border: 1px solid black;
}
</style>