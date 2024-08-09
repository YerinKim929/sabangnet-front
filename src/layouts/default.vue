<script setup>
import { ref, onMounted } from "vue";
import commonAxios from "@/utils/commonAxios";
import Cookies from "js-cookie";
import router from "@/router";
import ChooseDialog from "@/components/ChooseDialog.vue";
import { getAuthority } from "@/utils/api";
import { useTheme } from "vuetify";

const logoutDialog = ref(false);
const authority = ref("");
const drawer = ref(true);
const rail = ref(false);
const id = ref("");

const handleLogout = async () => {
  Cookies.remove("accessToken");
  delete commonAxios.defaults.headers.common.Authorization;
  await router.push("/login");
};

// const theme = useTheme();
// function toggleTheme() {
//   theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
// }

onMounted(async () => {
  try {
    const response = await getAuthority();
    authority.value = response.data.authority;
    id.value = response.data.id;
  } catch {}
});
</script>

<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          color="primary_blue"
          style="height: 100vh; border: none; position: fixed"
          permanent
          @click="rail = false"
        >
          <v-btn
            icon="mdi-table-of-contents"
            class="mt-5 ma-3"
            variant="text"
            @click.stop="rail = !rail"
            density="compact"
            nav
          ></v-btn>
          <v-img
            v-if="!rail"
            class="mx-5"
            src="https://wms.sbfulfillment.co.kr/wms/asset/images/logo_fbs_w.svg"
          ></v-img>
          <v-list class="mt-5" nav>
            <v-list-item
              class="rounded-lg mb-1"
              prepend-icon="mdi-account-search"
              title="관리자 조회"
              to="/search"
            ></v-list-item>
            <v-list-item
              class="rounded-lg"
              prepend-icon="mdi-archive-search"
              title="관리자 접속 이력"
              to="/history"
            ></v-list-item>
            <v-list-item
              class="rounded-lg"
              prepend-icon="mdi-account small=true"
              title="MY PAGE"
              to="/mypage"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <!-- <v-btn @click="toggleTheme">toggle theme</v-btn> -->
            <div class="ma-2 mb-5">
              <v-btn
                v-if="!rail"
                color="tertiary_blue"
                block
                @click="logoutDialog = true"
              >
                Logout
              </v-btn>
              <v-btn
                v-if="rail"
                rounded="lg"
                icon="mdi-logout"
                block
                @click="logoutDialog = true"
              ></v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 100%"><router-view /></v-main>
      </v-layout>

      <ChooseDialog
        v-model="logoutDialog"
        message="로그아웃하시겠습니까?"
        :handleClick="handleLogout"
        iconColor="secondary_blue"
      />
    </v-card>
  </v-app>
</template>
