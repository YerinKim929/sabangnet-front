<script setup>
const props = defineProps(["labelName", "itemList"]);
const selected = defineModel("selected");
</script>

<template>
  <v-select
    v-model="selected"
    :style="{ width: '200px', height: '20px' }"
    :label="labelName"
    :items="itemList"
    item-title="name"
    item-value="value"
  >
  </v-select>
</template>
