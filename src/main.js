import Vue from "vue";
// import VeeValidate from "vee-validate";
import fr from "vee-validate/dist/locale/fr";
import VeeValidate, { Validator } from "vee-validate";

import router from "./router";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VeeValidate);

Validator.localize("fr", fr);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
