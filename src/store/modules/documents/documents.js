import * as types from './documentTypes';
import axios from 'axios';
import router from '../../../router';
import Vue from 'vue';
import authInstance from '../../../interceptors/auth_instance';

const toastOptions = {
  theme: "bubble",
  position: "top-center",
  duration : 3000,
  fullWidth: true,
};

const state = {
  user_documents: null,
  single_document: null,
  current_graph_data: null
};

const getters = {
  [types.GET_ALL_DOCUMENTS]: state => {
    return state.user_documents;
  },
  [types.GET_SINGLE_DOCUMENT]: state => {
    return state.single_document;
  },
  [types.GET_GRAPH_DATA]: state => {
    return state.current_graph_data;
  },
};

const mutations = {
  [types.SET_ALL_DOCUMENTS]: (state, payload) => {
    state.user_documents = payload;
  },
  [types.SET_SINGLE_DOCUMENT]: (state, payload) => {
    state.single_document = payload;
  },
  [types.SET_GRAPH_DATA]: (state, payload) => {
    state.current_graph_data = payload;
  },
};

const actions = {
  // Action for saving document

  [types.SAVE_DOCUMENT]: ({commit}, payload) => {
    let url = 'accounts/api/file_upload';
    authInstance.post(url, payload)
      .then((response) => {
        console.log('Response now is ', response);
        Vue.toasted.show('Successfully uploaded a file!', toastOptions);
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to fetch user profile data, some error occurred!', toastOptions);
      });
  },

  // Action for getting all documents

  [types.GET_ALL_DOCUMENTS_ACTION]: ({commit}) => {
    let url = 'accounts/api/documents';
    authInstance.get(url)
      .then((response) => {
      console.log('All document data : ', response.data);
        commit(types.SET_ALL_DOCUMENTS, response.data);
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to fetch user documents, some error occurred!', toastOptions);
      });
  },

  // Action for getting single document

  [types.GET_SINGLE_DOCUMENT]: ({commit}, document_id) => {
    let url = 'accounts/api/' + document_id;
    authInstance.get(url)
      .then((response) => {
      console.log('Single doc response data ', response.data);
      commit(types.SET_GRAPH_DATA, response.data.csv_data);
      router.push({'name': 'charts'});
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to fetch single document data, some error occurred!', toastOptions);
      });
  },
  // Action for updating single document

  [types.UPDATE_DOCUMENT]: ({commit}, payload) => {
    let url = 'accounts/api/update_file/' + payload.document_id;
    authInstance.put(url)
      .then((response) => {
        commit(types.SET_ALL_DOCUMENTS, response.data);
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to update single document data, some error occurred!', toastOptions);
      });
  },
  // Action for deleting single document

  [types.DELETE_DOCUMENT]: ({commit}, document_id) => {
    let url = 'accounts/api/delete_file/' + document_id;
    authInstance.delete(url)
      .then((response) => {
        commit(types.SET_ALL_DOCUMENTS, response.data);
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to delete single document data, some error occurred!', toastOptions);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}