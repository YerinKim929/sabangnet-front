import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import TopButton from '../components/NavigationBar.vue'

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/topbutton',
    name: 'TopButton',
    component: TopButton
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes // 기본 라우트 설정을 사용.
})

export default router
