<script setup></script>

<template>
  <v-overlay persistent>
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  </v-overlay>
</template>

<script>
export default {};
</script>

<style scoped>
.spinner-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #e0e0e0;
  border-bottom: 5px solid #395a73;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
