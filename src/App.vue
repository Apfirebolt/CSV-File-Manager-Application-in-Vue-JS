<template>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as types from './store/modules/accounts/accountTypes';
import HeaderComponent from './components/common/Header.vue';
import FooterComponent from './components/common/Footer.vue';
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },
  mounted() {
    this.isUserAuthenticated();
  },
  methods: {
    ...mapActions({
      isUserAuthenticated: types.CHECK_USER_AUTHENTICATION
    }),
  }
}
</script>

<style lang="scss" scoped>
/* Font Styles
font-family: 'Nunito', sans-serif;
font-family: 'Oxygen', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Source Sans Pro', sans-serif;
font-family: 'Titillium Web', sans-serif;
*/
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
