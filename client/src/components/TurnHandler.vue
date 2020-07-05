<template>
  <div class="turn-handler-container">
      <h2>Turn:</h2>
      <hr>
      <h3>Total Moves:</h3>
      <h3>Position:</h3>
      <button class="btn">Buy</button>
      <button class="btn">Pay Rent</button>
      <button class="btn">End Turn</button>
      <button class="btn">Declare Bankruptcy</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.turn-handler-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;    
    width: 23%;
    height: 23%;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
    padding: 1%;
    margin: auto;
    border: 1px solid black;
}

.btn {
    font-size: 20px;
    border-radius: 35px;
    margin-top: 1.5%;
    margin-left: 10px;
    padding-left: 3%;
    padding-right: 3%;
}

.btn:hover {
    background-color: rgb(109, 192, 157);
    cursor: pointer;
}

.btn:focus {
    outline: none;
}

hr {
    border: 1px solid black;
}
</style>