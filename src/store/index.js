import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// separated for easy testing
// alternatively for more complicated apps, store could be organised into modules
import state from './state';
import getters from './getters';
import mutations from "./mutations";
import actions from './actions';

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});