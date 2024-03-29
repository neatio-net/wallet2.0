import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/plugins/i18n";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;


new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");
