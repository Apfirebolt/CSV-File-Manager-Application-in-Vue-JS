import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import { store } from './store/store';
import Loading from 'vue-loading-overlay';
import Toasted from 'vue-toasted';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '@fortawesome/fontawesome-svg-core';
import 'font-awesome/css/font-awesome.css';

Vue.use(Loading);
Vue.use(Toasted);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
