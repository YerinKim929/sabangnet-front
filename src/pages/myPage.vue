<script setup>
import { getMyInfo, getAuthority } from "@/utils/api";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CheckPasswordDialog from "@/components/CheckPasswordDialog.vue";
import {
  convertAuthority,
  convertIsUsed,
  convertTime,
} from "@/utils/convertFormat";
import LoadingSpinnerVue from "@/components/LoadingSpinner.vue";

const user = ref({});
const checkOpen = ref(false);
const id = ref("");
const authority = ref("");
const path1 = ref(true);
const loading = ref(false);

const router = useRouter();

const fetchUser = async (id) => {
  user.value = [];
  try {
    const response = await getMyInfo(id);
    user.value = response.data;
  } catch (error) {
  }
  loading.value = false;
};

onMounted(async () => {
  try {
    loading.value = true;
    const response = await getAuthority();
    authority.value = response.data.authority;
    id.value = response.data.id;
  } catch {
    loading.value = false;
  }

  if (id.value) {
    fetchUser(id.value);
  }
});

const handlePasswordVerified = () => {
  if (path1.value) {
    router.push("/updateProfile");
  } else {
    router.push("/updatePassword");
  }
};
</script>

<template>
  <v-app max-width="100">
    <v-container fluid class="fill-height py-0" style="height: 100vh">
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column fill-height">
          <v-toolbar flat>
            <v-toolbar-title style="font-weight: bold">My Page</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card class="flex-grow-1 d-flex flex-column">
            <v-card-text>
              <h3>회원정보</h3>
              <v-container fluid>
                <v-row class="py-2" justify="center">
                  <v-col cols="4">
                    <span class="gray--text">아이디</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.id }}</div>
                  </v-col>
                </v-row>
                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">관리자명</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.name }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">이메일</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.email }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">권한</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertAuthority(user.authority) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">부서</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.department }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">메모</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.memo }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">활성화여부</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertIsUsed(user.isUsed) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">등록일</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertTime(user.registrationDate) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">최종 로그인 시간</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertTime(user.lastLoginTime) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                    <span class="gray--text">최종 로그인 IP</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.lastLoginIp }}</div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions class="mb-10">
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn
                    @click="
                      checkOpen = true;
                      path1 = true;
                    "
                    color="tertiary_blue"
                    class="mt-2"
                    variant="elevated"
                    >회원 정보 수정</v-btn
                  >
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    @click="
                      checkOpen = true;
                      path1 = false;
                    "
                    color="primary_red"
                    class="mt-2"
                    variant="elevated"
                    >비밀번호 수정</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <CheckPasswordDialog
        v-model:checkOpen="checkOpen"
        :id="id"
        @password-verified="handlePasswordVerified"
      ></CheckPasswordDialog>
      <LoadingSpinner v-model="loading" />
    </v-container>
  </v-app>
</template>

<style scoped>
.white--text {
  color: white !important;
}
.gray--text {
  color: #bdbdbd;
  font-weight: bold;
  font-size: 16px;
}
</style>
