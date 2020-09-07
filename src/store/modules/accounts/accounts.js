import * as types from './accountTypes';
import axios from 'axios';
import router from '../../../router';
import Vue from 'vue';
import authInstance from '../../../interceptors/auth_instance';

const toastOptions = {
  theme: "bubble",
  position: "top-center",
  duration : 2000,
  fullWidth: true,
};

const state = {
  token: null,
  isAuthenticated: false,
  profileData: null
};

const getters = {
  [types.GET_TOKEN]: state => {
    return state.token;
  },
  getToken: state => {
    return state.tokenIndex;
  },
  [types.IS_USER_AUTHENTICATED]: state => {
    return state.isAuthenticated;
  },
  [types.GET_PROFILE_DATA]: state => {
    return state.profileData;
  },
};

const mutations = {
  [types.SET_TOKEN]: (state, payload) => {
    state.token = payload;
    state.isAuthenticated = true;
  },
  [types.LOG_OUT_SUCCCESS]: (state) => {
    state.token = null;
    state.isAuthenticated = false;
    state.profileData = null;
  },
  [types.SET_PROFILE_DATA]: (state, payload) => {
    state.profileData = payload;
  },
};

const actions = {
  [types.REGISTER_USER]: ({commit}, payload) => {
    let url = process.env.VUE_APP_ROOT_API + 'accounts/api/register';
    axios.post(url, payload)
      .then((response) => {
        Vue.toasted.show('Successfully registered, please login to continue!', toastOptions );
      })
      .catch((err) => {
        Vue.toasted.show('Some error occurred during registration!', toastOptions);
      });
  },

  // Action for logging in user
  [types.SET_TOKEN_ACTION]: ({commit, state}, payload) => {
    let url = process.env.VUE_APP_ROOT_API + 'accounts/api/auth-token';
    axios.post(url, payload)
      .then((response) => {
        commit(types.SET_TOKEN, response.data.token);
        localStorage.setItem('Token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        authInstance.defaults.headers.common = {
          'Authorization': `Token ${state.token}`
        }
        router.push({ name: 'dashboard' });
        Vue.toasted.show('Logged in successfully, please continue on to your dashboard!', toastOptions );
      })
      .catch((err) => {
        Vue.toasted.show('Failed to login, some error occurred!',
          toastOptions );
      });
  },

  // Log out functionality
  [types.LOG_OUT]: ({commit}, payload) => {
    commit(types.LOG_OUT_SUCCCESS);
    try {
      localStorage.removeItem('Token');
      localStorage.removeItem('userId');
      authInstance.defaults.headers.common = null;
    } catch(err) {
      console.error(err);
    }
    Vue.toasted.show('Successfully logged out, please login to continue!', toastOptions );
    router.push({ name: 'userLogin' });
  },

  // Action to check if the user is authenticated once user refreshes the page.
  [types.CHECK_USER_AUTHENTICATION]: ({commit}) => {
    try {
      let storedToken = localStorage.getItem('Token');
      let storedUserId = localStorage.getItem('userId');
      if(storedToken) {
        commit(types.SET_TOKEN, storedToken);
      }
    }
    catch(err) {
      console.error(err);
    }
  },

  // Get the profile data of the user
  [types.GET_PROFILE_DATA_ACTION]: ({commit}) => {
    let url = 'accounts/api/profile';
    authInstance.get(url)
      .then((response) => {
        commit(types.SET_PROFILE_DATA, response.data);
      })
      .catch((err) => {
        console.error(err);
        Vue.toasted.show('Failed to fetch user profile data, some error occurred!', toastOptions);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}