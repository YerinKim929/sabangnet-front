<template>
  <v-app>
    <v-main style="height: 100vh"><router-view /><AppFooter /></v-main>
  </v-app>
</template>

<script setup>
import AppFooter from "@/components/AppFooter.vue";
</script>
