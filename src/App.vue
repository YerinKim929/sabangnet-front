<!-- src/App.vue -->
<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const layoutComponent = computed(() => route.meta.layoutComponent);
</script>
