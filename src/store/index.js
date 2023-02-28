import Vue from "vue";
import Vuex from "vuex";

import voucher from "./modules/voucher";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    voucher
  }
});
