<script setup>
import { getMyInfo, updateProfile, getAuthority } from "@/utils/api";
import {
  convertAuthority,
  convertIsUsed,
  convertTime,
} from "@/utils/convertFormat";
import { ref, onMounted } from "vue";
import { nameRules, emailRules } from "@/utils/validationRules";

const user = ref({});
const id = ref("");

const updateInfoDialog = ref(false);
const validationDialog = ref(false);
const message = ref("");
const loading = ref(false);
const userCheck = ref({});
const noneChangeDialog = ref(false);

const fetchUser = async (id) => {
  try {
    const response = await getMyInfo(id);
    user.value = response.data;
    userCheck.value = { ...response.data };
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getAuthority();
    id.value = response.data.id;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
    loading.value = false;
  }

  if (id.value) {
    fetchUser(id.value);
  }
});

const checkValue = () => {
  const keys = ["name", "email", "department", "memo"];

  for (const key of keys) {
    if (user.value[key] !== userCheck.value[key]) {
      return false;
    }
  }
  return true;
};

const submitForm = async () => {
  let requestBody = {
    name: "",
    email: "",
    department: "",
    memo: "",
  };

  requestBody = user.value;
  try {
    if (checkValue()) {
      noneChangeDialog.value = true;
      return;
    }

    await updateProfile(requestBody);
    updateInfoDialog.value = true;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
};
</script>

<template>
  <v-app>
    <v-container class="py-0g" style="height: 100%; display: table">
      <v-container style="display: table-cell; vertical-align: middle">
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
            lg="6"
            class="d-flex flex-column overflow-auto"
          >
            <v-toolbar flat>
              <v-toolbar-title style="font-weight: bold"
                >회원 정보 수정</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card class="flex-grow-1">
              <v-card-text>
                <h3>회원정보</h3>
                <v-container fluid>
                  <v-row class="py-3">
                    <v-col cols="4">
                      <span
                        class="text-title_gray"
                        style="font-weight: bold; font-size: 16px"
                        >아이디</span
                      >
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.id }}</div>
                    </v-col>
                  </v-row>

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span style="font-weight: bold; font-size: 16px"
                          >관리자명</span
                        >
                      </v-list-subheader>
                    </v-col>

                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="user.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span style="font-weight: bold; font-size: 16px"
                          >이메일</span
                        >
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="예: test1234@test.co.kr"
                        variant="outlined"
                        density="compact"
                        v-model="user.email"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="py-3">
                    <v-col cols="4">
                      <span
                        class="text-title_gray"
                        style="font-weight: bold; font-size: 16px"
                        >권한</span
                      >
                    </v-col>
                    <v-col cols="8">
                      <div>{{ convertAuthority(user.authority) }}</div>
                    </v-col>
                  </v-row>

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span style="font-weight: bold; font-size: 16px"
                          >부서</span
                        >
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="user.department"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span style="font-weight: bold; font-size: 16px"
                          >메모</span
                        >
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="user.memo"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="py-3">
                    <v-col cols="4">
                      <span
                        class="text-title_gray"
                        style="font-weight: bold; font-size: 16px"
                        >활성화 여부</span
                      >
                    </v-col>
                    <v-col cols="8">
                      <div>{{ convertIsUsed(user.isUsed) }}</div>
                    </v-col>
                  </v-row>

                  <v-row class="py-3">
                    <v-col cols="4">
                      <span
                        class="text-title_gray"
                        style="font-weight: bold; font-size: 16px"
                        >등록일</span
                      >
                    </v-col>
                    <v-col cols="8">
                      <div>{{ convertTime(user.registrationDate) }}</div>
                    </v-col>
                  </v-row>

                  <v-row class="py-3">
                    <v-col cols="4">
                      <span
                        class="text-title_gray"
                        style="font-weight: bold; font-size: 16px"
                        >최종 로그인 시간</span
                      >
                    </v-col>
                    <v-col cols="8">
                      <div>{{ convertTime(user.lastLoginTime) }}</div>
                    </v-col>
                  </v-row>

                  <v-row class="py-3">
                    <v-col cols="4">
                      <span
                        class="text-title_gray"
                        style="font-weight: bold; font-size: 16px"
                        >최종 로그인 IP</span
                      >
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.lastLoginIp }}</div>
                    </v-col>
                  </v-row>
                </v-container>
                <v-row justify="center">
                  <v-col cols="8">
                    <v-btn
                      @click="submitForm"
                      color="tertiary_blue"
                      class="mt-2"
                      block
                      size="large"
                      >확인</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <ChooseDialog
          v-model="noneChangeDialog"
          message="
        수정된 정보가 없습니다. 
        회원 정보 수정을 취소하시겠습니까?"
          :to="'/mypage'"
        ></ChooseDialog>

        <CheckDialog
          v-model="updateInfoDialog"
          message="
        회원 정보 변경이 완료되었습니다
        마이 페이지로 이동합니다."
          :to="'/mypage'"
          icon="mdi-check-bold"
          iconColor="primary_green"
        ></CheckDialog>

        <CheckDialog v-model="validationDialog" :message="message" />
      </v-container>
    </v-container>
  </v-app>

  <LoadingSpinner v-model="loading" />
</template>
