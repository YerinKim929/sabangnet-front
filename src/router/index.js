import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/default.vue";
import AuthenticationLayout from "@/layouts/Authentication.vue";
import Login from "@/pages/login.vue";
import Index from "@/pages/index.vue";
import Search from "@/pages/search.vue";
import History from "@/pages/history.vue";
import Register from "@/pages/register.vue";
import MyPage from "@/pages/myPage.vue";
import UpdateProfile from "@/pages/updateProfile.vue";
import UpdatePassword from "@/pages/updatePassword.vue";
import Cookies from "js-cookie";
import { getAuthority } from "@/utils/api";

const routes = [
  {
    path: "/",
    component: Index,
    meta: { layout: "authentication" },
  },
  {
    path: "/login",
    component: Login,
    meta: { layout: "authentication" },
  },
  {
    path: "/search",
    component: Search,
    meta: { layout: "default" },
  },
  {
    path: "/history",
    component: History,
    meta: { layout: "default" },
  },
  {
    path: "/register",
    component: Register,
    meta: { layout: "default" },
  },
  {
    path: "/mypage",
    component: MyPage,
    meta: { layout: "default" },
  },

  {
    path: "/updateProfile",
    component: UpdateProfile,
    meta: { layout: "default" },
  },

  {
    path: "/updatePassword",
    component: UpdatePassword,
    meta: { layout: "default" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    if (to.path === "/" || to.path === "/login") {
      router.back(); // 로그인 상태에서 / 또는 /login 접근 시 원래 페이지로 리디렉션
      return;
    }

    const response = await getAuthority();
    if (response.data.authority === "ADMIN") {
      if (to.path == "/register") {
        router.back();
        return;
      }
    }
  }

  if (!accessToken && to.path !== "/" && to.path !== "/login") {
    next("/login"); // 비로그인 상태에서 / 또는 /login 이외의 페이지 접근 시 /login으로 리디렉션
    return;
  }

  if (!accessToken && to.path === "/") {
    next("/login"); // 비로그인 상태에서 / 접근 시 /login으로 리디렉션
    return;
  }

  const layout = to.meta.layout || "default";
  to.meta.layoutComponent =
    layout === "authentication" ? AuthenticationLayout : DefaultLayout;

  next();
});

export default router;
