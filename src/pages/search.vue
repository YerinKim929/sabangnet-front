<script setup>
import TextBlank from "../components/TextBlank.vue";
import TextSelection from "../components/TextSelection.vue";
import SearchBtn from "../components/SearchBtn.vue";
import UserUpdateModal from "../components/UserUpdateModal.vue";
import CheckDialog from "../components/CheckDialog.vue";
import ChooseDialog from "@/components/ChooseDialog.vue";
import {
  getSearch,
  getAuthority,
  deleteUser,
  updateOtherUser,
  patchApprove,
  getMyInfo,
} from "@/utils/api";
import {
  convertAuthority,
  convertIsUsed,
  convertTime,
  removeBlank
} from "@/utils/convertFormat";
import { onMounted, computed } from "vue";
import router from "@/router/index";

const tableItems = ref([]);

const headerProps = ref({
  class: "text-secondary_blue",
  style: "font-weight:bold; font-size:15px",
});

const headers = [
  {
    title: "관리자번호",
    value: "userId",
    maxWidth: "70px",
    align: "center",
    headerProps: headerProps,
  },
  { title: "아이디", value: "id", maxWidth: "80px", headerProps: headerProps },
  {
    title: "관리자명",
    value: "name",
    maxWidth: "80px",
    headerProps: headerProps,
  },
  {
    title: "이메일",
    value: "email",
    maxWidth: "130px",
    headerProps: headerProps,
  },
  {
    title: "권한",
    value: "authority",
    maxWidth: "90px",
    headerProps: headerProps,
  },
  {
    title: "부서",
    value: "department",
    maxWidth: "90px",
    headerProps: headerProps,
  },
  { title: "메모", value: "memo", maxWidth: "110px", headerProps: headerProps },
  {
    title: "등록일",
    value: "registrationDate",
    maxWidth: "100px",
    headerProps: headerProps,
  },
  {
    title: "최종로그인",
    value: "lastLoginTime",
    maxWidth: "100px",
    headerProps: headerProps,
  },
  {
    title: "최종로그인 IP",
    value: "lastLoginIp",
    maxWidth: "110px",
    headerProps: headerProps,
  },
  {
    title: "활성화여부",
    value: "isUsed",
    maxWidth: "90px",
    headerProps: headerProps,
  },
  { title: "", value: "btn", width: "30px", headerProps: headerProps },
];

const inputMapForSearch = ref({
  id: "",
  name: "",
  email: "",
  isUsed: "",
  page: 1,
  showList: 10,
});

const isSearch = ref(false);
const totalLists = ref(0);
const numOfPage = ref(0);
const loading = ref(false);
const message = ref("");
const validationDialog = ref(false);

// merge시 데이터 삭제
const authority = ref("");
const id = ref("");
const userInfo = ref({});
// merge시 데이터 삭제

const selected = ref([]);

const deleteDialogs = ref([
  { delete: false },
  { deleteMe: false },
  { nonSelect: false },
  { deleteSuccess: false },
]);

const approveDialogs = ref([
  { approve: false },
  { alreadyApproved: false },
  { nonSelect: false },
  { approveSuccess: false }
]);

const updateDialogs = ref([{ userUpdate: false }, { updateSuccess: false }]);

function isMaster() {
  return authority.value === "MASTER";
}

async function loadUserInfo(item) {
  if (id.value == item) {
    router.push("/mypage");
  } else {
    try {
      const response = await getMyInfo(item);
      userInfo.value = response.data;
      updateDialogs.value["userUpdate"] = true;
    } catch (error) {}
  }
}

async function searchHandler(page = 1) {
  isSearch.value = true;
  inputMapForSearch.value.page = page;
  tableItems.value = [];

  const params = new URLSearchParams();

  inputMapForSearch.value = removeBlank(inputMapForSearch.value)

  for (let key in inputMapForSearch.value) {
    params.append(key, inputMapForSearch.value[key]);
  }

  loading.value = true;

  try {
    const response = await getSearch(params);
    totalLists.value = response.data.totalLists;
    tableItems.value = response.data.users.map((user) => {
      return {
        authority: convertAuthority(user.authority),
        department: user.department,
        email: user.email,
        id: user.id,
        isUsed: convertIsUsed(user.isUsed),
        lastLoginIp: user.lastLoginIp,
        lastLoginTime: convertTime(user.lastLoginTime),
        memo: user.memo,
        name: user.name,
        registrationDate: convertTime(user.registrationDate),
        userId: user.userId,
      };
    });
    numOfPage.value = response.data.totalPages;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }

  loading.value = false;
  isSearch.value = true;
  selected.value = [];
}

function authorityTransfer(str) {
  return str === "MASTER" ? "통합 관리자" : "일반 관리자";
}

function isUsedTransfer(bool) {
  return bool ? "활성화" : "비활성화";
}

// 삭제버튼
function checkDeleteMe() {
  return selected.value.indexOf(id.value) != -1;
}

function showDeleteDialog() {
  if (selected.value.length == 0) deleteDialogs.value["nonSelect"] = true;
  else if (checkDeleteMe()) deleteDialogs.value["deleteMe"] = true;
  else deleteDialogs.value["delete"] = true;
}

async function deleteHandler() {
  try {
    await deleteUser({ data: { ids: selected.value } });
    deleteDialogs.value["deleteSuccess"] = true;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
}

// 승인버튼
function checkAlreadyApproved() {
  return selected.value.some((id) => {
    const selectedItem = tableItems.value.find((item) => item.id === id);
    return selectedItem && selectedItem.isUsed === "활성화";
  });
}

function showApproveDialog() {
  if (selected.value.length == 0) approveDialogs.value["nonSelect"] = true;
  else if (checkAlreadyApproved())
    approveDialogs.value["alreadyApproved"] = true;
  else approveDialogs.value["approve"] = true;
}

async function approveHandler() {
  try {
    const response = await patchApprove(selected.value);
    approveDialogs.value['approveSuccess'] = true;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
}

async function updateOthersHandler() {
  
  try {
    let req = {
      id: "",
      name: "",
      authority: "",
      email: "",
      department: "",
      memo: "",
    };

    

    req = userInfo.value;
    const response = await updateOtherUser(req);
    updateDialogs.value["userUpdate"] = false;
    updateDialogs.value["updateSuccess"] = true;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
}

onMounted(async () => {
  try {
    const response = await getAuthority();
    authority.value = response.data.authority;
    id.value = response.data.id;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
});
</script>

<template>
  <v-container style="min-height: 100vh" class="flex-grow-1 overflow-x-auto">
    <v-container>
      <h1 style="margin: 15px" class="content-container">관리자 조회</h1>
      <v-container class="search-container">
        <TextBlank
          v-model:inputText="inputMapForSearch.id"
          labelName="아이디"
          variant="outlined"
          style="max-width: 120px"
          @keyup.enter="searchHandler()"
        />

        <TextBlank
          v-model:inputText="inputMapForSearch.name"
          labelName="관리자명"
          variant="outlined"
          style="max-width: 140px"
          @keyup.enter="searchHandler()"
        />

        <TextBlank
          v-model:inputText="inputMapForSearch.email"
          labelName="이메일"
          variant="outlined"
          style="max-width: 200px"
          @keyup.enter="searchHandler()"
        />

        <TextSelection
          v-model:selected="inputMapForSearch.isUsed"
          style="max-width: 140px"
          labelName="활성화여부"
          variant="outlined"
          :itemList="[
            { name: 'ALL', value: '' },
            { name: '활성화', value: 'TRUE' },
            { name: '비활성화', value: 'FALSE' },
          ]"
        />
        <SearchBtn class="fixed-h" @click="searchHandler()" />
      </v-container>

      <v-container class="action-container">
        <v-container v-if="isSearch" class="min-w-max-c">
          <span class="text-secondary_red">{{ totalLists }}</span>
          <span>건 검색</span>
        </v-container>
        <v-btn
          v-if="isMaster()"
          variant="elevated"
          color="tertiary_blue"
          class="fixed-h rounded-lg"
          to="/register"
          >관리자 등록</v-btn
        >
        <v-btn
          v-if="isMaster()"
          variant="tonal"
          color="#6EACDE"
          class="fixed-h rounded-lg"
          style="font-weight: bold"
          @click="showApproveDialog"
          >승인</v-btn
        >
        <v-btn
          v-if="isMaster()"
          variant="tonal"
          class="fixed-h rounded-lg"
          color="secondary_red"
          style="font-weight: bold"
          @click="showDeleteDialog"
          >삭제</v-btn
        >

        <ChooseDialog
          v-model="deleteDialogs['delete']"
          :message="`총 ${selected.length}명의 관리자를 삭제 하시겠습니까?`"
          :handleClick="deleteHandler"
          icon="mdi-delete"
          iconColor="primary_red"
        />

        <CheckDialog
          v-model="deleteDialogs['deleteMe']"
          message="자신을 삭제할 수 없습니다."
        />

        <CheckDialog
          v-model="deleteDialogs['nonSelect']"
          message="1개 이상의 삭제할 계정을 골라주세요."
        />

        <ChooseDialog
          v-model="approveDialogs['approve']"
          :message="`총 ${selected.length}명의 관리자를 승인 하시겠습니까?`"
          :handleClick="approveHandler"
          icon="mdi-check-bold"
          iconColor="secondary_blue"
        />

        <CheckDialog
          v-model="approveDialogs['alreadyApproved']"
          message="이미 승인된 계정은 선택할 수 없습니다."
        />

        <CheckDialog
          v-model="approveDialogs['nonSelect']"
          message="1개 이상의 승인할 계정을 골라주세요."
        />

        <CheckDialog
          v-model="deleteDialogs['deleteSuccess']"
          message="삭제가 완료되었습니다."
          @close="searchHandler"
          icon="mdi-check-bold"
        />

        <TextSelection
          v-model:selected="inputMapForSearch.showList"
          variant="outlined"
          :itemList="[
            { name: '10개씩 보기', value: 10 },
            { name: '20개씩 보기', value: 20 },
            { name: '50개씩 보기', value: 50 },
            { name: '100개씩 보기', value: 100 },
          ]"
          style="min-width: fit-content; max-width: fit-content"
          @update:modelValue="searchHandler()"
        />
      </v-container>
    </v-container>

    <v-container v-if="isSearch" class="content-container">
      <v-row>
        <v-col>
          <v-data-table
            v-model="selected"
            :items="tableItems"
            :headers="headers"
            :loading="loading"
            loading-text="Loading... Please wait"
            :show-select="isMaster()"
            hide-default-footer
            :items-per-page="inputMapForSearch.showList"
            height="60vh"
            width="40vw"
            fixed-header
            hover
            sticky
          >
            <template v-slot:item.btn="row">
              <v-btn
                v-if="isMaster()"
                style="font-weight: bold"
                variant="tonal"
                color="title_gray"
                @click="loadUserInfo(row.item.id)"
              >
                수정
              </v-btn></template
            >
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pagination-container">
          <v-pagination
            v-if="!loading"
            v-model="inputMapForSearch.page"
            :length="numOfPage"
            total-visible="8"
            @click="searchHandler(inputMapForSearch.page)"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>

    <UserUpdateModal
      v-model:dialog="updateDialogs['userUpdate']"
      v-model:userInfo="userInfo"
      :authority="authority"
      @updateOthers="updateOthersHandler"
    />

    <CheckDialog
      v-model="updateDialogs['updateSuccess']"
      message="수정이 완료되었습니다."
      @close="searchHandler"
      icon="mdi-check-bold"
      iconColor="primary_green"
    />

    <CheckDialog
      v-model="approveDialogs['approveSuccess']"
      message="승인이 완료되었습니다."
      @close="searchHandler"
      icon="mdi-check-bold"
      iconColor="primary_green"
    />

    <CheckDialog
      v-model="validationDialog"
      :message="message"
    />
  </v-container>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: flex-start;
  gap: 25px;
}

.action-container {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.content-container {
  min-width: min-content;
  word-break: keep-all;
}

.fixed-h {
  height: 50px;
}

.min-w-max-c {
  min-width: max-content;
}

.pagination-container {
  overflow-y: auto;
  max-height: 20vh;
}
</style>
