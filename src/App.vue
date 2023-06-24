<template>
  <Header v-if="user" :user="user" />
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { useCurrentUser } from "vuefire";

import firebaseApp from "./shared/firebase.config";

const user = useCurrentUser(firebaseApp.name);
</script>
