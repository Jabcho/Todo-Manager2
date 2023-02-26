import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("../views/About.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});