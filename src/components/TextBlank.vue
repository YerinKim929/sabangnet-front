<script setup>
const props = defineProps(["labelName"]);
const inputText = defineModel("inputText");
</script>

<template>
  <v-text-field
    v-model="inputText"
    :style="{ width: '200px', height: '20px' }"
    :label="labelName"
  />
</template>
