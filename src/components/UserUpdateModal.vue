<script setup>
import { convertTime, convertIsUsed } from "@/utils/convertFormat";
import {
  nameRules,
  emailRules,
  authorityRules,
  validateForm,
} from "@/utils/validationRules";

const props = defineProps(["authority"]);
const dialog = defineModel("dialog");
const userInfo = defineModel("userInfo");
const emit = defineEmits(["updateOthers"]);
const validationDialog = ref(false)
const message = ref('')

function submitCheck(){
  const fieldsWithRules = [
    { value: userInfo.value.name, rules: nameRules },
    { value: userInfo.value.email, rules: emailRules },
  ];

  const validationMessage = validateForm(fieldsWithRules);

  if (validationMessage !== true) {
    message.value = validationMessage;
    validationDialog.value = true;
  } else {
    emit('updateOthers')
  }
}
</script>



<template>
  <v-dialog
    v-model="dialog"
    max-width="1500"
    @keyup.esc="dialog = false"
    persistent
    scrollable
  >
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height">
        <v-col
          cols="12"
          md="8"
          lg="6"
          class="d-flex flex-column fill-height overflow-auto"
        >
          <v-toolbar flat>
            <v-toolbar-title>회원 정보 수정</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card class="flex-grow-1 overflow-y-auto" style="height: 750px">
            <v-card-text style="height: 300px">
              <!-- 회원 정보 섹션 -->
              <h3>회원정보</h3>
              <v-container fluid>
                <v-row class="py-2">
                  <v-col cols="4">
                      <span class="gray--text">아이디</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ userInfo.id }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-1">
                  <v-col cols="4">
                    <v-list-subheader>
                      <span class="gray--text">관리자명</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      variant="outlined"
                      density="compact"
                      v-model="userInfo.name"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="py-1">
                  <v-col cols="4">
                    <v-list-subheader>
                      <span class="gray--text">이메일</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="예: test1234@test.co.kr"
                      variant="outlined"
                      density="compact"
                      v-model="userInfo.email"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="py-1">
                  <v-col cols="4">
                    <v-list-subheader>
                      <span class="gray--text">권한</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      v-if="authority === 'MASTER'"
                      v-model="userInfo.authority"
                      :items="[
                        { name: '통합 관리자', value: 'MASTER' },
                        { name: '일반 관리자', value: 'ADMIN' },
                      ]"
                      key="value"
                      item-title="name"
                      item-value="value"
                      variant="outlined"
                      density="compact"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row class="py-1" >
                  <v-col cols="4">
                    <v-list-subheader>
                      <span class="gray--text">부서</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      variant="outlined"
                      density="compact"
                      v-model="userInfo.department"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="py-1">
                  <v-col cols="4">
                    <v-list-subheader>
                      <span class="gray--text">메모</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      variant="outlined"  
                      density="compact"
                      v-model="userInfo.memo"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                      <span class="gray--text">활성화여부</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertIsUsed(userInfo.isUsed) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                      <span class="gray--text">등록일</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertTime(userInfo.registrationDate) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                      <span class="gray--text">최종 로그인 시간</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ convertTime(userInfo.lastLoginTime) }}</div>
                  </v-col>
                </v-row>

                <v-row class="py-2">
                  <v-col cols="4">
                      <span class="gray--text">최종 로그인 IP</span>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ userInfo.lastLoginIp }}</div>
                  </v-col>
                </v-row>
              </v-container>

              <v-container class="row-btn">
                <v-btn
                  color="primary_blue"
                  class="mt-2"
                  size="large"
                  @click="submitCheck"
                  >확인</v-btn
                >
                <v-btn
                  color="grey"
                  class="mt-2"
                  size="large"
                  @click="dialog = false"
                  >취소</v-btn
                >
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>

  <CheckDialog v-model="validationDialog" :message="message"/>
</template>

<style scoped>
.row-btn {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.gray--text {
  color: #bdbdbd;
  font-weight: bold;
  font-size: 16px;
}
</style>
