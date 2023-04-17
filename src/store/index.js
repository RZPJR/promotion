import Vue from "vue";
import Vuex from "vuex";

import voucher from "./modules/voucher";
import pagination from "./modules/pagination"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    voucher,
    pagination
  }
});
