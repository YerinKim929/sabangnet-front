<script setup>
import { ref } from "vue";
import { checkPassword } from "@/utils/api";
import CheckDialog from "@/components/CheckDialog.vue";

const props = defineProps(["id"]);
const emit = defineEmits(["password-verified"]);
const checkOpen = defineModel("checkOpen");
const password = ref("");
const passwordShow = ref(false);
const fail = ref(false);

const handleSubmit = async () => {
  const requestBody = {
    password: password.value,
  };

  try {
    const response = await checkPassword(requestBody);
    if (response) {
      emit("password-verified");
    }
  } catch {
    fail.value = true;
  }
};
</script>

<template>
  <v-dialog v-model="checkOpen" persistent>
    <v-container fluid class="py-0">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column">
          <v-card>
            <v-card-title>비밀번호 확인</v-card-title>
            <v-card-text>
              - 개인정보 보호를 위해 비밀번호를 확인합니다<br />
              - 아래 입력창에 비밀번호를 입력하면 수정 페이지로 넘어갑니다.
            </v-card-text>
            <v-spacer></v-spacer>
          </v-card>
          <v-divider></v-divider>
          <v-card style="height: 250px">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <span class="text-title_gray" style="font-weight: bold"
                      >아이디</span
                    >
                  </v-col>
                  <v-col cols="8">
                    <div>{{ id }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader><span>비밀번호</span></v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="password"
                      @keyup.enter="handleSubmit"
                      variant="outlined"
                      density="compact"
                      max-width="80%"
                      :type="passwordShow ? 'text' : 'password'"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="passwordShow = !passwordShow"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container class="row-btn">
                <v-btn
                  @click="handleSubmit"
                  color="tertiary_blue"
                  size="large"
                  class="mt-2"
                  >확인</v-btn
                >
                <v-btn
                  color="tertiary_red"
                  size="large"
                  class="mt-2"
                  @click="checkOpen = false"
                  >취소</v-btn
                >
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>

  <CheckDialog
    v-model="fail"
    message="비밀번호가 일치하지 않습니다"
  ></CheckDialog>
</template>

<style scoped>
.row-btn {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
