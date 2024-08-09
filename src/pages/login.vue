<script setup>
import { ref } from "vue";
import { postLogin } from "@/utils/api";
import router from "@/router";
import commonAxios from "@/utils/commonAxios";
import Cookies from "js-cookie";
import {
  idRules,
  passwordRulesWithoutNorm,
  validateForm,
} from "@/utils/validationRules";
import CheckDialog from "@/components/CheckDialog.vue";

const id = ref("");
const password = ref("");
const validationDialog = ref(false);
const message = ref("");

const showPassword = ref(false);

const handleSubmit = async () => {
  const fieldsWithRules = [
    { value: id.value, rules: idRules },
    { value: password.value, rules: passwordRulesWithoutNorm },
  ];

  const validationMessage = validateForm(fieldsWithRules);
  if (validationMessage !== true) {
    message.value = validationMessage;
    validationDialog.value = true;
  } else {
    const requestBody = {
      id: id.value,
      password: password.value,
    };

    try {
      const response = await postLogin(requestBody);
      Cookies.set("accessToken", response.data.token);
      commonAxios.defaults.headers.common[
        "Authorization"
      ] = `${response.data.token}`;
      router.push("/search");
    } catch (error) {
      message.value = error.data.message;
      validationDialog.value = true;
    }
  }
};
</script>

<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <v-card class="mb-10" width="400" color="transparent">
      <v-img
        src="https://wms.sbfulfillment.co.kr/wms/asset/images/logo_fbs_w.svg"
      ></v-img>
    </v-card>

    <v-sheet width="400" color="transparent">
      <v-form fast-fail @submit.prevent="handleSubmit">
        <v-text-field
          v-model="id"
          :rules="idRules"
          label="아이디"
          class="mb-3"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRulesWithoutNorm"
          label="비밀번호"
          class="mb-7"
          variant="outlined"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-btn type="submit" color="tertiary_blue" block>LOGIN</v-btn>
      </v-form>
    </v-sheet>
    <CheckDialog v-model="validationDialog" :message="message"></CheckDialog>
  </v-container>
</template>
