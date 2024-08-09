<script setup>
import { updatePassword } from "@/utils/api";
import { ref } from "vue";
import Cookies from "js-cookie";
import router from "@/router";
import commonAxios from "@/utils/commonAxios";
import {
  passwordRules,
  newPasswordRule,
  confirmPasswordRule,
  validateForm,
} from "@/utils/validationRules";

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const showPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmNewPassword = ref(false);
const updateDialog = ref(false);
const validationDialog = ref(false);
const message = ref("");

const submitForm = async () => {
  const fieldsWithRules = [
    { value: newPassword.value, rules: passwordRules },
    { value: newPassword.value, rules: newPasswordRule(currentPassword.value) },
    {
      value: confirmNewPassword.value,
      rules: confirmPasswordRule(newPassword.value),
    },
  ];
  const validationMessage = validateForm(fieldsWithRules);

  if (validationMessage !== true) {
    message.value = validationMessage;
    validationDialog.value = true;
  } else {
    const requestBody = {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    };

    try {
      await updatePassword(requestBody);
      updateDialog.value = true;
    } catch (error) {
      message.value = error.data.message;
      validationDialog.value = true;
    }
  }
};

const handleDialogClose = async () => {
  if (submitForm) {
    Cookies.remove("accessToken");
    delete commonAxios.defaults.headers.common.Authorization;
    await router.push("/login");
  }
};
</script>

<style scoped>
.v-container {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}
.v-card {
  padding: 20px;
}
</style>

<template>
  <v-container style="height: 100vh; display: table">
    <v-container style="display: table-cell; vertical-align: middle">
      <v-card style="width: 500px" variant="outlined">
        <v-row align-center justify-center>
          <v-card-title>
            <h2>비밀번호 변경</h2>
          </v-card-title>
        </v-row>

        <v-card_text>
          <v-form>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="currentPassword"
                    :type="showPassword ? 'text' : 'password'"
                    label="현재 비밀번호 입력"
                    variant="outlined"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="py-2">
                <v-col>
                  <v-text-field
                    :type="showNewPassword ? 'text' : 'password'"
                    label="새 비밀번호 입력"
                    variant="outlined"
                    prepend-icon="mdi-lock"
                    :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showNewPassword = !showNewPassword"
                    hint="10~100자, 영소문자, 숫자, 특수문자 조합입니다."
                    persistent-hint
                    required
                    v-model="newPassword"
                    :rules="newPasswordRule(currentPassword)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="py-2">
                <v-col>
                  <v-text-field
                    :type="showConfirmNewPassword ? 'text' : 'password'"
                    label="새 비밀번호 확인"
                    variant="outlined"
                    prepend-icon="mdi-lock"
                    :append-icon="
                      showConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                      showConfirmNewPassword = !showConfirmNewPassword
                    "
                    hint="위의 비밀번호를 한번 더 입력해 주세요"
                    persistent-hint
                    required
                    v-model="confirmNewPassword"
                    :rules="confirmPasswordRule(newPassword)"
                    @keyup.enter="submitForm"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-btn
                    color="tertiary_blue"
                    class="mt-4"
                    block
                    @click="submitForm"
                    >등록</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card_text>
      </v-card>

      <CheckDialog
        v-model="updateDialog"
        message="
        비밀번호 변경이 완료되었습니다 
        로그인 페이지로 이동합니다."
        @close="handleDialogClose"
        icon="mdi-check-bold"
        iconColor="primary_green"
      ></CheckDialog>

      <CheckDialog v-model="validationDialog" :message="message" />
    </v-container>
  </v-container>
</template>
