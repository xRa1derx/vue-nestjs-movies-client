<template>
  <button><slot name="body"></slot></button>
</template>

<style scoped>
button {
  border: none;
  border-radius: 20px;
  background-color: #fff;
  padding: 2px 5px;
  box-shadow: 0 0 2px 1px #a0a0a0;
  cursor: pointer;
}
</style>