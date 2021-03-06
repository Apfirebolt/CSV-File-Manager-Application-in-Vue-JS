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
  current_graph_data: null,
  csv_data: null,
  document_update_data: null,
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
  [types.GET_CSV_DATA]: state => {
    return state.csv_data;
  },
  [types.GET_DOCUMENT_UPDATE_DATA]: state => {
    return state.document_update_data;
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
  [types.SET_CSV_DATA]: (state, payload) => {
    state.csv_data = payload;
  },
  [types.SET_DOCUMENT_UPDATE_DATA]: (state, payload) => {
    state.document_update_data = payload;
  },
};

const actions = {
  // Action for saving document

  [types.SAVE_DOCUMENT]: ({commit, dispatch}, payload) => {
    let url = 'accounts/api/file_upload';
    authInstance.post(url, payload)
      .then((response) => {
        Vue.toasted.show('Successfully uploaded a file!', toastOptions);
        dispatch(types.GET_ALL_DOCUMENTS_ACTION);
      })
      .catch((err) => {
        Object.values(err.response.data.errors).map((item, index) => {
          Vue.toasted.show(item[0], toastOptions);
        });
      });
  },

  // Action for getting all documents

  [types.GET_ALL_DOCUMENTS_ACTION]: ({commit}) => {
    let url = 'accounts/api/documents';
    authInstance.get(url)
      .then((response) => {
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

  [types.UPDATE_DOCUMENT]: ({commit, dispatch}, payload) => {
    let url = 'accounts/api/update_file/' + payload.document_id;
    authInstance.put(url, payload.data)
      .then((response) => {
        Vue.toasted.show('Successfully updated the file!', toastOptions);
        dispatch(types.GET_ALL_DOCUMENTS_ACTION);
      })
      .catch((err) => {
        Object.values(err.response.data.errors).map((item, index) => {
          Vue.toasted.show(item[0], toastOptions);
        });
      });
  },
  // Action for deleting single document

  [types.DELETE_DOCUMENT]: ({commit, dispatch}, document_id) => {
    let url = 'accounts/api/delete_file/' + document_id;
    authInstance.delete(url)
      .then((response) => {
        Vue.toasted.show('Successfully deleted the file!', toastOptions);
        dispatch(types.GET_ALL_DOCUMENTS_ACTION);
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to delete single document data, some error occurred!', toastOptions);
      });
  },
  // Get CSV data for a file

  [types.GET_CSV_DATA_ACTION]: ({commit}, document_id) => {
    let url = 'accounts/api/read_csv/' + document_id;
    authInstance.get(url)
      .then((response) => {
        Vue.toasted.show('Successfully fetched CSV data for this file!', toastOptions);
        commit(types.SET_CSV_DATA, response.data.data.slice(1));
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to fetch csv data for this document, some error occurred!', toastOptions);
      });
  },
  // Get existing data for single document before update GET_DOCUMENT_UPDATE_DATA
  [types.GET_DOCUMENT_UPDATE_DATA_ACTION]: ({commit}, document_id) => {
    let url = 'accounts/api/detail_file/' + document_id;
    authInstance.get(url)
      .then((response) => {
        Vue.toasted.show('Successfully fetched data for this file!', toastOptions);
        commit(types.SET_DOCUMENT_UPDATE_DATA, response.data);
      })
      .catch((err) => {
        console.log('Error is now',err);
        Vue.toasted.show('Failed to fetch csv data for this document, some error occurred!', toastOptions);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}