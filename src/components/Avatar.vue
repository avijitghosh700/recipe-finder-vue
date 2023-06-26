<style scoped lang="scss">
@import "src/styles/_var.scss";

.avatar {
  &__thumb {
    height: 30px;
    width: 30px;
    border-radius: 100px;
    overflow: hidden;
  }

  &__letter {
    display: grid;
    place-items: center;
    height: 30px;
    width: 30px;
    border-radius: 100px;
    overflow: hidden;
    user-select: none;
  }
}
</style>

<template>
  <div class="avatar">
    <div class="avatar__thumb border" v-if="user.avatar">
      <img :src="user.avatar" :alt="user.name" />
    </div>

    <div
      class="avatar__letter border text-white"
      :style="{ backgroundColor: randomBgColor }"
      v-if="!user.avatar"
    >
      {{ firstLetter }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { User } from "@/shared/models/user.mode";

const { user } = defineProps<{
  user: User;
}>();

const firstLetter = computed(() => user.email.at(0)?.toUpperCase());
const randomBgColor = computed(
  () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
);
</script>
