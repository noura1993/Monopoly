<template>
  <div class="roll-dice-container">
      <button class="dice-btn">Roll Dice</button>
      <button class="dice-btn">Pay Fine</button>
      <button class="dice-btn">Declare Bankruptcy</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.roll-dice-container {
    position: relative;
    left: 50%;
    transform:translate(-50%, -50%);
    top: 50%;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
    border: 1px solid black;
    padding: 1%;
}

.dice-btn {
    font-size: 20px;
    border-radius: 35px;
}

.dice-btn:hover {
    background-color: rgb(109, 192, 157);
    cursor: pointer;
}

.dice-btn:focus {
    outline: none;
}

</style>