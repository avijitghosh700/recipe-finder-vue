import { createRouter, createWebHistory } from "vue-router";

import loginPageVue from "@/views/auth/login.page.vue";
import signupPageVue from "@/views/auth/signup.page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: loginPageVue,
    },
    {
      path: "/register",
      name: "Signup",
      component: signupPageVue,
    },
  ],
});

export default router;
