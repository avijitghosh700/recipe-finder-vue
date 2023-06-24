import "./styles/style.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";

import VueFeather from "vue-feather";

import Logo from "./components/Logo.vue";
import ErrorMessage from "./components/ErrorMessage.vue";

import App from "./App.vue";
import router from "./router";

import firebaseApp from "./shared/firebase.config";

const app = createApp(App);

app.component(VueFeather.name, VueFeather); // Icon component

// Components
app.component("Logo", Logo);
app.component("ErrorMessage", ErrorMessage);
// END

app.use(createPinia()); // Store

app.use(router);

// Firebase setup
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
// END

app.mount("#app");
