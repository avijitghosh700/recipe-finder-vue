import firebaseApp from "@/shared/firebase.config";
import { useRouter, type RouteLocationNormalized } from "vue-router";

import { useCurrentUser } from "vuefire";

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const router = useRouter();
  const user = useCurrentUser(firebaseApp.name);

  if (user.value) return true;

  router.push("/");
  return false;
};
