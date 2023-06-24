import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/views/auth/login.page.vue";
import SignupPage from "@/views/auth/signup.page.vue";
import DashboardPage from "@/views/dashboard/dashboard.page.vue";

import { authGuard } from "@/router/guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Signup",
      component: SignupPage,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardPage,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
