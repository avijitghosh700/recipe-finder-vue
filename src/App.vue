<template>
  <Header v-if="user" :user="user" />
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

const router = useRouter();

const user = useCurrentUser();
console.log(user.value);

user.value && router.push('/dashboard')
</script>
