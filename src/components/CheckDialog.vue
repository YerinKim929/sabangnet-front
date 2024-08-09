<script setup>
const isOpen = defineModel("modelValue", { type: Boolean, default: false });
const props = defineProps({
  message: String,
  icon: {
    type: String,
    default: "mdi-alert-circle",
  },
  iconColor: {
    type: String,
    default: "error",
  },
  to: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const closeDialog = () => {
  isOpen.value = false;
  emit("close");
};
</script>

<template>
  <v-dialog v-model="isOpen" max-width="500" @keyup.enter="isOpen=false" persistent>
    <v-card class="pa-2">
      <v-card-title>
        <v-responsive>
          <v-icon :color="iconColor" :icon="icon"></v-icon>
          <div class="dialog-message">{{ message }}</div>
        </v-responsive>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" :to="to">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-message {
  white-space: pre-wrap;
  margin-top: 10px;
}
</style>
