<script setup lang="ts">
const count = ref(0);
</script>

<template>
  <div>
    <h1>Counter</h1>
    {{ count }}
    <button @click="count++">inc</button>
    <button @click="count--">dec</button>
  </div>
</template>
