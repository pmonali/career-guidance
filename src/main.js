import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVueNext from "bootstrap-vue-next";
import "@fortawesome/fontawesome-free/css/all.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
// main.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

createApp(App)
  .use(store)
  .use(router)
  .use(BootstrapVueNext)

  .mount("#app");
