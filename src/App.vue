<style scoped lang="scss"></style>

<template>
  <Header v-if="auth.getIsAuthenticated" :user="auth.getUser" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import useAuthStore from "./stores/authStore";

const auth = useAuthStore();
</script>
