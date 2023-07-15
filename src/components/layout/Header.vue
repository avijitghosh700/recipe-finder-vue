<style scoped lang="scss">
@import "src/styles/_var.scss";

.header {
  background-color: #fff;

  &__menu {
    & > li {
      color: $d-gray;
    }
  }
}
</style>

<template>
  <div class="header border-b">
    <div class="container mx-auto px-4">
      <nav class="header__nav flex items-center">
        <Logo />

        <ul class="header__menu flex items-center gap-2 ml-auto">
          <li>
            <div class="header__userInfo flex items-center gap-[5px]">
              <Avatar :user="user" />
              {{ user.name || user.email }}
            </div>
          </li>
          <li>
            <button class="rounded-full p-3 flex items-center" @click="signOut">
              <vue-feather type="log-out"></vue-feather>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import useAuthStore from "@/stores/authStore";

import { logOut } from "@/shared/services/authService";

import type { User } from "@/shared/models/user.mode";

defineProps<{
  user: User;
}>();

const router = useRouter();

const { setUnauthenticated } = useAuthStore();

const signOut = () => {
  logOut().then(() => {
    setUnauthenticated();
    router.push("/");
  });
};
</script>
