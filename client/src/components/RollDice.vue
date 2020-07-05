<template>
  <div class="roll-dice-container">
      <button class="btn">Roll Dice</button>
      <button class="btn">Pay Fine</button>
      <button class="btn">Declare Bankruptcy</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.roll-dice-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;    
    width: 23%;
    height: 3%;
    background-color: rgb(114, 184, 155);
    border-radius: 30px;
    padding: 1%;
    margin: auto;
}

.btn {
    font-size: 20px;
    border-radius: 30px;
    margin-left: 10px;
}

.btn:hover {
    background-color: rgb(109, 192, 157);
    cursor: pointer;
}

.btn:focus {
    outline: none;
}

</style>