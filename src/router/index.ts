import { createRouter, createWebHistory, useRouter, type RouteLocationNormalized } from "vue-router";

import LoginPage from "@/views/auth/login.page.vue";
import SignupPage from "@/views/auth/signup.page.vue";
import DashboardPage from "@/views/dashboard/dashboard.page.vue";

import { useCurrentUser } from 'vuefire'

const authGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const router = useRouter();
  const user = useCurrentUser();

  if (user.value) return true;

  router.push('/');
  return false;
};

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
