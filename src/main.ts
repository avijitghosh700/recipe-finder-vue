import "./styles/style.scss";
import "vue3-toastify/dist/index.css";

import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import VueFeather from "vue-feather";

import Logo from "@/components/Logo.vue";
import Avatar from "@/components/Avatar.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Header from "@/components/layout/Header.vue";

import App from "./App.vue";
import router from "./router";

import firebaseApp from "./shared/firebase.config";

const app = createApp(App);

app.component(VueFeather.name, VueFeather); // Icon component

// Components
app.component("Logo", Logo);
app.component("Avatar", Avatar);
app.component("Header", Header);
app.component("ErrorMessage", ErrorMessage);
// END

// Store
const pinia = createPinia();

app.use(pinia);

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("auth", JSON.stringify(state.auth));
  },
  { deep: true }
);
// END

app.use(router);

// Firebase setup
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
// END

app.use(Vue3Toastify, {
  autoClose: 1500,
  position: "top-center",
} as ToastContainerOptions);

app.mount("#app");
