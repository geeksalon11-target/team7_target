import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "./firebase.js";
import router from "./router";
import Paginate from "vuejs-paginate";

Vue.component("paginate", Paginate);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
