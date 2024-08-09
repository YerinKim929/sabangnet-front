<script setup>
import TextBlank from "../components/TextBlank.vue";
import TextSelection from "../components/TextSelection.vue";
import SearchBtn from "../components/SearchBtn.vue";
import { getHistory } from "@/utils/api";
import { convertTime, removeBlank } from "@/utils/convertFormat";

const tableItems = ref([]);

const headerProps = ref({
  class: "text-secondary_blue",
  style: "font-weight:bold; font-size:15px",
});

const headers = [
  {
    title: "로그인 일시",
    value: "loginTime",
    width: "120px",
    headerProps: headerProps,
  },
  { title: "관리자명", value: "name", width: "80px", headerProps: headerProps },
  { title: "아이디", value: "ID", width: "30px", headerProps: headerProps },
  {
    title: "로그인 디바이스",
    value: "loginDevice",
    width: "500px",
    headerProps: headerProps,
  },
  {
    title: "로그인 아이피",
    value: "loginIp",
    width: "100px",
    headerProps: headerProps,
  },
];

const inputMapForSearch = ref({
  id: "",
  name: "",
  page: 1,
  showList: "10",
});

const isSearch = ref(false);
const totalLists = ref(0);
const numOfPage = ref(0);
const loading = ref(false);

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
    const response = await getHistory(params);
    totalLists.value = response.data.totalLists;
    tableItems.value = response.data.histories.map((histories) => {
      return {
        ID: histories.id,
        loginDevice: histories.loginDevice,
        loginIp: histories.loginIp,
        loginTime: histories.loginTime,
        name: histories.name,
      };
    });

    for (let history of tableItems.value)
      history.loginTime = convertTime(history.loginTime);

    numOfPage.value = response.data.totalPages;
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }

  loading.value = false;
}
</script>

<template>
  <v-container style="min-height: 100vh">
    <v-container>
      <h1 style="margin: 15px" class="content-container">
        관리자 접속 이력 조회
      </h1>
      <v-container class="search-container">
        <TextBlank
          v-model:inputText="inputMapForSearch.id"
          labelName="아이디"
          variant="outlined"
          style="max-width: 200px"
          @keyup.enter="searchHandler()"
        />

        <TextBlank
          v-model:inputText="inputMapForSearch.name"
          labelName="관리자명"
          variant="outlined"
          style="max-width: 200px"
          @keyup.enter="searchHandler()"
        />

        <SearchBtn class="fixed-h" @click="searchHandler()" />
      </v-container>

      <v-container class="action-container">
        <v-container v-if="isSearch" class="min-w-max-c">
          <span class="text-secondary_red">{{ totalLists }}</span>
          <span>건 검색</span>
        </v-container>
        <TextSelection
          v-model:selected="inputMapForSearch.showList"
          variant="outlined"
          :itemList="[
            { name: '10개씩 보기', value: '10' },
            { name: '20개씩 보기', value: '20' },
            { name: '50개씩 보기', value: '50' },
            { name: '100개씩 보기', value: '100' },
          ]"
          style="max-width: fit-content"
          @update:modelValue="searchHandler()"
        />
      </v-container>
    </v-container>

    <v-container v-if="isSearch" class="content-container">
      <v-row>
        <v-col>
          <v-data-table
            :items="tableItems"
            :headers="headers"
            :loading="loading"
            loading-text="Loading... Please wait"
            height="52vh"
            hide-default-footer
            :items-per-page="inputMapForSearch.showList"
            fixed-header
            hover
            sticky
          ></v-data-table>
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

.fixed-h {
  height: 55px;
}

.min-w-max-c {
  min-width: max-content;
}

.pagination-container {
  overflow-y: auto;
  max-height: 20vh;
}
</style>
