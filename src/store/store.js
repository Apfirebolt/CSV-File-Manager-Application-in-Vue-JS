import Vue from 'vue';
import Vuex from 'vuex';
import accounts from './modules/accounts/accounts';
import documents from './modules/documents/documents';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    accounts,
    documents
  }
});