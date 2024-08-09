<script setup>
const isOpen = defineModel("modelValue", { type: Boolean, default: false });

const props = defineProps({
  message: String,
  icon: {
    type: String,
    default: "mdi-logout",
  },
  iconColor: {
    type: String,
    default: "secondary_blue",
  },
  to: {
    type: String,
    default: "",
  },
  handleClick: {
    type: Function,
    default: null,
  },
});

const closeDialog = () => {
  isOpen.value = false;
};
</script>

<template>
  <v-dialog v-model="isOpen" max-width="500" persistent>
    <v-card class="pa-2">
      <v-card-title>
        <v-responsive>
          <v-icon :color="iconColor">{{ icon }}</v-icon>
          <div class="dialog-message">{{ message }}</div>
        </v-responsive>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :to="to"
          @click="
            handleClick && handleClick();
            closeDialog();
          "
          >네</v-btn
        >
        <v-btn @click="closeDialog">아니오</v-btn>
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
