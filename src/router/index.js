import Vue from 'vue';
import Router from 'vue-router';
import AccountsPage from '../pages/Accounts.vue';
import DashboardPage from '../pages/Dashboard.vue';
import ChartsPage from '../pages/Charts.vue';
import HomePage from '../pages/Homepage.vue';
import TablePage from '../pages/TableData.vue';
import { store } from '../store/store';
import * as types from '../store/modules/accounts/accountTypes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      async beforeEnter(to, from, next) {
        try {
          let storedToken = localStorage.getItem('Token');
          if(storedToken) {
            store.dispatch(types.CHECK_USER_AUTHENTICATION)
            next();
          }
          else {
            next({
              name: "accounts" // Redirect user back to the accounts page.
            });
          }
        }
        catch(err) {
          console.error(err);
        }
      }
    },

    {
      path: '/table/:id',
      name: 'table',
      component: TablePage,
      async beforeEnter(to, from, next) {
        try {
          let storedToken = localStorage.getItem('Token');
          if(storedToken) {
            store.dispatch(types.CHECK_USER_AUTHENTICATION)
            next();
          }
          else {
            next({
              name: "accounts" // Redirect user back to the accounts page.
            });
          }
        }
        catch(err) {
          console.error(err);
        }
      }
    },

    {
      path: '/charts',
      name: 'charts',
      component: ChartsPage,
      async beforeEnter(to, from, next) {
        try {
          let storedToken = localStorage.getItem('Token');
          if(storedToken) {
            store.dispatch(types.CHECK_USER_AUTHENTICATION)
            next();
          }
          else {
            next({
              name: "accounts" // Redirect user back to the accounts page.
            });
          }
        }
        catch(err) {
          console.error(err);
        }
      }
    },

    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsPage
    },
  ]
})
