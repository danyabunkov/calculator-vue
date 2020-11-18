import Vue from 'vue'
import Vuex from 'vuex'

import { calculator } from "./store/store";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    calculator
  }
})
