import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/index";
import router from '@/router';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/todolist",
    component: () => import("@/views/TodoList.vue"),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLoggined === false) {
        alert("로그인이 필요합니다");
        router.push('/');
      }
      return next();   
    }
  },
  {
    path: "/",
    component: () => import("@/views/Login.vue"),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLoggined === true) {
        router.push('/todolist');
      }
      return next();   
    }
  },
  {
    path: "/signup",
    component: () => import("@/views/Signup.vue"),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isLoggined === true) {
        router.push('/todolist');
      }
      return next();   
    }
  },
  {
    path: "/auth",
    component: () => import("@/views/Auth.vue"),
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});