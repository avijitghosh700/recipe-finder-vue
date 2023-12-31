import { useRouter, type RouteLocationNormalized } from "vue-router";
import useAuthStore from "@/stores/authStore";

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const router = useRouter();
  const auth = useAuthStore();

  if (auth.getIsAuthenticated) return true;

  router.push("/");
  return false;
};
